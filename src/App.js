import "./App.css";
import { routes } from "./app/routes";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import React, { useEffect, useState } from "react";
import { LocalStorageItem } from "./app/enum";
import { Utils } from "./app/utils";
import { useStore } from "./store/hooks";
import { axiosAuth } from "./app/utils/axios.util";
import { setUserInfo } from "./store/actions";
import { toast, ToastContainer } from "react-toastify";
import { Modal } from "antd";
import RouteManager from "./components/HOCs/RouteManager";

function App() {
  const [state, dispatch] = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOk = () => {
    setIsModalOpen(false);
    localStorage.removeItem(LocalStorageItem.AccessToken);
    localStorage.removeItem(LocalStorageItem.DeviceExpired);
    dispatch(setUserInfo(null));
    window.location.href = "/login";
  };

  useEffect(() => {
    const deviceId = JSON.parse(
      localStorage.getItem(LocalStorageItem.DeviceId)
    );
    const accessToken = JSON.parse(
      localStorage.getItem(LocalStorageItem.AccessToken)
    );
    const deviceExpired = JSON.parse(
      localStorage.getItem(LocalStorageItem.DeviceExpired)
    );
    if (!deviceId) {
      localStorage.setItem(
        LocalStorageItem.DeviceId,
        JSON.stringify(Utils.generateMAC())
      );
    }

    if (deviceExpired && new Date(deviceExpired) < new Date().getTime()) {
      setIsModalOpen(true);
    }

    if (!state?.userInfo && accessToken) {
      axiosAuth({
        method: "GET",
        url: "/user/info",
      })
        .then((res) => {
          dispatch(setUserInfo(res.data.data));
        })
        .catch((e) => console.log(e));
    }
  }, [state, isModalOpen]);

  return (
    <BrowserRouter>
      <ToastContainer />
      <Modal
        title="travel.dangkimlien.online"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleOk}
      >
        <p className="text-red-700">
          Phiên đăng nhập hết hạn, vui đăng nhập lại
        </p>
      </Modal>
      <Header />
      <Routes>
        {routes.map(({ path, Component, isProtected }, index) => {
          return (
            <Route
              key={index}
              path={path}
              element={
                <RouteManager
                  Component={Component}
                  isProtected={isProtected}
                ></RouteManager>
              }
            >
            </Route>
          );
        })}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
