import React from 'react';
import './index.scss';

const handleImageLoad = (e) => {
    let cardElement = e.target.parentNode;
    cardElement.style.height = `${e.target.offsetHeight}px`;
};


function Invitation(props){
     
    return (
        <div className="card">
            <img 
            onLoad={handleImageLoad}
            alt='invitation card' 
            src='/images/White-Green-Watercolor-Floral-Border-Wedding-Invitation-no-text.png' 
            className="card-image"/>
            <span className="draggableField" id="invitationbride" style={{top: '36%', left: '12%',}}>{props.brideState}</span>
            <span className="draggableField" id="invitationgroom" style={{top: '49%', left: '12%',}}>{props.groomState}</span>
            <span className="draggableField" id="invitationdate" style={{top: '70%', left: '12%',}}>{props.invitationDate}</span>
            <span className="draggableField" id="invitationtime" style={{top: '73%', left: '12%',}}>{props.invitationTime}</span>
            <span className="draggableField" id="invitationlocation" style={{top: '76%', left: '12%',}}>{props.invitationLocation}</span>
        </div>
    );
}

export default Invitation;