import React from 'react';
import invitationImg from '../../assets/images/home/White-Green-Watercolor-Floral-Border-Wedding-Invitation.png';
import menuImg from '../../assets/images/home/Floral-Botanical-Wedding-Menu.png';
import thankYouImg from '../../assets/images/home/Green-Floral-Watercolor-Thank-You-Card.png';
import seatingChartImg from '../../assets/images/home/White-Green-And-Black-Floral-Wedding-Seating-Chart.png';
import './index.scss';

function CategoryMenu() {

  const categories = [
    { title: "Invitations", image: invitationImg, link: "/products/invitation" },
    { title: "Menus", image: menuImg, link: "/products/menu" },
    { title: "Thank you cards", image: thankYouImg, link: "/products/thankyou" },
    { title: "Seating charts", image: seatingChartImg, link: "/products/guestlist" }
  ];

  return (

    <div className="category-menu">
      <div className="title">
        <h2>Choose a Category:</h2>
      </div>
      <div className="projects-grid">
        {categories.map((category, index) => (
          <a href={category.link} className="category-card" key={index}>
            <img src={category.image} alt={category.title} />
            <p>{category.title}</p>
          </a>
        ))}
      </div>
    </div>
  );
}

export default CategoryMenu;