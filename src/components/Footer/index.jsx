import React from "react";
import "./footer.scss";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="p-3.5 ml-32">
        <p className="mb-1.5">
          Bản quyền của KhanhHoaTravel ® 2016. Bảo lưu mọi quyền.
        </p>
        <p className="mb-1.5">
          Ghi rõ nguồn "
          <a href="http://localhost:8080">www.travel.dangkimlien.online</a>" ®
          khi sử dụng lại thông tin từ website này.
        </p>
        <p className="">
          Số giấy phép kinh doanh lữ hành Quốc tế: 79-234/2014/TCDL-GP LHQT
        </p>
      </div>
    </footer>
  );
};

export default Footer;
