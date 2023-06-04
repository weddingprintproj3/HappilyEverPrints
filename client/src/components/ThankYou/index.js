import React, { useEffect } from 'react';
import './index.scss';
function ThankYou(props){
    return (
        <div className="card">
            <img 
            alt='thank you card' 
            src='/images/Black-and-White-Calligraphy-Thank-You-Wedding-Card-no-text.png' 
            className="card-image"/>
            <span id="tybrideName">{props.brideState}</span>
            <span id="tyampersand">&</span>
            <span id="tygroomName">{props.groomState}</span>
        </div>
    );
}

export default ThankYou;