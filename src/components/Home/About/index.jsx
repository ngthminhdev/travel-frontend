import React from 'react';

import './about.scss'
import IconsBackground from '../../../public/images/icons-background.jpg'


const About = () => {

    return (
        <div className="sale">
            <h2 className="mb-6">Vì sao nên trọn travel.dangkimlien</h2>
            <div className="flex justify-center items-center">
                <img src={IconsBackground}/>
            </div>
        </div>
    );
};

export default About;