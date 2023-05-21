import { Form, Rate, Input, Button, message } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { axiosAuth } from "../../app/utils/axios.util";
import { useState } from "react";

const validationSchema = Yup.object({
  rating: Yup.number().required("Vui lòng chọn đánh giá của bạn"),
  content: Yup.string().required("Vui lòng nhập nội dung phản hồi"),
});

const AddFeedBack = ({ tourId = "" }) => {
  const [isSubmit, setIsSubmit] = useState(false);

  const handleSubmit = async (data) => {
    await axiosAuth
      .post("/feedback/" + tourId, data)
      .then((res) => {
        setIsSubmit(true);
        message.success(res.data.message);
        formik.resetForm();
      })
      .catch((e) => {
        message.error(e.response.data.message);
        setIsSubmit(false);
      });
  };

  const formik = useFormik({
    initialValues: {
      rating: null,
      comment: "",
    },

    validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  return (
    <Form onFinish={formik.handleSubmit}>
      <Form.Item label="Đánh giá" required>
        <Rate
          name="rating"
          allowHalf
          value={formik.values.rating}
          onChange={(value) => formik.setFieldValue("rating", value)}
        />
        {formik.touched.rating && formik.errors.rating && (
          <div className="text-red-500">{formik.errors.rating}</div>
        )}
      </Form.Item>
      <Form.Item label="Phản hồi" required>
        <Input.TextArea
          name="content"
          value={formik.values.content}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.content && formik.errors.content && (
          <div className="text-red-500">{formik.errors.content}</div>
        )}
      </Form.Item>
      <Button type="primary" ghost htmlType="submit">
        {isSubmit ? "Đang xử lý..." : "Gửi"}
      </Button>
    </Form>
  );
};

export default AddFeedBack;
