import axios from "axios";
import { REACT_APP_BACKEND_API_PROXY } from "./index";
import { getLocalStorageItem } from "../utils/localStorage";



export const API_SEVICES = {
  fetchWithParams: (
    EndPoint: string,
    sucessCallback: any,
    errorCallback: any,
    params: object
  ) => {
    const Token = getLocalStorageItem("Token");
    axios
      .get(`${REACT_APP_BACKEND_API_PROXY}${EndPoint}`, {
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        params: { ...params },
      })
      .then((resp) => {
        sucessCallback && sucessCallback(resp);
      })
      .catch((err) => {
        errorCallback && errorCallback(err);
      });
  },
  GetRequest: (
    EndPoint: string,
    // Token: string,
    sucessCallback: any,
    errorCallback: any
  ) => {
    // const Token = getLocalStorageItem('token')
    axios
      .get(`${EndPoint}`, {
        headers: {
          token: `${localStorage.getItem("Token")}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        // timeout: 5000,
      })
      .then((resp) => {
        sucessCallback && sucessCallback(resp);
      })
      .catch((err) => {
        errorCallback && errorCallback(err);
      });
  },
  PostRequest: (
    EndPoint: string,
    sucessCallback: any,
    errorCallback: any,
    values: any,
    contentType?: string,
    token?: any
  ) => {
    token = localStorage.getItem("Token");


    axios
      .post(EndPoint, values, {
        headers: {
          token: ` ${token}`,
          "Content-Type": contentType || "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((resp) => {
        sucessCallback && sucessCallback(resp);
      })
      .catch((err) => {
        errorCallback && errorCallback(err);
      });
  },

  PostRequestAsync: (
    EndPoint: string,
    payload: any,
    token?: any
    // contentType?: string
  ) => {
    return new Promise((resolve, reject) => {
      token = localStorage.getItem("token");
      axios
        .post(EndPoint, payload, {
          headers: {
            authorization: ` ${token}`,
            // "Content-Type": contentType || "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then((resp) => {
          resolve(resp.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  DeleteRequest: (
    EndPoint: string,
    // Token: string,
    sucessCallback: any,
    errorCallback: any,
    values: any
  ) => {
    const Token = getLocalStorageItem("token");
    axios
      .delete(`${EndPoint}`, {
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        data: { ...values },

        // timeout: 5000,
      })
      .then((resp) => {
        console.log("resp", resp);
        sucessCallback && sucessCallback(resp);
      })
      .catch((err) => {
        errorCallback && errorCallback(err);
      });
  },
  PutRequest: (
    EndPoint: string,
    // Token: string,
    sucessCallback: any,
    errorCallback: any,
    values: any
  ) => {
    const Token = localStorage.getItem("token");

    axios
      .put(`${EndPoint}`, values, {
        headers: {
          authorization: ` ${Token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((resp) => {
        sucessCallback && sucessCallback(resp);
      })
      .catch((err) => {
        // console.log("error",err);
        errorCallback && errorCallback(err);
      });
  },
  PutFormDataRequest: (
    EndPoint: string,
    // Token: string,
    sucessCallback: any,
    errorCallback: any,
    values: any
  ) => {
    const Token = getLocalStorageItem("token");
    axios
      .put(`${REACT_APP_BACKEND_API_PROXY}${EndPoint}`, values, {
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
        },
        // data: { ...values },
        // timeout: 5000,
      })
      .then((resp) => {
        sucessCallback && sucessCallback(resp);
      })
      .catch((err) => {
        errorCallback && errorCallback(err);
      });
  },
  PutObjRequest: (
    EndPoint: string,
    // Token: string,
    sucessCallback: any,
    errorCallback: any,
    values: any
  ) => {
    const Token = getLocalStorageItem("token");
    axios
      .put(`${REACT_APP_BACKEND_API_PROXY}${EndPoint}`, values, {
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        // data: { ...values },
        // timeout: 5000,
      })
      .then((resp) => {
        sucessCallback && sucessCallback(resp);
      })
      .catch((err) => {
        errorCallback && errorCallback(err);
      });
  },
  PatchRequest: (
    EndPoint: string,
    sucessCallback: any,
    errorCallback: any,
    values: object
  ) => {
    const Token = getLocalStorageItem("token");
    axios
      .patch(`${REACT_APP_BACKEND_API_PROXY}${EndPoint}`, values, {
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        // data: { ...values },
        // timeout: 5000,
      })
      .then((resp) => {
        sucessCallback && sucessCallback(resp);
      })
      .catch((err) => {
        errorCallback && errorCallback(err);
      });
  },
  PatchFormDataRequest: (
    EndPoint: string,
    sucessCallback: any,
    errorCallback: any,
    values: object
  ) => {
    const Token = getLocalStorageItem("token");
    axios
      .patch(`${REACT_APP_BACKEND_API_PROXY}${EndPoint}`, values, {
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
        },
        // data: { ...values },
        // timeout: 5000,
      })
      .then((resp) => {
        sucessCallback && sucessCallback(resp);
      })
      .catch((err) => {
        errorCallback && errorCallback(err);
      });
  },
  login: (sucessCallback: any, errorCallback: any, values: any) => {
    axios
      .post(`${REACT_APP_BACKEND_API_PROXY}/api/users/login`, values, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        timeout: 5000,
      })
      .then((resp) => {
        sucessCallback && sucessCallback(resp);
      })
      .catch((err) => {
        errorCallback && errorCallback(err);
      });
  },
};
