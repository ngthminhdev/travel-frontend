import { Form, Input, Button } from "antd";
import { useFormik } from "formik";
import { forwardRef, useImperativeHandle } from "react";
import * as Yup from "yup";

const validationSchema = Yup.object({
  fullName: Yup.string().required("Vui lòng nhập họ tên"),
  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập email"),
  phone: Yup.string().required("Vui lòng nhập số điện thoại"),
  address: Yup.string().required("Vui lòng nhập địa chỉ"),
});

const BuyTourForm = forwardRef(({ onSubmit }, ref) => {
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  useImperativeHandle(ref, () => ({
    submit: () => {
      formik.handleSubmit();
    },
  }));

  return (
    <Form ref={ref} onFinish={formik.handleSubmit}>
      <Form.Item label="Họ và tên" required>
        <Input
          name="fullName"
          value={formik.values.fullName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.fullName && formik.errors.fullName ? (
          <div className="text-red-500">{formik.errors.fullName}</div>
        ) : null}
      </Form.Item>
      <Form.Item label="Email" required>
        <Input
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="text-red-500">{formik.errors.email}</div>
        ) : null}
      </Form.Item>
      <Form.Item label="Số điện thoại" required>
        <Input
          name="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.phone && formik.errors.phone ? (
          <div className="text-red-500">{formik.errors.phone}</div>
        ) : null}
      </Form.Item>
      <Form.Item label="Địa chỉ" required>
        <Input
          name="address"
          value={formik.values.address}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.address && formik.errors.address ? (
          <div className="text-red-500">{formik.errors.address}</div>
        ) : null}
      </Form.Item>
      {/* <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item> */}
    </Form>
  );
});
export default BuyTourForm;
