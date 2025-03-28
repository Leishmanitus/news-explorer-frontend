import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom'
import './App.css';
import auth from '../utils/auth';
import api from '../utils/api';
import { modalOptions } from '../utils/constants';
import mainBackground from '../assets/main-background.jpg';
import notFoundImage from '../assets/not-found.svg';
import UserContext from '../contexts/UserContext';
import ModalContext from '../contexts/ModalContext';
import Main from './Main/Main';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import SearchForm from './Main/SearchForm/SearchForm';
import Preloader from './Preloader/Preloader';
import NewsCardList from './Main/NewsCardList/NewsCardList';
import About from './Main/About/About';
import SavedNews from './Main/SavedNews/SavedNews';
import LoginModal from './ModalWithForm/LoginModal/LoginModal';
import RegisterModal from './ModalWithForm/RegisterModal/RegisterModal';

function App() {
  const [user, setUser] = useState({ name: '', id: '', token: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeModal, setActiveModal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const [shownResults, setShownResults] = useState(3);
  const [savedArticles, setSavedArticles] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const location = useLocation();
  const isSavedNews = location.pathname.includes('saved-news');

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
      .then((data) => {
        handleClose();
        return data;
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  const setUserState = ({ name, id, token }, log) => {
    setUser({ name, id, token });
    setIsLoggedIn(log);
  };

  const handleCheckToken = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      return auth.getUser(jwt)
        .then(({ name, id }) => {
          setUser({ name, id, token: jwt });
          setIsLoggedIn(true);
        })
        .catch(console.error);
    }
  };

  const handleRegistration = ({ name, email, password }) => {
    return handleRequest(() => auth.signup({ name, email, password }))
      .then(({ email, password }) => handleLogin({ email, password }));
  }

  const handleLogin = ({ email, password }) => {
    return handleRequest(() => auth.signin({ email, password }))
      .then(({ name, id, token }) => {
        localStorage.setItem('jwt', token)
        setUserState({ name, id, token }, true);
        handleArticleList(token);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setUserState({ name: "", id: "", token: "" }, false);
    setSavedArticles([]);
  };

  const checkSavedArticles = (articles) => {
    if (typeof articles !== "object" || articles === null) {
      console.error("Invalid articles data:", articles);
      return;
    }

    if (savedArticles.length === 0) {
      articles.length === 0 ? setSavedArticles([]) : setSavedArticles([...articles]);
    } else {
      setSavedArticles([...savedArticles, ...articles]);
    }
  };

  const handleArticleList = (token) => {
    if (isLoggedIn) {
      api.getArticleList(token)
        .then((articles) => {
          checkSavedArticles(articles);
        })
        .catch(console.error);
    }
  };

  const handleDeleteArticle = (article) => {

    return api.removeArticle(article.url, user.token)
      .then(() => {
        setSavedArticles(savedArticles.filter((item) => item.url !== article.url));
      })
      .catch(console.error);
  };

  const handleSaveArticle = (article) => {
    if (savedArticles.some((item) => article.url === item.url)) {
      return Promise.reject({ message: 'Article already in database.' });
    } else {
      return api.addArticle(article, user.token)
        .then(articles => {
          checkSavedArticles(articles);
        })
        .catch(console.error);
    }
  };

  useEffect(() => {
    handleCheckToken();
  }, []);

  useEffect(() => {
    if(user.token !== "undefined") handleArticleList(user.token);
    // eslint-disable-next-line
  }, [isSavedNews, savedArticles]);

  return (
    <UserContext.Provider value={{
      user, isLoading, isSavedNews, isLoggedIn, activeModal, isSearching, shownResults,
      searchResults, savedArticles, keywords, hasSearched, errorMessage, hasError,
      setUser, setIsLoading, setIsLoggedIn, setActiveModal, setErrorMessage, setHasError,
      setSearchResults, setSavedArticles, setKeywords, setHasSearched, setIsSearching,
      handleSaveArticle, handleDeleteArticle, handleLogout, setShownResults,
    }}>

      <div className="app">

        <Routes>

          <Route exact path='/' element={
            (
              <Main children={
                <main className='main'>
                  <div className='main__group main__group_top'>
                      <Header />
                      <img className='main__img' src={mainBackground} alt='A newspaper and tea on a wooden table.' />
                      <SearchForm />
                  </div>
                  <div className='main__group main__group_bot'>
                      {isSearching ? 
                        (
                          <div className='card-list__message-group' ><Preloader /></div>
                        ) : searchResults ?
                          (
                            <NewsCardList />
                          ) : hasSearched ?
                            (
                              <div className='card-list__message-group'>
                                <img className='card-list__not-found-img' src={notFoundImage} alt='Nothing found' />
                                <h3 className='card-list__message-title'>{searchResults}</h3>
                                <p className='card-list__message'>Sorry, but nothing matched your search terms.</p>
                              </div>
                            ) : null
                      }
                      <About />
                      <Footer />
                  </div>
                </main>

              } />
            )
          } />

          <Route path='/saved-news' element={
            (
              <Main children={
                <main className='main'>
                  <Header />
                  <SavedNews />
                  <Footer />
                </main>
              } />
            )
          } />
          
        </Routes>

        <ModalContext.Provider value={{
          handleModalChange, handleClose, handleOverlay,
          handleRegistration, handleLogin, modalOptions,
        }}>

          {activeModal === 'signin' && (<LoginModal />)}
          {activeModal === 'signup' && (<RegisterModal />)}

        </ModalContext.Provider>

      </div>

    </UserContext.Provider>
  );
};

export default App;
