import React, { useEffect, useState } from "react";
import { Button, Modal, Table, message } from "antd";
import { axiosAuth } from "../../app/utils/axios.util";
import AddProduct from "../AddProduct";
import Loading from "../Loading";

function ListTour() {
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
        .get("/travel/get-all-tour")
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
      title: "Tên sản phẩm",
      dataIndex: "tourName",
      key: "tourName",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      ellipsis: true, // thu gọn mô tả
      width: 150, // giới hạn chiều rộng của cột
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (value) =>
        new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(value),
    },
    {
      title: "Slot",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
    },
    {
      title: "Start Place",
      dataIndex: "startPlace",
      key: "startPlace",
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img src={image} alt="Product Image" style={{ width: "130px" }} />
      ),
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
            onClick={() => handleEdit(record.id)}
          >
            Sửa
          </Button>
          <Button type="primary" danger onClick={() => handleDelete(record.id)}>
            Xoá
          </Button>
        </>
      ),
    },
  ];

  const handleEdit = async (id) => {
    try {
      const res = await axiosAuth.get(`/travel/get-tour/${id}`);
      setTourData(res.data.data);
      setIsOpen(true);
    } catch (e) {
      message.error(e.response.data.message);
      setIsOpen(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axiosAuth.delete(`/travel/remove/${id}`);
      message.success(res.data.message);
      console.log("🚀 ~ file: index.jsx:115 ~ handleDelete ~ res:", res);
      setData([...data].filter((item) => item.id !== id));
    } catch (e) {
      message.error(e.response.data.message);
    }
  };

  const handleOk = () => {
    console.log("ok");
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
      <Modal
        title="Chỉnh sửa Tour"
        open={isOpen}
        onOk={handleOk}
        onCancel={handleCancle}
      >
        <AddProduct tourData={tourData} />
      </Modal>
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

export default ListTour;
