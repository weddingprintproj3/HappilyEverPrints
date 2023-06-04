import React from 'react';
import './index.scss';

function Menu(props){
    return (
        <div className="card">
            <img 
            alt='invitation card' 
            src='/images/Floral-Botanical-Wedding-Menu-no-text.png' 
            className="card-image"/>
            <div className="appetizers">
                <ul id="appetizerslist">

                </ul>
            </div>
            <div className="entrees">
                <ul id="entreeslist">
                    
                </ul>
            </div>
            <div className="deserts">
                <ul id="desertslist">
                    
                </ul>
            </div>
            
            <div className="sideText" id="mnmessage">The {props.brideState} and {props.groomState} Wedding</div>
        </div>
    );
}

export default Menu;