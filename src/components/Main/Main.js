import './Main.css';
import mainBackground from '../../assets/main-background.jpg'
import SearchForm from './SearchForm/SearchForm';
import NewsCardList from './NewsCardList/NewsCardList';
import About from './About/About';

function Main(children) {
    return (
        <div className='main'>
            <div className='main__group main__group_top'>
                {children}
                <img className='main__img' src={mainBackground} alt='A newspaper and tea on a wooden table.' />
                <SearchForm />
                {/* {searchResults && <NewsCardList />} */}
            </div>
            <div className='main__group main__group_bot'>
                <NewsCardList />
                <About />
            </div>
        </div>
    )
}

export default Main;
