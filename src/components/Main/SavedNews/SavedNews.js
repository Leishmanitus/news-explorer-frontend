import { useContext, useCallback } from 'react';
import './SavedNews.css';
import UserContext from '../../../contexts/UserContext';
import NewsCard from '../NewsCardList/NewsCard/NewsCard';

function SavedNews() {
    const {
        savedArticles,
        user,
        isSavedNews,
        keywords,
    } = useContext(UserContext);
    const userName = user.name ? user.name.split(' ')[0][0].toUpperCase() + user.name.split(' ')[0].slice(1) : 'Unknown';
    const articleCount = savedArticles ? savedArticles.length : 0;

    const handleKeywords = () => {
        const keywordCount = keywords ? keywords.length - 3 : 0;

        if (keywordCount > 2) {
            return `${keywords[0]}, ${keywords[1]}, and ${keywordCount} others`;
        } else if (keywordCount === 0) {
            return null;
        } else if (keywordCount === 1) {
            return keywords[0];
        } else {
            return keywords.join(', ')
        }
    }

    const renderSavedNewsList = useCallback(() => {
        return (
            <>
                {savedArticles && savedArticles.length > 0
                ? savedArticles.map((article, i) => <NewsCard key={i} articleCard={article} />)
                : null}
            </>
        );
        // eslint-disable-next-line
    }, [savedArticles]);

    return (
        <div className='news'>
            <h2 className='news__title'>Saved articles</h2>
            <h3 className='news__subtitle'>{userName}, you have {articleCount} saved articles</h3>
            <p className='news__keyword'>By keywords: <span className='news__bold'>{handleKeywords()}</span></p>
            <div className='news__grid'>
                {isSavedNews && renderSavedNewsList()}
            </div>
        </div>
    )
}

export default SavedNews;
