import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BookPage from './pages/BookPage';

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <div className="flex flex-wrap justify-center align-start mt-12 mb-20">
          <Route path="/" component={HomePage} exact />
          <Route path="/book/:id" component={BookPage} exact />
        </div>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
