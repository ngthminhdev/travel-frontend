import React, { useEffect, useState } from "react";
import { axiosAuth } from "../../app/utils/axios.util";
import { Button, Table, message } from "antd";
import Loading from "../Loading";

function LisOrderTour() {
  const [data, setData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [tourData, setTourData] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
  });

  useEffect(() => {
    const fetch = () => {
      axiosAuth
        .get("/admin/get-all-tour?status=-1")
        .then((res) => setData(res.data.data))
        .catch((e) => message.error(e.response.data.message));
    };

    fetch();
  }, []);

  const handleCancle = () => {
    setIsOpen(false);
    setTourData(null);
  };

  const columns = [
    {
      title: "Tên tour",
      dataIndex: "tour",
      key: "tourName",
      render: (data) => data.tourName,
    },
    {
      title: "Người đặt",
      dataIndex: "user",
      key: "username",
      render: (data) => data.username,
    },
    {
      title: "Số điện thoại",
      dataIndex: "user",
      key: "phone",
      render: (data) => data.phone,
    },
    {
      title: "Thanh toán",
      dataIndex: "totalPayment",
      key: "totalPayment",
      render: (value) =>
        new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(value),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (value) => {
        switch (value) {
          case 0:
            return "Đã order";
          case 1:
            return "Đã thanh toán";
          case 2:
            return "Đã xác nhận";
          case 3:
            return "Đã hoàn thành";
          default:
            return "Đã huỷ";
        }
      },
    },
    {
      title: "Hành động",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <>
          <Button
            type="primary"
            className="mr-2"
            onClick={() => handleConfirm(record.id, 2)}
          >
            Xác nhận
          </Button>
          <Button
            type="primary"
            success
            className="mr-2 bg-green-500 hover:!bg-green-400"
            onClick={() => handleConfirm(record.id, 3)}
          >
            Hoàn thành
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => handleConfirm(record.id, 4)}
          >
            Huỷ
          </Button>
        </>
      ),
    },
  ];

  const handleConfirm = async (id, status) => {
    try {
      const data = {
        status,
      };
      const res = await axiosAuth.post(`/admin/change-tour-status/${id}`, data);
      message.success(res.data.message);
      setTourData(res.data.data);
      setIsOpen(true);
    } catch (e) {
      message.error(e.response.data.message);
      setIsOpen(false);
    }
  };

  const handlePageChange = (page, pageSize) => {
    setPagination({
      current: page,
      pageSize: pageSize,
    });
  };

  if (!data) return <Loading />;

  return (
    <div className="h-screen">
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: data.length,
          onChange: handlePageChange,
        }}
      />
    </div>
  );
}

export default LisOrderTour;
