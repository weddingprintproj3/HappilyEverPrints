import React from 'react';
import './index.scss';

const handleImageLoad = (e) => {
    let cardElement = e.target.parentNode;
    cardElement.style.height = `${e.target.offsetHeight}px`;
};


function GuestList(props){
    
    return (
        <div className="card">
            <img 
            onLoad={handleImageLoad}
            alt='seating chart' 
            src='/images/White-Green-And-Black-Floral-Wedding-Seating-Chart-no-text.png' 
            className="card-image"/>
            <span className="draggableField"  id="guestlistbride" style={{top: '21%', left: '23%',}}>{props.brideState}</span>
            <span className="draggableField"  id="glampersand" style={{top: '21%', left: '48%',}}>&</span>
            <span className="draggableField"  id="guestlistgroom" style={{top: '21%', left: '58%',}}>{props.groomState}</span>
            <div id="table1" className="guestList table1 draggableField" style={{top: '38%', left: '7%',}}>
                <h3>Table 1</h3>
                <ul className="tableMembers" id="table1members"></ul>
            </div>
            <div id="table2" className="guestList table2 draggableField" style={{top: '38%', left: '40%',}}>
                <h3>Table 2</h3>
                <ul className="tableMembers" id="table2members"></ul>
            </div>
            <div id="table3" className="guestList table3 draggableField" style={{top: '38%', left: '71%',}}>
                <h3>Table 3</h3>
                <ul className="tableMembers" id="table3members"></ul>
            </div>
            <div id="table4" className="guestList table4 draggableField" style={{top: '62%', left: '7%',}}>
                <h3>Table 4</h3>
                <ul className="tableMembers" id="table4members"></ul>
            </div>
            <div id="table5" className="guestList table5 draggableField" style={{top: '62%', left: '40%',}}>
                <h3>Table 5</h3>
                <ul className="tableMembers" id="table5members"></ul>
            </div>
            <div id="table6" className="guestList table6 draggableField" style={{top: '62%', left: '71%',}}>
                <h3>Table 6</h3>
                <ul className="tableMembers" id="table6members"></ul>
            </div>
        </div>
    );
}

export default GuestList;