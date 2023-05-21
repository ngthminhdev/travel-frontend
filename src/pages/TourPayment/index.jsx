import {
  BankOutlined,
  CreditCardOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import { Button, Col, Radio, Row, message } from "antd";
import React, { useEffect, useState } from "react";
import { FaMoneyBill } from "react-icons/fa";
import { GrAtm } from "react-icons/gr";
import { HiOutlineTicket } from "react-icons/hi";
import { MdOutlineDiscount } from "react-icons/md";
import { RiAccountPinCircleLine } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";
import { Utils } from "../../app/utils";
import { useStore } from "../../store/hooks";
import "./tour-payment.scss";
import { axiosAuth } from "../../app/utils/axios.util";
import Loading from "../../components/Loading";

function TourPayment() {
  const { tourId } = useParams();
  const navigate = useNavigate();

  const [state, dispatch] = useStore({});
  const { orderTourInfo } = state;

  const [isSubmit, setIsSubmit] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Tiền mặt");

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handlePayment = () => {
    axiosAuth
      .post(`/travel/payment-tour/${tourId}`)
      .then((res) => {
        setIsSubmit(true);
        message.success(res.data.message);
        setTimeout(() => navigate(`/`), 2000);
      })
      .catch((e) => {
        setIsSubmit(false);
        message.error(e.response.data.message);
      });
  };

  useEffect(() => {
    if (!orderTourInfo) return;
  }, [orderTourInfo]);

  const paymentMethods = [
    { name: "Tiền mặt", icon: <DollarOutlined /> },
    { name: "Chuyển khoản", icon: <BankOutlined /> },
    { name: "ATM/ Banking", icon: <GrAtm /> },
    { name: "Thẻ tín dụng", icon: <CreditCardOutlined /> },
  ];

  if (!orderTourInfo)
    return (
      <div className="tour-payment flex justify-center items-center">
        <Loading />
      </div>
    );

  return (
    <div className="tour-payment">
      <div className="tour-content flex text-primary-200 mt-14">
        <div className="left w-[60%] pr-2 pl-2">
          <h2 className="text-[22px]">Thanh toán</h2>
          <div className="mt-8">
            <h3 className="text-[18px]">Các hình thức thanh toán</h3>
            <div className="flex flex-col mt-5">
              <div className="bg-slate-100 p-4 rounded-t-xl">
                <Radio.Group
                  onChange={handlePaymentMethodChange}
                  value={paymentMethod}
                >
                  <Row gutter={[16, 16]}>
                    {paymentMethods.map((method, index) => (
                      <Col key={index} xs={12} sm={8} md={8} lg={5}>
                        <Radio.Button
                          value={method.name}
                          className="text-center"
                        >
                          {method.icon}
                          <div>{method.name}</div>
                        </Radio.Button>
                      </Col>
                    ))}
                  </Row>
                </Radio.Group>
              </div>
              <div className="bg-slate-100 p-4 mt-8 min-h-[300px] rounded-b-xl">
                {paymentMethod === "Tiền mặt" && (
                  <div>
                    Quý khách vui lòng thanh toán tại bất kỳ văn phòng
                    KhanhHoaTravel trên toàn quốc và các chi nhánh tại nước
                    ngoài. Xem chi tiết.
                  </div>
                )}
                {paymentMethod === "Chuyển khoản" && (
                  <div>
                    Quý khách sau khi thực hiện việc chuyển khoản vui lòng gửi
                    email đến{" "}
                    <span className="font-bold">
                      contactcenter@khanhoatravel.com
                    </span>{" "}
                    hoặc gọi tổng đài 19001839 để được xác nhận từ công ty chúng
                    tôi. <br />
                    <br />
                    <span className="font-bold">Tên Tài Khoản</span> : Công ty
                    CP Du lịch và Tiếp thị GTVT Việt Nam – KhanhHoaTravel <br />{" "}
                    <span className="font-bold">Tên tài khoản viết tắt</span> :
                    KHANHHOATRAVEL <br />
                    <span className="font-bold">Số Tài khoản</span> : 007 100
                    115 1480 <br />
                    <span className="font-bold">Ngân hàng </span>: Vietcombank –
                    CN Tp.HCM
                  </div>
                )}
                {paymentMethod === "ATM/ Banking" && (
                  <div>
                    <span className="text-red-500 text-[18px] font-bold">
                      HÌNH THỨC THANH TOÁN BẰNG THẺ ATM/ INTERNET BANKING
                    </span>{" "}
                    <br />
                    <br />
                    KhanhHoaTravel chấp nhận thanh toán bằng thẻ ATM qua cổng
                    thanh toán 123 pay. <br />
                    <br />
                    Hãy đảm bảo Quý khách đang sử dụng thẻ ATM do ngân hàng
                    trong nước phát hành và đã được kích hoạt chức năng thanh
                    toán trực tuyến. <br />
                    <br />
                    Hướng dẫn thanh toán thẻ qua cổng 123 pay :
                    https://123pay.vn/info/huong-dan/huong-dan
                  </div>
                )}
                {paymentMethod === "Zalopay" && (
                  <div>
                    <span className="text-red-500 text-[18px] font-bold">
                      THANH TOÁN BẰNG THẺ TÍN DỤNG
                    </span>{" "}
                    <br />
                    <br />
                    KhanhHoaTravel chấp nhận thanh toán bằng thẻ ATM qua cổng
                    thanh toán 123 pay. <br />
                    <br />
                    Hãy đảm bảo Quý khách đang sử dụng thẻ ATM do ngân hàng
                    trong nước phát hành và đã được kích hoạt chức năng thanh
                    toán trực tuyến. <br />
                    <br />
                    Hướng dẫn thanh toán thẻ qua cồng 123 pay :
                    https://123pay.vn/info/huong-dan/huong-dan
                  </div>
                )}
                {/* {paymentMethod === "Momo" && (
                  <div>
                    Quý khách vui lòng thanh toán tại bất kỳ văn phòng
                    KhanhHoaTravel trên toàn quốc và các chi nhánh tại nước
                    ngoài. Xem chi tiết.
                  </div>
                )} */}
                {paymentMethod === "Thẻ tín dụng" && (
                  <div>
                    <span className="text-red-500 text-[18px] font-bold">
                      THANH TOÁN BẰNG THẺ TÍN DỤNG
                    </span>{" "}
                    <br />
                    <br />
                    Tất cả giao dịch của Quý khách được xử lý bảo mật theo giao
                    thức SSL tại hệ thống của{" "}
                    <span className="font-bold">MasterCard</span>.
                    KhanhHoaTravel không lưu giữ bất kì thông tin nào về thẻ của
                    quý khách tại hệ thống của KhanhHoaTravel. Do đó, quý khách
                    có thể hoàn toàn an tâm rằng thông tin thẻ của Quý khách sẽ
                    được bảo đảm an toàn tuyệt đối tại hệ thống của{" "}
                    <span className="font-bold">MasterCard</span> và Ngân hàng
                    Ngoại Thương Việt Nam (Vietcombank).
                    <br />
                    <br />
                    Hiện tại hệ thống www.travel.dangkimlien.online chấp nhận
                    cho Quý khách thanh toán bằng một trong các loại thẻ sau:
                    VISA (Credit hoặc Debit),{" "}
                    <span className="font-bold">MasterCard</span> (Credit),
                    <span className="font-bold">
                      Diners Clup International
                    </span>{" "}
                    (Credit), JCB (Credit) và{" "}
                    <span className="font-bold">American Express</span> (Credit)
                    của bất kỳ ngân hàng nào.
                  </div>
                )}
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
              Hành khách: {orderTourInfo?.touristNumber || 0}
            </div>
            <div className="flex mt-8 pl-8 text-[16px]">
              <i className="mt-1 mr-3 ">
                <HiOutlineTicket className="scale-150" />
              </i>
              Giá: {Utils.formatPrice(orderTourInfo?.price) || 0}
            </div>
            <div className="flex mt-8 pl-8 text-[16px]">
              <i className="mt-1 mr-3 ">
                <MdOutlineDiscount className="scale-150" />
              </i>
              Giảm Giá: {orderTourInfo?.discount}%
            </div>
            <div className="flex mt-8 mr-3 pl-8 text-[18px] font-bold float-right">
              TỔNG CỘNG:{" "}
              <span className="text-red-500 text-[18px] font-bold ml-2">
                {Utils.formatPrice(orderTourInfo?.totalPayment || 0)}
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
                onClick={handlePayment}
              >
                <span className="text-[18px]">
                  {isSubmit ? "ĐANG XỬ LÝ..." : "ĐẶT NGAY"}
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TourPayment;
