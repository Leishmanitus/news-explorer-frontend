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
  const [user, setUser] = useState({ name: 'Ty', _id: '', token: '', });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeModal, setActiveModal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const [shownResults, setShownResults] = useState(3);
  const [savedArticles, setSavedArticles] = useState(null);
  const [keywords, setKeywords] = useState([]);
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
      .then(() => handleClose())
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  const setUserState = ({ name, _id, token }, log) => {
    setUser({ name, _id, token });
    setIsLoggedIn(log);
  };

  // const setTempToken = () => {
  //   localStorage.setItem('jwt', tempToken);
  // }

  const handleCheckToken = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      return auth.getUser(jwt)
        .then(( { data: { name, _id } }) => {
          setUser({ name, _id, token: jwt });
          setIsLoggedIn(true);
        })
        .catch(console.error);
    }
    return jwt;
  };

  const handleRegistration = (values) => {
    return handleRequest(() => {
      return auth.signup(values)
        .then(() => {
          return handleLogin(values);
        });
    });
  }

  const handleLogin = (values) => {
    return handleRequest(() => {
      return auth.signin(values)
        .then(({ data: { name, _id, token } }) => {
          if (token) {
            localStorage.setItem('jwt', token)
            setUserState({ name, _id, token }, true);
          }

          return user;
        });
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setUserState({ name: "", _id: "" }, "", false);
  };

  const handleDeleteArticle = (article) => {
    return handleRequest(() => {
      return api.removeArticle(article._id, user.token)
        .then(() => {
          setSavedArticles(savedArticles.filter((item) => item._id !== article._id));
        });
    });
  };

  const handleSaveArticle = (article) => {
    return handleRequest(() => {
      return api.addArticle(article, user.token)
        .then(({ data }) => {
          setSavedArticles([...savedArticles, data]);
        });
    });
  };

  useEffect(() => {
    if (!handleCheckToken()) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }

    if (isLoggedIn) {
      api.getArticleList(user.token)
        .then(({ data }) => {
          setSavedArticles(data);
        })
        .catch(console.error);
    }
  }, [isLoggedIn, user.token]);

  return (
    <UserContext.Provider value={{
      user, isLoading, isSavedNews, isLoggedIn, activeModal, shownResults,
      searchResults, savedArticles, keywords, hasSearched, errorMessage,
      setUser, setIsLoading, setIsLoggedIn, setActiveModal, setErrorMessage,
      setSearchResults, setSavedArticles, setKeywords, setHasSearched,
      handleSaveArticle, handleDeleteArticle, handleLogin,
      handleLogout, handleRegistration, setShownResults,
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
                      {isLoading ? 
                        (<div className='card-list__message-group' ><Preloader /></div>)
                        :
                        searchResults ?
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
                  {hasSearched && setHasSearched(false)}
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
          handleRegistration, handleLogin, handleLogout,
          modalOptions
        }}>

          {activeModal === 'signin' && (<LoginModal />)}
          {activeModal === 'signup' && (<RegisterModal />)}

        </ModalContext.Provider>

      </div>

    </UserContext.Provider>
  );
};

export default App;
