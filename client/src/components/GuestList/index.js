import React from 'react';
import './index.scss';

function GuestList(props){
    
    return (
        <div className="card">
            <img 
            alt='seating chart' 
            src='/images/White-Green-Watercolor-Leaf-Wedding-Seating-Chart-no-text.png' 
            className="card-image"/>
            <span id="glbrideName">{props.brideState}</span>
            <span id="glampersand">&</span>
            <span id="glgroomName">{props.groomState}</span>
            <div className="guestList table1">
                <h3>Table 1</h3>
                <ul className="tableMembers" id="table1members"></ul>
            </div>
            <div className="guestList table2">
                <h3>Table 2</h3>
                <ul className="tableMembers" id="table2members"></ul>
            </div>
            <div className="guestList table3">
                <h3>Table 3</h3>
                <ul className="tableMembers" id="table3members"></ul>
            </div>
            <div className="guestList table4">
                <h3>Table 4</h3>
                <ul className="tableMembers" id="table4members"></ul>
            </div>
            <div className="guestList table5">
                <h3>Table 5</h3>
                <ul className="tableMembers" id="table5members"></ul>
            </div>
            <div className="guestList table6">
                <h3>Table 6</h3>
                <ul className="tableMembers" id="table6members"></ul>
            </div>
            <div className="guestList table7">
                <h3>Table 7</h3>
                <ul className="tableMembers" id="table7members"></ul>
            </div>
            <div className="guestList table8">
                <h3>Table 8</h3>
                <ul className="tableMembers" id="table8members"></ul>
            </div>
        </div>
    );
}

export default GuestList;