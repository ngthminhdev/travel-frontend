import React, {useState} from 'react';
import "./register.scss"
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import * as Yup from "yup";
import {yupResolver} from '@hookform/resolvers/yup';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';


const Register = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const schema = Yup.object().shape({
        accountName: Yup.string().required("Tên tài khoản là bắt buộc"),
        username: Yup.string().required("Tên người dùng là bắt buộc"),
        phone: Yup.string().required("Số điện thoại là bắt buộc").matches(/^\d{10}$/, "Số điện thoại không hợp lệ"),
        password: Yup.string().required("Mật khẩu là bắt buộc").matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, "Mật khẩu phải có ít nhất 8 ký tự bao gồm chữ và số"),
        confirmPassword: Yup.string().required("Mật khẩu xác nhận là bắt buộc").oneOf([Yup.ref('password'), null], 'Mật khẩu xác nhận không khớp')
    });

    const method = useForm({resolver: yupResolver(schema)})
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = method;


    const onSubmit = async (data) => {
        try {
            setIsSubmitting(true);
            const res = await axios({
                method: 'POST',
                url: `${process.env.REACT_APP_ENDPOINT}/auth/register`,
                data: data
            });
            toast.success(res.data.message)
            setTimeout(() => navigate(`/confirm-account/${res.data.data.user_id}`), 3000)
        } catch (e) {
            setIsSubmitting(false);
            toast.error(e.response.data.message)
        }
    }

    return (
        <div className="register flex justify-center items-center">
            <ToastContainer/>
            <div className="max-w-md mx-auto mt-8 mb-8 bg-white rounded-lg shadow-md overflow-hidden w-screen">
                <div className="px-16 py-8">
                    <h3 className="text-center font-bold text-xl mb-1">Chào mừng quý khách đến với</h3>
                    <h2 className="text-center font-bold text-2xl mb-4">Vietravel</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="accountName  ">
                                Tên tài khoản
                            </label>
                            <input
                                {...register('accountName')}
                                className="appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="accountName" type="accountName" placeholder="Nhập số điện thoại của bạn"/>
                            {errors.accountName && <p className="text-red-700">{errors.accountName.message}</p>}

                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="username">
                                Tên người dùng
                            </label>
                            <input
                                {...register('username')}
                                className="appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="username" type="username" placeholder="Nhập tên của bạn"/>
                            {errors.username && <p className="text-red-700">{errors.username.message}</p>}

                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="phone">
                                Số điện thoại
                            </label>
                            <input
                                {...register('phone')}
                                className="appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="phone" type="phone" placeholder="Nhập số điện thoại của bạn"/>
                            {errors.phone && <p className="text-red-700">{errors.phone.message}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
                                Mật khẩu
                            </label>
                            <input
                                {...register('password')}
                                className="appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="password" type="password" placeholder="Nhập mật khẩu của bạn"/>
                            {errors.password && <p className="text-red-700">{errors.password.message}</p>}
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="confirmPassword">
                                Nhập lại mật khẩu
                            </label>
                            <input
                                {...register('confirmPassword')}
                                className="appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="confirmPassword" type="password" placeholder="Nhập mật khẩu của bạn"/>
                            {errors.confirmPassword && <p className="text-red-700">{errors.confirmPassword.message}</p>}
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="button submit"
                                disabled={isSubmitting}>
                                {isSubmitting ? 'Đang xử lý...' : 'Đăng ký'}
                            </button>
                            <button
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="button submit"
                                onClick={() => navigate('/login')}
                            >
                                Chuyển qua đăng nhập
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;