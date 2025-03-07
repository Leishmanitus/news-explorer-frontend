import { useContext } from 'react';
import './NewsCard.css';
import UserContext from '../../../../contexts/UserContext';

function NewsCard({ article }) {
    const { savedArticles, handleDeleteArticle, handleSaveArticle } = useContext(UserContext);

    const handleBookmark = (article) => {
        if (savedArticles.some((savedArticle) => savedArticle.url === article.url)) {
            handleDeleteArticle(article);
        } else {
            handleSaveArticle(article);
        }
    };

    return (
        <div className='card'>
            <img className='card__img' src={article.urlToImage} alt='Not found' />
            <div className='card__bookmark-group'>
                <span className='card__bookmark-img' onClick={() => handleBookmark(article)}/>
            </div>
            <div className='card__info'>
                <p className='card__date'>{article.publishedAt.split('T')[0]}</p>
                <h3 className='card__title'>{article.title}</h3>
                <p className='card__description'>{article.content}</p>
                <p className='card__source'>{article.source.name}</p>
            </div>
        </div>
    )
}

export default NewsCard;
