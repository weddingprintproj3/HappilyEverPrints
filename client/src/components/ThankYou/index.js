import React, { useEffect } from 'react';
import './index.scss';
function ThankYou(props){
    return (
        <div className="card">
            <img 
            alt='thank you card' 
            src='/images/Black-and-White-Calligraphy-Thank-You-Wedding-Card-no-text.png' 
            className="card-image"/>
            <span className="draggableField"  id="thankyoubride" style={{top: '70%', left: '1%'}}>{props.brideState}</span>
            <span className="draggableField"  id="tyampersand" style={{top: '70%', left: '45%'}}>&</span>
            <span className="draggableField"  id="thankyougroom" style={{top: '70%', left: '50%'}}>{props.groomState}</span>
        </div>
    );
}

export default ThankYou;