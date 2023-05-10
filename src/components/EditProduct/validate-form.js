import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  tourName: Yup.string().required("Vui lòng nhập tên tour"),
  description: Yup.string().required("Vui lòng nhập mô tả tour"),
  address: Yup.string().required("Vui lòng nhập địa chỉ"),
  image: Yup.string().required("Vui lòng nhập đường dẫn hình ảnh"),
  startPlace: Yup.string().required("Vui lòng nhập điểm xuất phát"),
  startTime: Yup.string().required("Vui lòng nhập thời gian xuất phát"),
  price: Yup.number().required("Vui lòng nhập giá").min(0, "Giá không hợp lệ"),
  discount: Yup.number().min(0, "Giảm giá không hợp lệ"),
  quantity: Yup.number()
    .required("Vui lòng nhập số lượng")
    .min(1, "Số lượng không hợp lệ"),
});

export const placeholders = {
  tourName: "Nhập tên tour",
  description: "Nhập mô tả",
  address: "Nhập địa chỉ",
  image: "Nhập đường dẫn ảnh",
  startPlace: "Nhập điểm khởi hành",
  startTime: "Nhập thời gian khởi hành",
  price: "Nhập giá tour (VND)",
  discount: "Nhập giảm giá (%)",
  quantity: "Nhập số lượng",
};
