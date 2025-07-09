import { useState, useEffect, useRef } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import './App.css';
import auth from '../utils/auth';
import api from '../utils/api';
import { modalOptions } from '../utils/constants';
import mainBackground from '../assets/main-background.svg';
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
import SuccessModal from './ModalWithForm/SuccessModal/SuccessModal';

function App() {
  const [user, setUser] = useState({ name: '', id: '', token: '', keywords: [] });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeModal, setActiveModal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const [shownResults, setShownResults] = useState(3);
  const [savedArticles, setSavedArticles] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [currentKeyword, setCurrentKeyword] = useState('');
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const isInitialLoad = useRef(true);

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

  const updateUserKeywords = (keywords) => {
    if (!Array.isArray(keywords)) {
      console.error('Invalid keywords format. Expected an array.');
      return;
    }
    setUser({ ...user, keywords: [...keywords]});
  };

  const setUserState = ({ name, id, token, keywords }, log) => {
    setUser({ name, id, token });
    updateUserKeywords(keywords);
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
        .catch((error) => {
          console.error('Error validating token: ', error);
          setIsLoggedIn(false);
        });
    }
  };

  const handleRegistration = ({ name, email, password }) => {
    return handleRequest(() => auth.signup({ name, email, password }));
  }

  const handleLogin = ({ email, password }) => {
    return handleRequest(() => auth.signin({ email, password }))
      .then(({ name, id, token, keywords }) => {
        localStorage.setItem('jwt', token)
        setUserState({ name, id, token, keywords }, true);
        handleArticleList(token);
      })
      .catch((error) => console.error('Error during login: ', error));
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setUserState({ name: "", id: "", token: "", keywords: [] }, false);
    setSavedArticles([]);
  };

  const handleArticleList = (token) => {
    api.getArticleList(token)
      .then((articles) => {
        articles ? setSavedArticles([...articles]) : setSavedArticles([]);
      })
      .catch(console.error);

  };

  const handleDeleteArticle = (article) => {

    return api.removeArticle(article.url, user.token)
      .then(() => {
        setSavedArticles(prev => prev.filter((item) => item.url !== article.url));
      })
      .catch(console.error);
  };

  const handleSaveArticle = (article) => {
    if (savedArticles.some((item) => article.url === item.url)) {
      return Promise.reject({ message: 'Article already in database.' });
    }
    return api.addArticle(article, user.token)
      .then(article => {
        setSavedArticles(prev => [...prev, article]);
      })
      .catch(console.error);
    
  };

  useEffect(() => {
    if(isInitialLoad.current) handleCheckToken();
  }, [user]);

  useEffect(() => {
    if (isInitialLoad.current && user.token) {
      isInitialLoad.current = false;
      handleArticleList(user.token);
    }
    // eslint-disable-next-line
  }, [isLoggedIn, savedArticles]);

  return (
    <UserContext.Provider value={{
      user, isLoading, isSavedNews, isLoggedIn, activeModal, isSearching, shownResults, keywords,
      searchResults, savedArticles, hasSearched, errorMessage, hasError, currentKeyword,
      setUser, setIsLoading, setIsLoggedIn, setActiveModal, setErrorMessage, setHasError,
      setSearchResults, setSavedArticles, setKeywords, setHasSearched, setIsSearching,
      handleSaveArticle, handleDeleteArticle, handleLogout, setShownResults, setCurrentKeyword,
    }}>

      <div className="app">

        <Routes>

          <Route exact path='/' element={
            (
              <Main children={
                <main className='main'>
                  <div className='main__header-group'>
                      <Header />
                      <img className='main__img' src={mainBackground} alt='A smartphone showing business insights' />
                      <SearchForm />
                  </div>
                  <div className='main__content-group'>
                      {isSearching ? 
                        (
                          <div className='card-list__message-group' ><Preloader /></div>
                        ) : searchResults ?
                          (
                            <NewsCardList />
                          ) : null
                      }
                      <About />
                      <Footer />
                  </div>
                </main>

              } />
            )
          } />

          {isLoggedIn && <Route path='saved-news' element={
            (
              <Main children={
                <main className='main'>
                  <Header />
                  <SavedNews />
                  <Footer />
                </main>
              } />
            )
          } />}

          <Route path="*" element={<Navigate to="/" replace />} />
          
        </Routes>

        <ModalContext.Provider value={{
          handleModalChange, handleClose, handleOverlay,
          handleRegistration, handleLogin, modalOptions,
          activeModal,
        }}>

          {activeModal === 'signin' && (<LoginModal />)}
          {activeModal === 'signup' && (<RegisterModal />)}
          {activeModal === 'success' && (<SuccessModal />)}

        </ModalContext.Provider>

      </div>

    </UserContext.Provider>
  );
};

export default App;
