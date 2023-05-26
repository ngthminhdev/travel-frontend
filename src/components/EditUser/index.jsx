import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Upload,
  message,
} from "antd";
import { useFormik } from "formik";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { axiosAuth } from "../../app/utils/axios.util";
import "./add-product.scss";
import { placeholders, validationSchema } from "./validate-form";

const endPoint = process.env.REACT_APP_ENDPOINT;
const EditUser = ({ user }) => {
  const initialValues = {
    userId: user?.userId || "",
    email: user?.email || "",
    username: user?.username || "",
    phone: user?.phone || 0,
    dateOfBirth: user?.dateOfBirth || "",
  };

  const [imageUrl, setImageUrl] = useState(user?.avatar);

  const handleEditUser = async (data) => {
    try {
      const res = await axiosAuth.post(`/admin/update/${user.userId}`, {
        username: data.username,
        email: data.email,
        phone: data.phone,
        date_of_birth: data.dateOfBirth,
        avatar: imageUrl,
      });
      message.success(res.data.message);
      resetForm();
    } catch (error) {
      message.error(error.response.data.message);
    }
  };

  const {
    handleSubmit,
    handleChange,
    setFieldValue,
    errors,
    touched,
    resetForm,
  } = useFormik({
    initialValues: user,
    onSubmit: (data) => {
      handleEditUser(data);
    },
  });

  const handleImageUpload = async (file) => {
    // tạo một đối tượng FormData để gửi tệp ảnh đến máy chủ của bạn
    const formData = new FormData();
    formData.append("file", file);

    try {
      // gửi yêu cầu đến máy chủ để tải lên tệp ảnh
      const response = await axiosAuth.post("/upload", formData);
      // lưu URL của tệp ảnh vào state
      setImageUrl(response.data.data);
    } catch (error) {
      // xử lý lỗi tải lên ảnh
      message.error("Tải lên ảnh thất bại.");
    }
  };

  useEffect(() => {
    return () => {
      resetForm();
    };
  }, []);

  return (
    <div className="p-4">
      <Form onFinish={handleSubmit}>
        <Form.Item label="UserId" name="userId">
          <Input
            name="userId"
            defaultValue={initialValues?.userId}
            onChange={handleChange}
            placeholder={placeholders.userId}
          />
          {errors.userId && touched.userId && (
            <div className="error text-red-700">{errors.userId}</div>
          )}
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input
            name="email"
            defaultValue={initialValues?.email}
            onChange={handleChange}
            placeholder={placeholders.email}
          />
          {errors.email && touched.email && (
            <div className="error text-red-700">{errors.email}</div>
          )}
        </Form.Item>
        <Form.Item label="Tên người dùng" name="username">
          <Input
            name="username"
            defaultValue={initialValues.username}
            onChange={handleChange}
            placeholder={placeholders.username}
          />
          {errors.username && touched.username && (
            <div className="error text-red-700">{errors.username}</div>
          )}
        </Form.Item>
        <Form.Item label="Số điện thoại" name="phone">
          <Input
            name="phone"
            defaultValue={initialValues.phone}
            onChange={handleChange}
            placeholder={placeholders.phone}
          />
          {errors.phone && touched.phone && (
            <div className="error text-red-700">{errors.phone}</div>
          )}
        </Form.Item>
        <Form.Item label="Ngày sinh">
          <DatePicker
            name="dateOfBirth"
            // defaultValue={initialValues.dateOfBirth}
            // className="w-[400px]"
            format="DD-MM-YYYY"
            placeholder="Ngày sinh"
            defaultValue={moment(initialValues.dateOfBirth)}
            onChange={(value) => {
              setFieldValue("dateOfBirth", moment(value).format("DD-MM-YYYY"));
            }}
          />
          {errors.dateOfBirth && touched.dateOfBirth && (
            <div className="error text-red-700">{errors.dateOfBirth}</div>
          )}
        </Form.Item>
        <Form.Item label="avatar" name="image">
          <Upload
            name="image"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={(file) => {
              // giới hạn kích thước của tệp ảnh dưới 1MB
              const isLt1M = file.size / 1024 / 1024 < 1;
              if (!isLt1M) {
                message.error("Ảnh phải có kích thước dưới 1MB!");
                return false;
              }
              handleImageUpload(file);
              return false;
            }}
          >
            {imageUrl ? (
              <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
            ) : (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Tải lên</div>
              </div>
            )}
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Hoàn tất
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default EditUser;
