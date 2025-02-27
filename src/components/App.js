import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'
import './App.css';
import auth from '../utils/auth';
import UserContext from '../contexts/UserContext';
import Main from './Main/Main';
import Footer from './Footer/Footer';

function App() {
  const [user, setUser] = useState({ name: 'Tyler', _id: '', token: '', });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeModal, setActiveModal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [savedArticles, setSavedArticles] = useState([]);

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
      searchResults, savedArticles, setUser,
      setIsLoading, setIsLoggedIn, setActiveModal,
      setSearchResults, setSavedArticles
    }}>
      <div className="app">
        <Routes>
          <Route exact path='/' element={<Main />} />
          <Route path='/signup'></Route>
          <Route path='/signin'></Route>
          <Route path='/saved-news'></Route>
        </Routes>
        <Footer />
      </div>
    </UserContext.Provider>
  );
}

export default App;
