import React, { useState } from 'react';

function SingleFAQ(faq) {

    console.log(faq);
    const [items, setItems] = useState([1, 2, 3, 4]);

    return (
        <div className="faqsWrap">
            <div className="accordion" id="accordionExample">
                {items.map((item, i) => {
                    return (
                        <div className="accordion-item" key={i}>
                            <h2 className="accordion-header" id="headingOne">
                                <button className="accordion-button" type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target={'#collapse' + i}>
                                    {/* Accordion Item {item} */}
                                    {faq?.question}
                                </button>
                            </h2>
                            <div id={'collapse' + i} className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    {faq?.answer}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

        </div>
    );
}

export default SingleFAQ;