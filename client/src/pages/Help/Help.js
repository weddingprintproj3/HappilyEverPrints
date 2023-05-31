import React from 'react';
import Contact from './Contact';
import FAQ from './FAQ';
import './index.scss';

function Help() {
    return (
        <div className="container help-page">
            <FAQ />
            <Contact />
        </div>
    )
}

export default Help;