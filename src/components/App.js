import { useState } from 'react';
import { Route } from 'react-router-dom'
import './App.css';
import UserContext from '../contexts/UserContext';
import Header from './Header/Header';
import Main from './Main/Main';
import Footer from './Footer/Footer';

function App() {
  const [user, setUser] = useState({ name: '', _id: '', token: '', });

  return (
    <UserContext.Provider value={user}>
      <div className="app">
        <Main >
          <Header />
        </Main>
        <Footer />
      </div>
    </UserContext.Provider>
  );
}

export default App;
