import moment from "moment";
import { LocalStorageItem } from "../enum";

export class Utils {
  static generateMAC() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = Math.floor(Math.random() * 256);
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  static isAdmin() {
    return !!JSON.parse(localStorage.getItem(LocalStorageItem.IsAdmin));
  }

  static toDateTime(value) {
    if (!value) {
      return "";
    }
    return moment(value).utcOffset(420).format("YYYY/MM/DD HH:mm:ss");
  }

  static formatPrice(value) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  }
}
