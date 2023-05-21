import React, { useEffect, useState } from "react";
import { Button, Modal, Table, message } from "antd";
import { axiosAuth } from "../../app/utils/axios.util";
import AddProduct from "../AddProduct";
import Loading from "../Loading";

function UserManagement() {
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
        .get("/admin/get-all-user")
        .then((res) => setData(res.data.data))
        .catch((e) => message.error(e.response.data.message));
    };

    fetch();
    console.log(data);
  }, []);

  const handleCancle = () => {
    setIsOpen(false);
    setTourData(null);
  };

  const columns = [
    {
      title: "Tên người dùng",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      ellipsis: true, // thu gọn mô tả
      width: 150, // giới hạn chiều rộng của cột
    },
    {
      title: "Ngày sinh",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
    },
    {
      title: "Tình trạng",
      dataIndex: "isVerified",
      key: "isVerified",
      render: (value) => (value === 0 ? "Chưa xác minh" : "Đã xác minh"),
    },
    {
      title: "Phân quyền",
      dataIndex: "role",
      key: "role",
      render: (value) => (value === 0 ? "User" : "Admin"),
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (image) => (
        <img src={image} alt="User avatar" style={{ width: "130px" }} />
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

export default UserManagement;
