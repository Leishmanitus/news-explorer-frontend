import { useContext } from 'react';
import './Main.css';
// import mainBackground from '../../assets/main-background.jpg';
// import Header from '../Header/Header';
// import SearchForm from './SearchForm/SearchForm';
// import NewsCardList from './NewsCardList/NewsCardList';
// import About from './About/About';
import UserContext from '../../contexts/UserContext';

function Main({children}) {
    const { searchResults, isLoggedIn } = useContext(UserContext);

    return
    // return (
    //     <main className='main'>
    //         <div className='main__group main__group_top'>
    //             <Header />
    //             {children}
    //             <img className='main__img' src={mainBackground} alt='A newspaper and tea on a wooden table.' />
    //             <SearchForm />
    //         </div>
    //         <div className='main__group main__group_bot'>
    //             {searchResults && (<NewsCardList />)}
    //             <About />
    //         </div>
    //     </main>
    // )
}

export default Main;
