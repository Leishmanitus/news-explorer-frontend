import { useContext } from 'react';
import './NewsCardList.css';
import NewsCard from './NewsCard/NewsCard';
import UserContext from '../../../contexts/UserContext';
import { getSearchResults } from '../../../utils/newsApi';

function NewsCardList() {
    const { searchResults } = useContext(UserContext);

    return (
        <div className='card-list'>
            <h2 className='card-list__title'>Search Results</h2>
            <div className='card-list__grid'>
                {
                    // getSearchResults().map((article, i) => <NewsCard key={i} article={article} />)
                }
            </div>
            <button className='card-list__button'>Show more</button>
        </div>
    )
}

export default NewsCardList;
