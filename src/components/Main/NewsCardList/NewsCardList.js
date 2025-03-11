import { useContext } from 'react';
import './NewsCardList.css';
import NewsCard from './NewsCard/NewsCard';
import UserContext from '../../../contexts/UserContext';

function NewsCardList() {
    const { searchResults, shownResults, setShownResults } = useContext(UserContext);
    const moreToShow = shownResults <= searchResults.length;

    const handleResults = () => {
        const results = searchResults.slice(0, shownResults);
        return results;
    };

    const incrementResults = () => {
        shownResults <= searchResults.length ? setShownResults(shownResults + 3) : setShownResults(searchResults.length);
    };

    return (
        <div className='card-list'>
            <h2 className='card-list__title'>Search Results</h2>
            <div className='card-list__grid'>
                {searchResults && (handleResults().map((article, index) => (
                    <NewsCard key={index} article={article} />
                )))}
            </div>
            <button className='card-list__button' type='button' onClick={incrementResults}>{moreToShow ? "Show more" : "No more to show"}</button>
        </div>
    )
}

export default NewsCardList;
