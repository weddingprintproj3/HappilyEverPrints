import React from 'react';
import './index.scss';

function Invitation(props){
    return (
        <div className="card">
            <img 
            alt='invitation card' 
            src='/images/White-Green-Watercolor-Floral-Border-Wedding-Invitation-no-text.png' 
            className="card-image"/>
            <span id="invitationbride">{props.brideState}</span>
            <span id="invitationgroom">{props.groomState}</span>
            <span id="invitationdate">{props.invitationDate}</span>
            <span id="invitationtime">{props.invitationTime}</span>
            <span id="invitationlocation">{props.invitationLocation}</span>
        </div>
    );
}

export default Invitation;