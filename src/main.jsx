import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/styles.scss';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Header from './components/Header';
import Searchbar from './components/Searchbar';
import Filters from './components/Filters';
import Jobs from './components/Jobs';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Navbar />

    <Header />
    <Searchbar />
    <Filters />
    <Jobs />

    <Footer />
  </React.StrictMode>,
)
