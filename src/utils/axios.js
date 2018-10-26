import axios from "axios";
const baseUrl = "/api";
import { Notification } from "element-ui";
import router from "../router";
const instance = axios.create({
  baseURL: baseUrl,
  timeout: 15000
});

class fetch {
  static get(url, data, config) {
    return new Promise((resolve, reject) => {
      instance
        .get(url, { params: data }, config)
        .then(res => {
          if (res.data.code == 403) {
            Notification.error({
              title: "错误",
              message: res.data.msg
            });
            router.push("/");
          }
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
  static axios(url, data, config, methods) {
    return new Promise((resolve, reject) => {
      instance[methods](url, data, config)
        .then(res => {
          if (res.data.code == 403) {
            this.$notify({
              title: "警告",
              message: "登录失效，请重新登录",
              type: "warning"
            });
          }
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
  static post(url, data, config) {
    return this.axios(url, data, config, "post");
  }
  static delete(url, data, config) {
    return this.axios(url, data, config, "delete");
  }
  static put(url, data, config) {
    return this.axios(url, data, config, "put");
  }
}
export default fetch;
