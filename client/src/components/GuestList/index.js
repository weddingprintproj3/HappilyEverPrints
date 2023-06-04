import React from 'react';
import './index.scss';

function GuestList(props){
    
    return (
        <div className="card">
            <img 
            alt='seating chart' 
            src='/images/White-Green-Watercolor-Leaf-Wedding-Seating-Chart-no-text.png' 
            className="card-image"/>
            <span className="draggableField"  id="guestlistbride" style={{top: '13%', left: '30%',}}>{props.brideState}</span>
            <span className="draggableField"  id="glampersand" style={{top: '19%', left: '47%',}}>&</span>
            <span className="draggableField"  id="guestlistgroom" style={{top: '22%', left: '55%',}}>{props.groomState}</span>
            <div id="table1" className="guestList table1 draggableField" style={{top: '40%', left: '5%',}}>
                <h3>Table 1</h3>
                <ul className="tableMembers" id="table1members"></ul>
            </div>
            <div id="table2" className="guestList table2 draggableField" style={{top: '40%', left: '25%',}}>
                <h3>Table 2</h3>
                <ul className="tableMembers" id="table2members"></ul>
            </div>
            <div id="table3" className="guestList table3 draggableField" style={{top: '40%', left: '45%',}}>
                <h3>Table 3</h3>
                <ul className="tableMembers" id="table3members"></ul>
            </div>
            <div id="table4" className="guestList table4 draggableField" style={{top: '40%', left: '65%',}}>
                <h3>Table 4</h3>
                <ul className="tableMembers" id="table4members"></ul>
            </div>
            <div id="table5" className="guestList table5 draggableField" style={{top: '65%', left: '5%',}}>
                <h3>Table 5</h3>
                <ul className="tableMembers" id="table5members"></ul>
            </div>
            <div id="table6" className="guestList table6 draggableField" style={{top: '65%', left: '25%',}}>
                <h3>Table 6</h3>
                <ul className="tableMembers" id="table6members"></ul>
            </div>
            <div id="table7" className="guestList table7 draggableField" style={{top: '65%', left: '45%',}}>
                <h3>Table 7</h3>
                <ul className="tableMembers" id="table7members"></ul>
            </div>
            <div id="table8" className="guestList table8 draggableField" style={{top: '65%', left: '65%',}}>
                <h3>Table 8</h3>
                <ul className="tableMembers" id="table8members"></ul>
            </div>
        </div>
    );
}

export default GuestList;