import React, { useState } from "react";
import "./login.scss";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast, ToastContainer } from "react-toastify";
import { LocalStorageItem } from "../../app/enum";
import { axiosDevice } from "../../app/utils/axios.util";
import { useStore } from "../../store/hooks";
import { setUserInfo } from "../../store/actions";

const Login = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [state, dispatch] = useStore();

  const schema = Yup.object().shape({
    accountName: Yup.string().required("Tên tài khoản là bắt buộc"),
    password: Yup.string().required("Mật khẩu là bắt buộc"),
  });

  const method = useForm({ resolver: yupResolver(schema) });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = method;

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      const res = await axiosDevice({
        method: "POST",
        url: `/auth/login`,
        data: data,
      });
      const userData = await res.data.data;
      localStorage.setItem(
        LocalStorageItem.AccessToken,
        JSON.stringify(userData.accessToken)
      );
      localStorage.setItem(
        LocalStorageItem.DeviceExpired,
        JSON.stringify(userData.expiredAt)
      );
      localStorage.setItem(
        LocalStorageItem.IsAdmin,
        JSON.stringify(userData.role)
      );
      dispatch(setUserInfo(userData));

      toast.success(res.data.message);
      setTimeout(() => (window.location.href = "/"), 2000);
    } catch (e) {
      setIsSubmitting(false);
      toast.error(e.response.data.message);
    }
  };

  return (
    <div className="login flex justify-center items-center h-full">
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
                htmlFor="accountName"
              >
                Tên tài khoản
              </label>
              <input
                {...register("accountName")}
                className="appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="accountName"
                type="accountName"
                placeholder="Nhập tài khoản của bạn"
              />
              {errors.accountName && (
                <p className="text-red-700">{errors.accountName.message}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="password"
              >
                Mật khẩu
              </label>
              <input
                {...register("password")}
                className="appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Nhập mật khẩu của bạn"
              />
              {errors.password && (
                <p className="text-red-700">{errors.password.message}</p>
              )}
            </div>
            <div className="flex items-center justify-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Đang xử lý..." : "Đăng nhập"}
              </button>
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button submit"
                onClick={() => navigate("/register")}
              >
                Chuyển qua đăng ký
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
