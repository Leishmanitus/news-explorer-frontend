import { useContext } from 'react';
import './SavedNews.css';
import UserContext from '../../../contexts/UserContext';
import NewsCardList from '../NewsCardList/NewsCardList';

function SavedNews() {
    const {
        savedArticles,
        keywords,
        user
    } = useContext(UserContext);
    const userName = user.name.split(' ')[0][0].toUpperCase() + user.name.split(' ')[0].slice(1);
    const articleCount = savedArticles.length;

    const handleKeywords = () => {
        const keywordCount = keywords.length - 3;

        if (keywords.length > 3) {
            return `${keywords[0]}, ${keywords[1]}, ${keywords[2]} and ${keywordCount} other`
        } else {
            return keywords.join(', ')
        }
    }

    return (
        <div className='news'>
            <p className='news__text'>Saved articles</p>
            <h2 className='news__title'>{userName}, you have {articleCount} saved articles</h2>
            {savedArticles && (<p className='news__text'>By keywords: <span className='news__text_bold'>{handleKeywords()}</span></p>)}
            <NewsCardList />
        </div>
    )
}

export default SavedNews;
