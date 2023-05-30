import React from "react";
import { Link } from 'react-router-dom';
import Hero from '../../assets/images/Hero.jpg'
import CategoryMenu from "../../components/CategoryMenu"
import './index.scss';

const Home = () => {
  return (
    <div className="container home-page">
      <div className="hero">
        <h1>Welcome!</h1>
        <p>Happily Ever Prints is your one-stop destination for creatively designed and personalized printables. Whether you're planning an event, need custom stationery, or simply want to add a personal touch to your space, our mission is to help bring your ideas to life beautifully, making every moment special.</p>
        <Link to="login" className="flat-button">GET STARTED</Link>
        <img src={Hero} className="hero-img" alt="Hero"></img>
      </div>
      <div className="category-menu">
      <CategoryMenu />
      </div>
    </div>
  );
};

export default Home;