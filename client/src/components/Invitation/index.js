import React from 'react';
import './index.scss';


function Invitation(props){
     
    return (
        <div className="card">
            <img 
            alt='invitation card' 
            src='/images/White-Green-Watercolor-Floral-Border-Wedding-Invitation-no-text.png' 
            className="card-image"/>
            <span className="draggableField" id="invitationbride" style={{top: '36%', left: '10%',}}>{props.brideState}</span>
            <span className="draggableField" id="invitationgroom" style={{top: '48%', left: '20%',}}>{props.groomState}</span>
            <span className="draggableField" id="invitationdate" style={{top: '65%', left: '10%',}}>{props.invitationDate}</span>
            <span className="draggableField" id="invitationtime" style={{top: '68%', left: '10%',}}>{props.invitationTime}</span>
            <span className="draggableField" id="invitationlocation" style={{top: '71%', left: '10%',}}>{props.invitationLocation}</span>
        </div>
    );
}

export default Invitation;