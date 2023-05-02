import React, {useState} from 'react';
import "./home.scss"
import {useForm} from "react-hook-form";
import {useNavigate, useParams} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import HomeBackground from "../../public/images/home_background.jpg"
import {TbTruckDelivery} from "react-icons/tb";
import {RiHotelLine} from "react-icons/ri";
import {TabType} from "../../app/enum";
import {GiCommercialAirplane} from "react-icons/gi";
import {AiOutlinePlus, AiOutlineSearch} from "react-icons/ai";
import {BiCar} from "react-icons/bi";
import Tour from "../../components/Tabs/Tour";
import {About, Sale} from "../../components/Home";
import TourSection from "../../components/Home/TourSection";
import {Helmet} from "react-helmet";

const Home = () => {
    const navigate = useNavigate();
    const {userId} = useParams();

    const method = useForm({})
    const {register, handleSubmit} = method;

    const onSubmit = async (data) => {

    }

    const [activeTab, setActiveTab] = useState(TabType.Tour);
    const handleTabClick = (tabIndex) => {
        setActiveTab(tabIndex);
    };

    return (
        <div className="home flex justify-center position-relative">
            <Helmet>
                <title>Đặng Kim Liên - Travel</title>
            </Helmet>
            <ToastContainer/>
            <img className="background w-full" src={HomeBackground}/>
            <div className="container flex flex-col mt-52">
                <div className="tab-container rounded-lg p-10">
                    <div>
                        <ul className="flex border-b bg-bg-color rounded-t-lg">
                            <li className={`${activeTab === TabType.Tour 
                                ? 'border-l border-t border-r rounded-t bg-white' : 'border-b'}`}>
                                <div
                                    className={`${
                                        activeTab === TabType.Tour ? 'text-primary-100' : 'text-white hover:text-primary-100 hover:bg-white'
                                    } py-2 px-4`}
                                    onClick={() => handleTabClick(TabType.Tour)}
                                >
                                    <i><TbTruckDelivery/></i>
                                    Tour du lịch trọn gói
                                </div>
                            </li>
                            <li className={`${activeTab === TabType.Hotel 
                                ? 'border-l border-t border-r rounded-t bg-white' : 'border-b'}`}>
                                <div
                                    className={`${
                                        activeTab === TabType.Hotel ? 'text-primary-100' : 'text-white hover:text-primary-100 hover:bg-white'
                                    } py-2 px-4`}
                                    onClick={() => handleTabClick(TabType.Hotel)}
                                >
                                    <i><RiHotelLine/></i>
                                    Khách sạn
                                </div>
                            </li>
                            <li className={`${activeTab === TabType.Airplane
                                ? 'border-l border-t border-r rounded-t bg-white' : 'border-b'}`}>
                                <div
                                    className={`${
                                        activeTab === TabType.Airplane ? 'text-primary-100' : 'text-white hover:text-primary-100 hover:bg-white'
                                    } py-2 px-4`}
                                    onClick={() => handleTabClick(TabType.Airplane)}
                                >
                                    <i><GiCommercialAirplane/></i>
                                    Vé máy bay
                                </div>
                            </li>
                            <li className={`${activeTab === TabType.AirHotel? 'border-l border-t border-r rounded-t bg-white' : 'border-b'}`}>
                                <div
                                    className={`${
                                        activeTab === TabType.AirHotel ? 'text-primary-100' : 'text-white hover:text-primary-100 hover:bg-white'
                                    } py-2 px-4`}
                                    onClick={() => handleTabClick(TabType.AirHotel)}
                                >
                                    <i><GiCommercialAirplane/><span><AiOutlinePlus className="i"/></span><RiHotelLine/></i>
                                    Máy bay + khách sạn
                                </div>
                            </li>
                            <li className={`${activeTab === TabType.CarHotel
                                ? 'border-l border-t border-r rounded-t bg-white' : 'border-b'}`}>
                                <div
                                    className={`${
                                        activeTab === TabType.CarHotel ? 'text-primary-100' : 'text-white hover:text-primary-100 hover:bg-white'
                                    } py-2 px-4`}
                                    onClick={() => handleTabClick(TabType.CarHotel)}
                                >
                                    <i><BiCar/><span><AiOutlinePlus className="i"/></span><RiHotelLine/></i>
                                    Xe + khách sạn
                                </div>
                            </li>
                            <li className={`${activeTab === TabType.Search
                                ? 'border-l border-t border-r rounded-t bg-white' : 'border-b'}`}>
                                <div
                                    className={`${
                                        activeTab === TabType.Search ? 'text-primary-100' : 'text-white hover:text-primary-100 hover:bg-white'
                                    } py-2 px-4`}
                                    onClick={() => handleTabClick(TabType.Search)}
                                >
                                    <i><AiOutlineSearch/></i>
                                    Tra cứu Booking
                                </div>
                            </li>
                        </ul>
                        <div className="tab-content p-6 bg-white rounded-b-lg shadow-xl">
                            {activeTab === TabType.Tour && <div><Tour/></div>}
                            {activeTab === TabType.Hotel && <p>Content for Tab 2</p>}
                        </div>
                    </div>
                </div>
                <div className="sale-section mb-16">
                    <h2 className="mb-5 text-4xl">Ưu đãi</h2>
                    <Sale />
                </div>
                <div className="tour-section mb-16">
                    <h2 className="mb-5 text-4xl">Tour nổi bật</h2>
                    <TourSection />
                </div>
                <div className="about-section">
                    <About />
                </div>
            </div>
        </div>
    );
};

export default Home;