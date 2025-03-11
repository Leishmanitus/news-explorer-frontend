import { useContext } from 'react';
import './NewsCard.css';
import UserContext from '../../../../contexts/UserContext';

function NewsCard({ article }) {
    const { savedArticles, handleDeleteArticle, handleSaveArticle, isLoggedIn } = useContext(UserContext);
    const isBookmarked = savedArticles ? savedArticles.some((savedArticle) => savedArticle.url === article.url) : false;

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
            <div className='card__bookmark-group'>
                <span className='card__bookmark-img' onClick={() => handleBookmark(article)} disabled={!isLoggedIn} />
            </div>
            <div className='card__info'>
                <p className='card__date'>{article.publishedAt.split('T')[0]}</p>
                <h3 className='card__title'>{article.title}</h3>
                <p className='card__description'>{article.content}</p>
                <a className='card__source' href={article.url}>{article.source.name}</a>
            </div>
        </div>
    )
}

export default NewsCard;
