import React from 'react';
import "./header.scss";
import Logo from "../../public/icons/logo.png"
import {AiOutlineCaretDown, AiOutlineSearch, AiOutlineUser} from "react-icons/ai";

const Header = () => {
    return (
        <header className="header fixed-top">
            <nav className="flex flex-row">
                <div className="left logo">
                    <a href='http://localhost:8080'>
                        <img src={Logo}/>
                    </a>
                </div>
                <div className="item">
                    Du Lịch <i><AiOutlineCaretDown/></i>
                </div>
                <div className="item">
                    Vietravel MICE
                </div>
                <div className="item">
                    Vận chuyển <i><AiOutlineCaretDown/></i>
                </div>
                <div className="item">
                    Tin tức
                </div>
                <div className="item">
                    Khuyến mãi <i><AiOutlineCaretDown/></i>
                </div>
                <div className="item">
                    VietravelPlus
                </div>
                <div className="item">
                    Liên hệ
                </div>
                <div className="right">
                    <input className="search-input"
                           placeholder="Bắt đầu tìm kiếm..."
                    />
                    <div className="search-icon">
                        <i><AiOutlineSearch/></i>
                    </div>
                    <div>
                        <i><AiOutlineUser/></i>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;