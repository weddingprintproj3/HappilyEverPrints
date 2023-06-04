import React from "react";
import { Link } from 'react-router-dom';
import Hero from '../../assets/images/Hero.jpg';
import CategoryMenu from "../../components/CategoryMenu";
import ProductList from "../../components/ProductList"
import Auth from '../../utils/auth';

import './index.scss';

function Home() {

  const ifLogged = Auth.loggedIn() 
  ? <Link to="profile" className="flat-button">GET STARTED</Link>
  : <Link to="signup" className="flat-button">GET STARTED</Link>;

  return (
    <div className="container home-page">
      <div className="hero">
        <h1>Welcome!</h1>
        <p>Happily Ever Prints is your one-stop destination for beautifully designed and personalized wedding printables. From save-the-dates and invitations to thank you cards and custom stationery, we aim to enhance the uniqueness of your special day. Our mission is to help bring your ideas to life beautifully, making every moment special.</p>
        {ifLogged}
        <img src={Hero} className="hero-img" alt="Hero"></img>
      </div>
      <CategoryMenu />
      <ProductList />
    </div>
  );
};

export default Home;