import { useContext } from 'react';
import './NewsCardList.css';
import NewsCard from './NewsCard/NewsCard';
import UserContext from '../../../contexts/UserContext';

function NewsCardList() {
    const { searchResults } = useContext(UserContext);

    return (
        <div className='card-list'>
            <h2 className='card-list__title'>Search Results</h2>
            <div className='card-list__grid'>
                {searchResults && (searchResults.map((data, i) => <NewsCard key={i} article={data} />))}
            </div>
            <button className='card-list__button'>Show more</button>
        </div>
    )
}

export default NewsCardList;
