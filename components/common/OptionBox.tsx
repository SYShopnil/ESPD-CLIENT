import React from 'react';

const OptionBox = ({option}) => {
    console.log(option);
    return (
        <div className="levelSelectOptionBoxSec">
            <div className="subjectOptionItem">
                <a href="#">{option}</a>
                {/* <a href="#">A Levels</a>
                <a className="subjectOptionActive" href="#">Primary School</a> */}
            </div>
        </div>
    );
};

export default OptionBox;