import React from 'react';
import Slider from "react-slick";

import './sale.scss'
import Sale1 from '../../../public/images/sale-slider/sale-1.webp';
import Sale2 from '../../../public/images/sale-slider/sale-2.jpeg';
import Sale3 from '../../../public/images/sale-slider/sale-3.jpg';
import Sale4 from '../../../public/images/sale-slider/sale-4.jpg';
import Sale5 from '../../../public/images/sale-slider/sale-5.jpg';
import Sale6 from '../../../public/images/sale-slider/sale-6.jpg';

const images = [
    Sale1,
    Sale2,
    Sale3,
    Sale4,
    Sale5,
    Sale6,
];

const Sale = () => {

    const settings = {
        dots: true,
        dotsClass: "slick-dots custom-dots",
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1
    };

    return (
        <div className="sale ml-8">
            <Slider {...settings} >
                {images.map((image, index) => (
                    <div key={index} className="">
                        <img src={image} className=" max-w-[270px] rounded-xl" alt={`image-${index}`}/>
                    </div>
                ))}
            </Slider>

        </div>
    );
};

export default Sale;