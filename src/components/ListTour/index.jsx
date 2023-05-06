import React, { useEffect, useState } from "react";
import Loading from "../Loading";
import { axiosAuth } from "../../app/utils/axios.util";
import { Button, Table, message } from "antd";

const resourcesEndpoint = process.env.REACT_APP_RESOURCE;

function ListTour() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetch = () => {
      axiosAuth
        .get("/travel/get-all-tour")
        .then((res) => setData(res.data.data))
        .catch((e) => message.error(e.response.data.message));
    };

    fetch();
    console.log(data);
  }, []);

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

  const handleEdit = (id) => console.log(id);
  const handleDelete = (id) => console.log(id);

  if (!data) return <Loading />;

  return (
    <div className="h-screen">
      <Table columns={columns} dataSource={data} />;
    </div>
  );
}

export default ListTour;
