import React, { useState } from 'react';

function FAQ() {
    const [activeIndices, setActiveIndices] = useState([]);

    const handleToggle = index => {
        setActiveIndices(prevIndices =>
            prevIndices.includes(index)
                ? prevIndices.filter(activeIndex => activeIndex !== index)
                : [...prevIndices, index]
        );
    };

    const faqs = [
        {
            question: 'How much does shipping cost?',
            answer: "We are thrilled to offer free shipping within Canada on all orders over 100 CAD. For orders below this amount, and for all shipments to the United States, a flat shipping fee of 4.99 CAD applies. This rate covers standard delivery. Please note that special services such as priority shipping, overnight delivery, insurance, and tracking may incur additional costs. The exact cost of these services varies depending on the shipping carrier and the specific requirements of the order. Our aim is to provide a range of options to suit all our customers' needs while maintaining transparency about the potential costs associated with each choice."
        },
        {
            question: 'What countries do you ship to?',
            answer: 'We offer shipping services throughout Canada, ensuring that our unique products are accessible across the country. Additionally, we are excited to extend our reach internationally to our neighbors in the United States. At this time, these are the only locations we can reliably serve, due to considerations of cost-effectiveness and logistics. However, we are continually exploring opportunities to broaden our shipping capabilities and reach more customers around the globe.'
        },
        {
            question: 'I only received part of my order - where is the rest?',
            answer: "We apologize for any inconvenience caused by this situation. There could be a few reasons why you've only received part of your order. It's possible that your order was shipped in multiple packages and they may not all arrive at the same time. This is common when items are of varying sizes, originate from different warehouses, or if the order was particularly large. Rest assured, the rest of your order should be on its way. In case of delay, you can check the status of your order through the tracking information provided in your shipment confirmation email. If you're unable to locate this information or if it's been an unusually long time since the first package arrived, please contact our customer service team with your order number for assistance. We're here to ensure that you receive your complete order as quickly as possible."
        },
        {
            question: 'Can I change the shipping address?',
            answer: "The ability to change your shipping address after an order has been placed can depend on the status of your order. If your order hasn't been processed or shipped yet, it may be possible to update the shipping address. To do this, please contact our customer service team as soon as possible with your order number and the updated address. However, please note that once an order has been processed or shipped, we're unable to change the shipping address. In such cases, we recommend contacting the shipping carrier to see if they can reroute the package. We understand that situations can change and we aim to be as accommodating as possible, but our primary goal is to get your order to you promptly and safely."
        },
    ];


    return (
        <section className='faq-section'>
            <h1>FAQ</h1>

            {faqs.map(({ question, answer }, index) => (
                <div key={index} className="faq-content">
                    <h2 onClick={() => handleToggle(index)}>
                        {question}
                        <span className={activeIndices.includes(index) ? 'arrow up' : 'arrow down'}>
                            ▼
                        </span>
                    </h2>
                    <p className={activeIndices.includes(index) ? 'active' : ''}>{answer}</p>
                </div>
            ))}

        </section>
    )
};

export default FAQ;