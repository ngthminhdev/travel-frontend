import { Button, InputNumber, Rate, message } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineFieldTime } from "react-icons/ai";
import { BiComment } from "react-icons/bi";
import { HiOutlineTicket } from "react-icons/hi";
import { MdOutlineDiscount, MdOutlinePlace } from "react-icons/md";
import { RiAccountPinCircleLine, RiHotelLine } from "react-icons/ri";
import { FaMoneyBill } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { axiosAuth } from "../../app/utils/axios.util";
import OrderTourForm from "../../components/OrderTourForm";
import Loading from "../../components/Loading";
import "./tour-detail.scss";
import { Utils } from "../../app/utils";
import { useStore } from "../../store/hooks";
import { setOrderTourInfo } from "../../store/actions";
import AddFeedBack from "../../components/AddFeedBack";
import FeedbackList from "../../components/FeedbackList";

function TourDetai() {
  const { tourId } = useParams();
  const navigate = useNavigate();

  const [state, dispatch] = useStore({});
  const { orderTourInfo } = state;

  const [tour, setTour] = useState(null);
  const [tourComments, setTourComments] = useState(null);
  const [tourist, setTourist] = useState(0);
  const [payment, setPayment] = useState(0);
  const [isSubmit, setIsSubmit] = useState(false);

  const childRef = useRef(null);

  useEffect(() => {
    const fetch = () => {
      axiosAuth
        .get("/travel/get-tour/" + tourId)
        .then((res) => setTour(res.data.data))
        .catch((e) => message.error(e.response.data.message));

      axiosAuth
        .get("/feedback/" + tourId)
        .then((res) => setTourComments(res.data.data))
        .catch((e) => message.error(e.response.data.message));
    };

    fetch();
  }, []);

  const handleTouristChange = (num) => {
    setTourist(num);
    setPayment(
      num > 0 ? tour.price * num - (tour.price * tour.discount) / 100 : 0
    );
  };

  useEffect(() => {
    if (!orderTourInfo || !payment || !tourist) return;

    const data = {
      ...orderTourInfo,
      totalPayment: payment,
      touristNumber: tourist,
    };

    axiosAuth
      .post("/travel/order-tour/" + tourId, data)
      .then((res) => {
        setIsSubmit(true);
        message.success(res.data.message);
        dispatch(
          setOrderTourInfo({
            ...data,
            price: tour.price,
            discount: tour.discount,
          })
        );
        setTimeout(() => navigate(`/tour-payment/${tourId}`), 2000);
      })
      .catch((e) => {
        setIsSubmit(false);
        message.error(e.response.data.message);
      });
  }, [orderTourInfo]);

  const handleOrder = () => {
    childRef.current.submit();
  };

  if (!tour || !tourComments)
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
              <OrderTourForm ref={childRef} />
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
                {Utils.formatPrice(payment || 0)}
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
                onClick={handleOrder}
              >
                <span className="text-[18px]">
                  {isSubmit ? "ĐANG XỬ LÝ..." : "ĐẶT NGAY"}
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="tour-feedback text-primary-20 mt-14">
        <h3 className="text-[18px] text-primary-200text-center mt-4">
          Phản hồi
        </h3>
        <div className="flex">
          <div className="left w-[60%] pr-2 pl-2">
            <div className="mt-4">
              <AddFeedBack tourId={tourId} />
            </div>
          </div>
          <div className="w-[38%] ml-10 pr-2 pl-2">
            <div className="mt-4">
              <div className="flex items-center mb-8">
                <h3 className="text-[18px] text-primary-200text-center mt-4">
                  Đánh giá:{" "}
                  <span className="text-[18px] text-yellow-500">
                    {tour.rating}
                  </span>
                </h3>
                <i className="mt-3 ml-3">
                  <Rate disabled allowHalf defaultValue={tour.rating} />
                </i>
              </div>
              <FeedbackList reviews={tourComments} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TourDetai;
