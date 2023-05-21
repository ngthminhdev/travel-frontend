import React, { useState } from "react";
import "./confirmAccount.scss";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { axiosDevice } from "../../app/utils/axios.util";

const ConfirmAccount = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const method = useForm({});
  const { register, handleSubmit } = method;

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      const res = await axiosDevice({
        method: "POST",
        url: `/auth/verify-otp/${userId}`,
        data: data,
      });
      toast.success(res.data.message);
      setTimeout(() => navigate(`/`), 2000);
    } catch (e) {
      setIsSubmitting(false);
      toast.error(e.response.data.message);
    }
  };

  return (
    <div className="confirm flex justify-center items-center">
      <ToastContainer />
      <div className="max-w-md mx-auto mt-8 bg-white rounded-lg shadow-md overflow-hidden w-screen">
        <div className="px-16 py-8">
          <h3 className="text-center font-bold text-xl mb-1">
            Chào mừng quý khách đến với
          </h3>
          <h2 className="text-center font-bold text-2xl mb-4">
            KhanhHoaTravel
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="email"
              >
                Nhập mã OTP:
              </label>
              <input
                {...register("verifyOTP")}
                maxLength="6"
                className="appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="phone"
                type="phone"
                placeholder="Nhập mã OTP"
              />
            </div>
            <div className="flex items-center justify-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Đang xử lý..." : "Hoàn tất"}
              </button>
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button submit"
                onClick={() => navigate("/login")}
              >
                Gửi lại OTP
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmAccount;
