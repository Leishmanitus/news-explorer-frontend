import { useContext } from 'react';
import './NewsCardList.css';
import NewsCard from './NewsCard/NewsCard';
import notFoundImage from '../../../assets/not-found.svg';
import UserContext from '../../../contexts/UserContext';

function NewsCardList() {
    const { 
        searchResults, shownResults, setShownResults,
        hasError, errorMessage, hasSearched,
    } = useContext(UserContext);
    const moreToShow = shownResults <= searchResults.length;
    const showMoreButtonText = moreToShow ? "Show more" : "No more to show";

    const handleResults = () => {
        const results = searchResults.slice(0, shownResults);
        return results;
    };

    const incrementResults = () => {
        shownResults <= searchResults.length ? setShownResults(shownResults + 3) : setShownResults(searchResults.length);
    };

    return (
        <div className='card-list'>
            {
                searchResults &&
                    hasError ?
                            <>
                                <h2 className='card-list__title'>Search Results</h2>
                                <div className='card-list__message-group'>
                                    <h3 className='card-list__message-title'>{errorMessage}</h3>
                                </div>
                            </>
                        :
                            searchResults.length === 0 ?
                                    <>
                                        <div className='card-list__message-group'>
                                            <img className='card-list__not-found-img' src={notFoundImage} alt='Nothing found' />
                                            <h3 className='card-list__message-title'>Nothing found</h3>
                                            <p className='card-list__message'>Sorry, but nothing matched your search terms.</p>
                                        </div>
                                    </>
                                :
                                    <>
                                        <h2 className='card-list__title'>Search Results</h2>
                                        <div className='card-list__grid'>
                                            {searchResults && (handleResults().map((article, index) => <NewsCard key={index} article={article} />))}
                                        </div>
                                        <button className='card-list__button' type='button' onClick={incrementResults}>{showMoreButtonText}</button>
                                    </>
            }
        </div>
    )
}

export default NewsCardList;
