import Axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import * as http from "http";
import * as https from "https";
import config from "../config";

export enum AxiosMethods {
  POST = "POST",
  GET = "GET",
  PUT = "PUT",
}

class AxiosHelper<T> {
  private axios: AxiosInstance;

  constructor() {
    this.axios = Axios.create({
      baseURL: config.explorerURL,
      timeout: 15000,
      httpAgent: new http.Agent({ keepAlive: true }),
      httpsAgent: new https.Agent({ keepAlive: true }),
      maxRedirects: 10,
      maxContentLength: 50 * 1000 * 1000,
    });
  }

  async call(method: AxiosMethods,url: string, paramsObj?: any) : Promise<T[]> {    
    
    let data = {};
    if(method === AxiosMethods.GET){
      if (paramsObj) {
        url = url + "?" + new URLSearchParams(paramsObj).toString();
      }
    }else{
      data = paramsObj;
    }
    
    const axiosReq: AxiosRequestConfig = {
      method,
      url,
      data
    };

    const response = await this.axios(axiosReq);
    return response.data as T[];
  }
}

export default AxiosHelper;
