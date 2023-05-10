import { Button, InputNumber, message } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineFieldTime } from "react-icons/ai";
import { BiComment } from "react-icons/bi";
import { HiOutlineTicket } from "react-icons/hi";
import { MdOutlineDiscount, MdOutlinePlace } from "react-icons/md";
import { RiAccountPinCircleLine, RiHotelLine } from "react-icons/ri";
import { FaMoneyBill } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { axiosAuth } from "../../app/utils/axios.util";
import BuyTourForm from "../../components/BuyTourForm";
import Loading from "../../components/Loading";
import "./tour-detail.scss";
import { Utils } from "../../app/utils";

function TourDetai() {
  const { tourId } = useParams();

  const [tour, setTour] = useState(null);
  const [tourist, setTourist] = useState(0);

  const childRef = useRef(null);

  const handleSubmit = () => {
    childRef.current.submit();
  };

  useEffect(() => {
    const fetch = () => {
      axiosAuth
        .get("/travel/get-tour/" + tourId)
        .then((res) => setTour(res.data.data))
        .catch((e) => message.error(e.response.data.message));
    };

    fetch();
    console.log(tour);
  }, []);

  const handleTouristChange = (num) => {
    setTourist(num);
  };

  if (!tour)
    return (
      <div className="tour-detail flex justify-center items-center">
        <Loading />
      </div>
    );

  return (
    <div className="tour-detail">
      <div className="tour-heading flex rounded-xl bg-slate-100">
        <div className="img-container rounded-xl object-cover">
          <img
            src={tour.image}
            alt={tour.tourName}
            style={{
              maxWidth: "400px",
              maxHeight: "350px",
            }}
          />
        </div>
        <div className="ml-8 pt-6 pb-6">
          <div className="flex items-center">
            <i>
              <BiComment className="scale-250 mr-4 mt-2 relative fill-yellow-500" />
            </i>
            <span className="font-bold text-xl text-primary-200 mr-6">
              Rất tốt
            </span>
            <span>{tour.following} quan tâm</span>
          </div>
          <div className="mt-4 text-2xl font-bold text-primary-200">
            {tour.tourName}
          </div>
          <div className="flex mt-8">
            <i className="mt-0.5 mr-3 ">
              <HiOutlineTicket className="scale-150" />
            </i>
            Mã Tour: {tour.id}
          </div>
          <div className="flex mt-2">
            <i className="mt-0.5 mr-3 ">
              <AiOutlineFieldTime className="scale-150" />
            </i>
            Khởi hành: {tour.startTime}
          </div>
          <div className="flex mt-2">
            <i className="mt-0.5 mr-3 ">
              <MdOutlinePlace className="scale-150" />
            </i>
            Nơi Khởi hành: {tour.startPlace}
          </div>
          <div className="flex mt-2">
            <i className="mt-0.5 mr-3 ">
              <MdOutlineDiscount className="scale-150" />
            </i>
            Số chỗ còn nhận: {tour.quantity}
          </div>
          <div className="flex mt-2">
            <i className="mt-0.5 mr-3 ">
              <RiHotelLine className="scale-150" />
            </i>
            Dịch vụ : Xe -{" "}
            <input
              className="mr-4 ml-2"
              type="checkbox"
              disabled
              checked={tour.isCar}
            />
            Khách sạn -{" "}
            <input
              className="mr-4 ml-2"
              type="checkbox"
              disabled
              checked={tour.isHotel}
            />
            Máy bay -{" "}
            <input
              className="mr-4 ml-2"
              type="checkbox"
              disabled
              checked={tour.isAirplane}
            />
          </div>
        </div>
      </div>
      <div className="tour-content flex text-primary-200 mt-14">
        <div className="left w-[60%] pr-2 pl-2">
          <h2 className="text-[22px]">Tổng quan về chuyến đi</h2>
          <div className="mt-8">
            <h3 className="text-[18px]">Thông tin liên lạc</h3>
            <div className="bg-slate-100 p-4">
              <BuyTourForm ref={childRef} />
              <div className="flex items-center">
                <label className="mr-4">Số lượng hành Khách:</label>
                <InputNumber
                  min={0}
                  defaultValue={0}
                  className="w-16 border-none focus:outline-none"
                  onChange={handleTouristChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="right w-[38%] ml-10 pr-2 pl-2 outline-1 border-solid rounded-xl ">
          <h3 className="text-[18px] text-center mt-4">Tóm tắt chuyến đi</h3>
          <div>
            <div className="flex mt-8 pl-8 text-[16px]">
              <i className="mt-1 mr-3 ">
                <RiAccountPinCircleLine className="scale-150" />
              </i>
              Hành khách: {tourist || 0}
            </div>
            <div className="flex mt-8 pl-8 text-[16px]">
              <i className="mt-1 mr-3 ">
                <HiOutlineTicket className="scale-150" />
              </i>
              Giá: {Utils.formatPrice(tour.price) || 0}
            </div>
            <div className="flex mt-8 pl-8 text-[16px]">
              <i className="mt-1 mr-3 ">
                <MdOutlineDiscount className="scale-150" />
              </i>
              Giảm Giá: {tour.discount}%
            </div>
            <div className="flex mt-8 mr-3 pl-8 text-[18px] font-bold float-right">
              TỔNG CỘNG:{" "}
              <span className="text-red-500 text-[18px] font-bold ml-2">
                {Utils.formatPrice(
                  tourist > 0 &&
                    tour.price * tourist - (tour.price * tour.discount) / 100
                ) || 0}
              </span>
              <i className="mt-1.5 ml-3 ">
                <FaMoneyBill className="scale-150" />
              </i>
            </div>
            <div className="flex mt-28 mr-3 pl-8">
              <Button
                type="primary"
                danger
                htmlType="submit"
                className="w-full h-[40px] font-bold"
                onClick={handleSubmit}
              >
                <span className="text-[18px]">ĐẶT NGAY</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TourDetai;
