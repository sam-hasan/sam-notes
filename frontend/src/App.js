import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BookPage from './pages/BookPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import UserEditPage from './pages/UserEditPage';
import UserListPage from './pages/UserListPage';

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <div className="flex flex-wrap justify-center align-start mt-12 mb-20">
          <Route path="/signup" component={SignupPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/book/:id" component={BookPage} />
          <Route path="/admin/userList" component={UserListPage} />
          <Route path="/admin/user/:id/edit" component={UserEditPage} />
          <Route path="/" component={HomePage} exact />
        </div>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
