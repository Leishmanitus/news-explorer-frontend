import { useContext } from 'react';
import './NewsCard.css';
import UserContext from '../../../../contexts/UserContext';

function NewsCard({ article }) {
    const { savedArticles, handleDeleteArticle, handleSaveArticle, isLoggedIn } = useContext(UserContext);
    const isBookmarked = savedArticles ? savedArticles.some((savedArticle) => savedArticle.url === article.url) : false;
    const aticleDate = new Date(article.publishedAt);
    const articleDateFormatted = aticleDate.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    const handleBookmark = (article) => {
        if (isBookmarked) {
            handleDeleteArticle(article);
        } else {
            handleSaveArticle(article);
        }
    };

    return (
        <div className='card'>
            <img className='card__img' src={article.urlToImage} alt='Not found' />
            {
                isLoggedIn ? (
                    <div className='card__bookmark-group'>
                        <span className='card__bookmark-img' onClick={() => handleBookmark(article)} />
                    </div>
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
                <a className='card__title' href={article.url}>{article.title}</a>
                <p className='card__description'>{article.description}</p>
                <p className='card__source'>{article.source.name}</p>
            </div>
        </div>
    )
}

export default NewsCard;
