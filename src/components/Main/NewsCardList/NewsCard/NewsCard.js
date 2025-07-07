import { useContext, useEffect, useState } from 'react';
import './NewsCard.css';
import UserContext from '../../../../contexts/UserContext';

function NewsCard(props) {
    const { articleCard } = props;
    const {
        savedArticles, handleDeleteArticle, handleSaveArticle,
        isLoggedIn, isSavedNews, currentKeyword
    } = useContext(UserContext);

    const [ isBookmarked, setIsBookmarked ] = useState();

    const checkForBookmark = () => {
        if (!articleCard || !savedArticles) return false;
        return savedArticles.length > 0 ? savedArticles.some((savedArticle) => savedArticle.url === articleCard.url) : false;
    };

    const handleBookmark = (articleCard) => {
        if (isBookmarked) {
            handleDeleteArticle(articleCard);
        } else {
            handleSaveArticle(articleCard);
        }
        setIsBookmarked(!isBookmarked);
    };

    const handleDelete = (articleCard) => {
        handleDeleteArticle(articleCard);
        setIsBookmarked(false);
    }

    useEffect(() => {
        setIsBookmarked(checkForBookmark());
        // eslint-disable-next-line
    }, []);


    if (!articleCard) return null;

    const articleDate = new Date(articleCard.publishedAt);
    const articleDateFormatted = articleDate.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    const categoryName = isSavedNews ? articleCard.keyword.charAt(0).toUpperCase() + articleCard.keyword.slice(1) : currentKeyword.charAt(0).toUpperCase() + currentKeyword.slice(1);

    return (
        <article className='card' key={articleCard.url} >
            <a className='card__link' href={articleCard.url} target='_blank' rel='noreferrer' >{""}</a>
            <img className='card__img' src={articleCard.urlToImage} alt='Not found' />
            {
                isLoggedIn ? (
                        isSavedNews ? (
                                <>
                                    <div className='card__category-group'>
                                        <p className='card__category-text' >{categoryName}</p>
                                    </div>
                                    <div className='card__bookmark-group'>
                                        <span className='card__trash-img' onClick={(event) => {
                                                    event.preventDefault();
                                                    handleDelete(articleCard);
                                                    event.target.blur();
                                                }
                                            }
                                        />
                                    </div>
                                </>
                            ) : (
                                <div className='card__bookmark-group'>
                                    <span className={isBookmarked ? 'card__bookmark-img card__bookmark-img_checked' : 'card__bookmark-img'} onClick={(event) => {
                                                event.preventDefault();
                                                handleBookmark({ ...articleCard, keyword: currentKeyword });
                                                event.target.blur();
                                            }
                                        }
                                    />
                                </div>
                            )
                    
                    ) : (
                    <div className='card__bookmark-group card__bookmark-group_disabled'>
                        <span className='card__bookmark-img' disabled />
                        <span className='card__tooltip'>
                            <p className='card__tooltip-text'>Sign in to save articles</p>
                        </span>
                    </div>
                    )
            }
            <div className='card__info'>
                <p className='card__date'>{articleDateFormatted}</p>
                <h3 className='card__title' >{articleCard.title}</h3>
                <p className='card__description'>{articleCard.description}</p>
                <p className='card__source'>{articleCard.source.name}</p>
            </div>
        </article>
    )
}

export default NewsCard;
