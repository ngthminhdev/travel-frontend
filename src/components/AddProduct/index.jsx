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
import React, { useState } from "react";
import { axiosAuth } from "../../app/utils/axios.util";
import "./add-product.scss";
import { initialValues, validationSchema, placeholders } from "./validate-form";

const endPoint = process.env.REACT_APP_ENDPOINT;
const AddProduct = () => {
  const [imageUrl, setImageUrl] = useState("");

  const handleAddTour = async (data) => {
    try {
      const res = await axiosAuth.post("/travel/add-tour", data);
      message.success(res.data.data.message);
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
    initialValues,
    onSubmit: handleAddTour,
    validationSchema,
  });

  const handleImageUpload = async (file) => {
    // tạo một đối tượng FormData để gửi tệp ảnh đến máy chủ của bạn
    const formData = new FormData();
    formData.append("file", file);

    try {
      // gửi yêu cầu đến máy chủ để tải lên tệp ảnh
      const response = await axiosAuth.post("/upload", formData);
      // lưu URL của tệp ảnh vào state
      setImageUrl(`http://localhost:8081/${response.data.data}`);
    } catch (error) {
      // xử lý lỗi tải lên ảnh
      message.error("Tải lên ảnh thất bại.");
    }
  };

  const handleCheckbox = (event) => {
    const { name, checked } = event.target;
    setFieldValue(name, checked);
  };

  const handleNumberInput = (name) => (value) => setFieldValue(name, value);

  return (
    <div className="p-4">
      <Form onSubmitCapture={handleSubmit}>
        <Form.Item label="Tên Tour" name="tourName">
          <Input
            name="tourName"
            onChange={handleChange}
            placeholder={placeholders.tourName}
          />
          {errors.tourName && touched.tourName && (
            <div className="error text-red-700">{errors.tourName}</div>
          )}
        </Form.Item>
        <Form.Item label="Mô tả" name="description">
          <Input.TextArea
            name="description"
            onChange={handleChange}
            placeholder={placeholders.description}
          />
          {errors.description && touched.description && (
            <div className="error text-red-700">{errors.description}</div>
          )}
        </Form.Item>
        <Form.Item label="Nơi khởi hành" name="startPlace">
          <Input
            name="startPlace"
            onChange={handleChange}
            placeholder={placeholders.startPlace}
          />
          {errors.startPlace && touched.startPlace && (
            <div className="error text-red-700">{errors.startPlace}</div>
          )}
        </Form.Item>
        <Form.Item label="Thời gian khởi hành">
          <DatePicker
            name="startTime"
            className="w-[400px]"
            format="DD-MM-YYYY hh:mm:ss"
            placeholder={placeholders.startTime}
            showTime
            onChange={(value) => {
              setFieldValue(
                "startTime",
                moment(value).format("DD-MM-YYYY hh:mm:ss")
              );
            }}
          />
          {errors.startTime && touched.startTime && (
            <div className="error text-red-700">{errors.startTime}</div>
          )}
        </Form.Item>
        <Form.Item label="Giá" name="price">
          <InputNumber
            placeholder={placeholders.price}
            name="price"
            onChange={handleNumberInput("price")}
            className="min-w-fit"
          />
          {errors.price && touched.price && (
            <div className="error text-red-700">{errors.price}</div>
          )}
        </Form.Item>
        <Form.Item label="Khuyến mãi" name="discount">
          <InputNumber
            placeholder={placeholders.discount}
            name="discount"
            onChange={handleNumberInput("discount")}
            className="min-w-fit"
          />
          {errors.discount && touched.discount && (
            <div className="error text-red-700">{errors.discount}</div>
          )}
        </Form.Item>
        <Form.Item label="Số lượng slot" name="quantity">
          <InputNumber
            placeholder={placeholders.quantity}
            name="quantity"
            onChange={handleNumberInput("quantity")}
            className="min-w-fit"
          />
          {errors.quantity && touched.quantity && (
            <div className="error text-red-700">{errors.quantity}</div>
          )}
        </Form.Item>
        <Form.Item label="Dịch vụ đi kèm">
          <Checkbox
            name="isHotel"
            onChange={handleCheckbox}
            className="min-w-fit"
          >
            Khách sạn
          </Checkbox>
          <Checkbox
            name="isCar"
            onChange={handleCheckbox}
            className="min-w-fit"
          >
            Xe đưa rước
          </Checkbox>
          <Checkbox
            name="isAirplane"
            onChange={handleCheckbox}
            className="min-w-fit"
          >
            Vé Máy Bay
          </Checkbox>
        </Form.Item>
        <Form.Item label="Ảnh sản phẩm" name="image">
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
            Thêm tour
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default AddProduct;
