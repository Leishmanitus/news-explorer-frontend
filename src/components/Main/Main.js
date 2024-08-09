import './Main.css';
import mainBackground from '../../assets/main-background.jpg'
import SearchForm from './SearchForm/SearchForm';
import NewsCardList from './NewsCardList/NewsCardList';
import About from './About/About';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function Main() {
    return (
        <div className='main'>
            <div className='main__group main__group_top'>
                <img className='main__img' src={mainBackground} alt='A newspaper and tea on a wooden table.' />
                <Header />
                <SearchForm />
                {/* {searchResults && <NewsCardList />} */}
            </div>
            <div className='main__group main__group_bot'>
                <NewsCardList />
                <About />
                <Footer />
            </div>
        </div>
    )
}

export default Main;
