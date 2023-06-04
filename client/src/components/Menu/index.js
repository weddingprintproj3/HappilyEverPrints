import React from 'react';
import './index.scss';

function Menu(props){
    return (
        <div className="card">
            <img 
            alt='invitation card' 
            src='/images/Floral-Botanical-Wedding-Menu-no-text.png' 
            className="card-image"/>
            <div id="appetizersCourse" className="appetizers draggableField" style={{top: '35%', left: '40%'}}>
                <ul id="appetizerslist">

                </ul>
            </div>
            <div id="entreesCourse" className="entrees draggableField" style={{top: '51%', left: '40%'}}>
                <ul id="entreeslist">
                    
                </ul>
            </div>
            <div id="desertCourse" className="deserts draggableField" style={{top: '67%', left: '40%'}}>
                <ul id="desertslist">
                    
                </ul>
            </div>
            
            <div className="sideText draggableField" id="mnmessage" style={{top: '-3%', left: '7%'}}>The {props.brideState} and {props.groomState} Wedding</div>
        </div>
    );
}

export default Menu;