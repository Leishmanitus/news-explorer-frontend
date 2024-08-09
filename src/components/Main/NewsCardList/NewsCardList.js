import './NewsCardList.css';
import NewsCard from './NewsCard/NewsCard';

function NewsCardList() {
    return (
        <div className='card-list'>
            <h2 className='card-list__title'>Search Results</h2>
            <div className='card-list__grid'>
                <NewsCard />
                <NewsCard />
                <NewsCard />
            </div>
            <button className='card-list__button'>Show more</button>
        </div>
    )
}

export default NewsCardList;
