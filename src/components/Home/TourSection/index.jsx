import React from "react";

import "./tour-section.scss";
import TravelCard from "../../TravelCard";
import Sale7 from "../../../public/images/sale-slider/sale-7.jpg";
import Sale8 from "../../../public/images/sale-slider/sale-8.jpg";
import Sale9 from "../../../public/images/sale-slider/sale-9.jpg";

const TourSection = () => {
  return (
    <div className="tour-section flex justify-between items-center">
      <TravelCard
        data={{
          tourName: "Tour Lặn Biển Vịnh Nha Trang 1 Ngày.",
          image: Sale7,
          description:
            "Với đội ngũ nhân viên giàu kinh nghiệm và am hiểu về du lịch, nhà du lịch tổ chức chuyên nghiệp cung cấp các dịch vụ hỗ trợ khách hàng như đặt tour, thuê xe du lịch, đặt phòng khách sạn, đặt vé máy bay… để khách hàng có thể tận hưởng kỳ nghỉ của mình một cách trọn vẹn và tiện lợi nhất. ",
          price: "900,000₫",
        }}
      />

      <TravelCard
        data={{
          tourName: "Hòn Tằm Nha Trang 1 Ngày",
          image: Sale8,
          description:
            "Với đội ngũ nhân viên giàu kinh nghiệm và am hiểu về du lịch, nhà du lịch tổ chức chuyên nghiệp cung cấp các dịch vụ hỗ trợ khách hàng như đặt tour, thuê xe du lịch, đặt phòng khách sạn, đặt vé máy bay… để khách hàng có thể tận hưởng kỳ nghỉ của mình một cách trọn vẹn và tiện lợi nhất. ",
          price: "750,000₫    ",
        }}
      />

      <TravelCard
        data={{
          tourName: "Đà Lạt - Nha Trang - 4 Ngày 3 Đêm",
          image: Sale9,
          description:
            "Với đội ngũ nhân viên giàu kinh nghiệm và am hiểu về du lịch, nhà du lịch tổ chức chuyên nghiệp cung cấp các dịch vụ hỗ trợ khách hàng như đặt tour, thuê xe du lịch, đặt phòng khách sạn, đặt vé máy bay… để khách hàng có thể tận hưởng kỳ nghỉ của mình một cách trọn vẹn và tiện lợi nhất. ",
          price: "3,600,000₫",
        }}
      />
    </div>
  );
};

export default TourSection;
