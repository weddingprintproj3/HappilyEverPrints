import React from 'react';
import './index.scss';


function ModificationMenu({inputs, saved, cartHandler}){

    function textfields(){
        return(
            <section className="textFields">
                <h3>{inputs.textfieldslabel}</h3>
                {inputs.textfields.map((value, index) => {
                    return (
                        <div className="textField">
                            <label for={value}>{value}</label>
                            <input name={value} id={value.replaceAll(" ", "")} onChange={inputs.setter}></input>
                        </div>
                    )
                })}
            </section>
        )
    }
    function multifields(){
        return(
            <section className="multifields">
                <h3>{inputs.multifieldslabel}</h3>
                <label for={inputs.category.replaceAll(" ", "")}>{inputs.category}</label>
                <select id={inputs.category.replaceAll(" ", "")}>
                    {inputs.categories.map((value, index) => {
                        return (
                            <option value={value}>{value}</option>
                        )
                    })}
                </select>
                {inputs.multifields.map((value, index) => {
                    return (
                        <div className="textField">
                            <label for={value.replaceAll(" ", "")}>{value}</label>
                            <input name={value.replaceAll(" ", "")} id={value.replaceAll(" ", "")}></input>
                        </div>
                    )
                })}
            <button className='addNew' onClick={inputs.handlers}>Add Another</button>  
            </section>
        )
    }
    return (
        <div className="card modMenu">
            {inputs.textfields.length !==0 && textfields()}
            {inputs.multifields.length !==0 && multifields()}
            <button className='saveCard' onClick={inputs.handleSave}>Save</button>
            {saved? (
                <div className="checkOut">
                    <label for='productQuantity'>QTY</label>    
                    <input id='productQuantity' name='productQuantity' type='number' />
                    <button className='addCart' onClick={cartHandler}>Add to Cart</button>
                </div>
            ):null}  
        </div>
    );
}

export default ModificationMenu;