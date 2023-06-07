import React from 'react';
import './index.scss';

const handleImageLoad = (e) => {
    let cardElement = e.target.parentNode;
    cardElement.style.height = `${e.target.offsetHeight}px`;
};

function Menu(props){
    return (
        <div className="card">
            <img 
            onLoad={handleImageLoad}
            alt='invitation card' 
            src='/images/Floral-Botanical-Wedding-Menu-no-text.png' 
            className="card-image"/>
            <div id="appetizersCourse" className="appetizers draggableField" style={{top: '38%', left: '33%'}}>
                <ul id="appetizerslist">

                </ul>
            </div>
            <div id="entreesCourse" className="entrees draggableField" style={{top: '53%', left: '33%'}}>
                <ul id="entreeslist">
                    
                </ul>
            </div>
            <div id="desertCourse" className="deserts draggableField" style={{top: '67%', left: '33%'}}>
                <ul id="desertslist">
                    
                </ul>
            </div>
            
            <div className="sideText draggableField" id="mnmessage" style={{top: '-5%', left: '12%'}}>The {props.brideState} and {props.groomState} Wedding</div>
        </div>
    );
}

export default Menu;