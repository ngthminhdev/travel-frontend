import React, {useState} from 'react';
import {axiosAuth} from "../../app/utils/axios.util";
import {toast} from "react-toastify";
import {LocalStorageItem} from "../../app/enum";
import {setUserInfo} from "../../store/actions";
import {useStore} from "../../store/hooks";
import {LoginOutlined} from "@ant-design/icons";
import {Button} from "antd";

const UserMenu = () => {
    const [state, dispatch]  = useStore();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleLogOut = () => {
        setIsSubmitting(true);
        // console.log(JSON.parse(localStorage.getItem(LocalStorageItem.AccessToken)))
        axiosAuth({
            method: 'POST',
            url: '/auth/logout'
        }).then((res) => {
            localStorage.removeItem(LocalStorageItem.AccessToken);
            localStorage.removeItem(LocalStorageItem.DeviceExpired);
            dispatch(setUserInfo(null));

            toast.success(res.data.message)
            setTimeout(() => window.location.href = '/', 3000)
        }).catch((e) => {
                toast.error(e.response.data.message)
            }
        )
    }

    return (
        <div className="
            user-menu min-w-[150px] p-3 bg-white shadow-lg
            rounded-lg border-gray-600 border-solid border-2
            mt-3 flex"
        >
            <div>
                <Button onClick={handleLogOut}
                    disabled={isSubmitting}
                        type="text"
                >
                    {isSubmitting ? 'Đang xử lý...' : 'Đăng xuất'} <i><LoginOutlined className="scale-75"/></i>
                </Button>
            </div>
        </div>
    );
};

export default UserMenu;