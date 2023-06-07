import React, { useState } from 'react';
import Auth from '../../utils/auth';

function ModificationMenu({ inputs, saved, cartHandler, states }) {
    const [productNumber, setProductNumber] = useState(0)
    function textfields() {
        return (
            <section className="textFields">
                <h3>{inputs.textfieldslabel}</h3>
                {inputs.textfields.map((value, index) => {
                    return (
                        <div className="textField">
                            <label for={value}>{value}</label>
                            <input value={states[value]} name={value} id={value.replaceAll(" ", "")} onChange={inputs.setter}></input>
                        </div>
                    )
                })}
            </section>
        )
    }
    function multifields() {
        return (
            <section className="multifields">
                <h3>{inputs.multifieldslabel}</h3>
                <div className="textField">
                    <label htmlFor={inputs.category.replaceAll(" ", "")}>{inputs.category}</label>
                    <select id={inputs.category.replaceAll(" ", "")}>
                        {inputs.categories.map((value, index) => {
                            return (
                                <option value={value}>{value}</option>
                            )

                        })}
                    </select>
                </div>
                {inputs.multifields.map((value, index) => {
                    return (
                        <div className="textField">
                            <label htmlFor={value.replaceAll(" ", "")}>{value}</label>
                            <input name={value.replaceAll(" ", "")} id={value.replaceAll(" ", "")}></input>
                        </div>
                    )
                })}
                <button className='addNew' onClick={inputs.handlers}>Add Another</button>
            </section>
        )
    }
    return (
        <div className="modMenu">
            <div className="productData">
                <h2 id="productName">{inputs.names[productNumber]}</h2>
                <div id="productDescirption">{inputs.descriptions[productNumber]}</div>
                <div>$ <span id="productPrice">{inputs.prices[productNumber]}</span></div>
            </div>
            {inputs.textfields.length !== 0 && textfields()}
            {inputs.multifields.length !== 0 && multifields()}
            {Auth.loggedIn() ? <button className='saveCard' onClick={inputs.handleSave}>Save</button> : <p>Please Login to Save</p>}
            {saved ? (
                <div className="checkOut">
                    <label htmlFor='productQuantity'>QTY</label>
                    <input id='productQuantity' name='productQuantity' type='number' />
                    <button className='addCart' onClick={cartHandler}>Add to Cart</button>
                </div>
            ) : null}
        </div>
    );
}

export default ModificationMenu;