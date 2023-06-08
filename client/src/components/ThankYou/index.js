import React from 'react';
import './index.scss';

const handleImageLoad = (e) => {
    let cardElement = e.target.parentNode;
    cardElement.style.height = `${e.target.offsetHeight}px`;
};

function ThankYou(props){
    return (
        <div className="card">
            <img
            onLoad={handleImageLoad} 
            alt='thank you card' 
            src='/images/Green-Floral-Watercolor-Thank-You-Card-no-text.png' 
            className="card-image"/>
            <span className="draggableField"  id="thankyoubride" style={{top: '67%', left: '13%'}} draggable="true">{props.brideState}</span>
            <span className="draggableField"  id="tyampersand" style={{top: '67%', left: '42%'}} draggable="true">And</span>
            <span className="draggableField"  id="thankyougroom" style={{top: '67%', left: '60%'}} draggable="true">{props.groomState}</span>
        </div>
    );
}

export default ThankYou;