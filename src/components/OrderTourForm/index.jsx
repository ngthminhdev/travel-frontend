import { Form, Input, Button } from "antd";
import { useFormik } from "formik";
import { forwardRef, useImperativeHandle } from "react";
import * as Yup from "yup";
import { useStore } from "../../store/hooks";
import { setOrderTourInfo } from "../../store/actions";

const validationSchema = Yup.object({
  touristName: Yup.string().required("Vui lòng nhập họ tên"),
  touristEmail: Yup.string()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập email"),
  touristPhone: Yup.string().required("Vui lòng nhập số điện thoại"),
  touristAddress: Yup.string().required("Vui lòng nhập địa chỉ"),
});

const OrderTourForm = forwardRef(({ onSubmit }, ref) => {
  const [state, dispatch] = useStore({});
  const formik = useFormik({
    initialValues: {
      touristName: "",
      touristEmail: "",
      touristPhone: "",
      touristAddress: "",
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(setOrderTourInfo(values));
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
          name="touristName"
          value={formik.values.touristName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.touristName && formik.errors.touristName ? (
          <div className="text-red-500">{formik.errors.touristName}</div>
        ) : null}
      </Form.Item>
      <Form.Item label="Email" required>
        <Input
          name="touristEmail"
          value={formik.values.touristEmail}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.touristEmail && formik.errors.touristEmail ? (
          <div className="text-red-500">{formik.errors.touristEmail}</div>
        ) : null}
      </Form.Item>
      <Form.Item label="Số điện thoại" required>
        <Input
          name="touristPhone"
          value={formik.values.touristPhone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.touristPhone && formik.errors.touristPhone ? (
          <div className="text-red-500">{formik.errors.touristPhone}</div>
        ) : null}
      </Form.Item>
      <Form.Item label="Địa chỉ" required>
        <Input
          name="touristAddress"
          value={formik.values.touristAddress}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.touristAddress && formik.errors.touristAddress ? (
          <div className="text-red-500">{formik.errors.touristAddress}</div>
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
export default OrderTourForm;
