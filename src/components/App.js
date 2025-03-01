import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'
import './App.css';
import mainBackground from '../assets/main-background.jpg';
import auth from '../utils/auth';
import UserContext from '../contexts/UserContext';
import Main from './Main/Main';
import SavedNews from './Main/SavedNews/SavedNews';
import Header from './Header/Header';
import SearchForm from './Main/SearchForm/SearchForm';
import NewsCardList from './Main/NewsCardList/NewsCardList';
import About from './Main/About/About';
import Footer from './Footer/Footer';

function App() {
  const [user, setUser] = useState({ name: 'Tyler Leishman', _id: '', token: '', });
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [activeModal, setActiveModal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const [savedArticles, setSavedArticles] = useState([]);
  const [keywords, setKeywords] = useState([]);

  const handleModalChange = (modalName) => {
    setActiveModal(modalName);
  };

  const handleClose = () => {
    setActiveModal("");
  };

  const handleOverlay = (event) => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };

  const handleRequest = (request) => {
    setIsLoading(true);
    return request()
      .then(() => handleClose())
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  const setUserState = ({ name, _id, token }, log) => {
    setUser({ name, _id, token });
    setIsLoggedIn(log);
  };

  const handleCheckToken = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      return auth.getContent(jwt)
        .then(( { data: { name, _id } }) => {
          setUser({ name, _id, token: jwt });
          setIsLoggedIn(true);
        })
        .catch(console.error);
    }
  };

  // useEffect(() => {
  //   handleCheckToken();
  // }, []);

  return (
    <UserContext.Provider value={{
      user, isLoading, isLoggedIn, activeModal,
      searchResults, savedArticles, keywords, setUser,
      setIsLoading, setIsLoggedIn, setActiveModal,
      setSearchResults, setSavedArticles, setKeywords
    }}>
      <div className="app">
        <Routes>
          <Route exact path='/' element={
            (
              <main className='main'>
                  <div className='main__group main__group_top'>
                      <Header />
                      <img className='main__img' src={mainBackground} alt='A newspaper and tea on a wooden table.' />
                      <SearchForm />
                  </div>
                  <div className='main__group main__group_bot'>
                      {searchResults && (<NewsCardList />)}
                      <About />
                      <Footer />
                  </div>
              </main>
            )
          } />
          <Route path='/signup'></Route>
          <Route path='/signin'></Route>
          <Route path='/saved-news' element={
            (
              <main className='main'>
                <Header />
                <SavedNews />
                <Footer />
              </main>
            )
          } />
        </Routes>
      </div>
    </UserContext.Provider>
  );
};

export default App;
