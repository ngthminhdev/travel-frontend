import React from 'react';
import {axiosAuth} from "../../app/utils/axios.util";
import {toast} from "react-toastify";
import {LocalStorageItem} from "../../app/enum";
import {setUserInfo} from "../../store/actions";
import {useStore} from "../../store/hooks";
import {LoginOutlined} from "@ant-design/icons";

const UserMenu = () => {
    const [state, dispatch]  = useStore();

    const handleLogOut = () => {
        axiosAuth({
            method: 'POST',
            url: '/auth/logout'
        }).then(res => {
            localStorage.removeItem(LocalStorageItem.AccessToken);
            localStorage.removeItem(LocalStorageItem.DeviceExpired);
            dispatch(setUserInfo(null));

            toast.success(res.data.message)
            setTimeout(() => window.location.reload(), 3000)
        }).catch((e) =>
            toast.error(e.response.data.message)
        )
    }

    return (
        <div className="
            user-menu min-w-[150px] p-3 bg-white shadow-lg
            rounded-lg border-gray-600 border-solid border-2
            mt-3 flex"
             onClick={handleLogOut}
        >
            <div>
                Đăng xuất <i><LoginOutlined className="scale-75"/></i>
            </div>
        </div>
    );
};

export default UserMenu;