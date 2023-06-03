import React, { useEffect } from 'react';
import './index.scss';

function ColorPicker({inputs}){
    const colors = [
        '#88C5A1',
        '#AFD297', 
        '#E0E293', 
        '#E1A18E', 
        '#66A3C5', 
        '#C566A3', 
        '#B866C5', 
        '#DECDF5', 
        '#F8F1FF',
        '#DD9AC2', 
        '#B486AB',
        '#EACBD2',
        '##A7CCED',
        '#63ADF2',
        '#304D6D',
        '#82A0BC'
    ]
    return (
        <div className="colorPicker">
            <h1>Pick a Color</h1>
            <div className="colorSwatches">
                {colors.map((value, index) => {
                    return (
                        <div className="colorSwatch" data-color={value} style={{backgroundColor: value}}>
                        </div>
                    )
                })} 
            </div>
        </div>
    );
}

export default ColorPicker;