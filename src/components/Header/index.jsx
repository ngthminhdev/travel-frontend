import React, { useState } from "react";
import "./header.scss";
import Logo from "../../public/icons/logo.png";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../store/hooks";
import Avatar from "react-avatar";
import { FaRegUser } from "react-icons/fa";
import Loading from "../Loading";
import UserMenu from "../UserMenu";

const endPoint = process.env.REACT_APP_DOMAIN;
const Header = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useStore();
  const { userInfo } = state;

  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <header className="header fixed-top">
      <nav className="flex flex-row justify-between">
        <div className="left logo">
          <a href={endPoint}>
            <img src={Logo} />
          </a>
        </div>
        <div className="middle flex flex-row">
          <div className="item">Du Lịch</div>
          <div className="item">Tour</div>
          <div className="item">Bài viết</div>
          <div className="item">Liên hệ</div>
          {userInfo && userInfo?.role === 1 && (
            <div onClick={() => navigate("/management")} className="item">
              Quản lý
            </div>
          )}
        </div>
        <div className="right">
          <input className="search-input" placeholder="Bắt đầu tìm kiếm..." />
          <div className="search-icon">
            <i>
              <AiOutlineSearch />
            </i>
          </div>
          <div className="cursor-pointer user-icon">
            {userInfo ? (
              userInfo?.avatar ? (
                <Loading />
              ) : (
                <div
                  className="relative"
                  onMouseOver={() => setUserMenuOpen(true)}
                  onMouseLeave={() => setUserMenuOpen(false)}
                >
                  <div onClick={() => navigate("/profile")}>
                    <Avatar name={userInfo.username} size="35" round={true} />
                  </div>
                  {userMenuOpen && (
                    <div className="z-50 absolute top-10 right-0">
                      <UserMenu />
                    </div>
                  )}
                </div>
              )
            ) : (
              <div onClick={() => navigate("/login")}>
                <i>
                  <FaRegUser />
                </i>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
