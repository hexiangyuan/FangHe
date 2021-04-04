import { ApiResponse, ApisauceInstance, create } from "apisauce";
import { GeneralApiProblem, getGeneralApiProblem, resolveApiCode } from "./api-problem";
import { ApiConfig, DEFAULT_API_CONFIG } from "./api-config";

/**
 * Manages all requests to the API.
 */
export class Api {
  /**
   * The underlying apisauce instance which performs the requests.
   */
  apisauce: ApisauceInstance;

  /**
   * Configurable options.
   */
  config: ApiConfig;

  /**
   * Creates the api.
   *
   * @param config The configuration to use.
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config;
  }

  /**
   * Sets up the API.  This will be called during the bootup
   * sequence and will happen before the first React component
   * is mounted.
   *
   * Be as quick as possible in here.
   */
  setup() {
    // construct the apisauce instance
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json"
      }
    });
  }

  async get(path: string, params?: {}): Promise<{ code: number; data: any; errorMsg: string } | GeneralApiProblem> {
    const response: ApiResponse<string, string> = await this.apisauce.get(path, params);
    console.log("=========================");
    console.log("request  path====", "get  ", path);
    console.log("request  data==== ", JSON.stringify(params));
    if (!response.ok) {
      console.log("request  error====", response, response.status);
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    try {
      const raw = response.data;
      if (raw.code !== 200) {
        resolveApiCode(raw);
      }
      console.log("response data==== ", JSON.stringify(raw));
      console.log("=========================");
      return raw;
    } catch (e) {
      console.log(e.message);
    }
    return "";
  }

  async post(path: string, data?: any): Promise<{ code: string; data?: any; errorMsg?: String } | GeneralApiProblem> {
    const response: ApiResponse<string, string> = await this.apisauce.post(path, data);
    console.log("=========================");
    console.log("request  path====", "post  ", path);
    console.log("request  data==== ", JSON.stringify(data));
    if (!response.ok) {
      console.log("request  error====", JSON.stringify(response), response.status);
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    try {
      const raw = response.data;
      if (raw.code !== 200) {
        resolveApiCode(raw);
      }

      console.log("response data==== ", JSON.stringify(raw));
      console.log("=========================");
      return raw;
    } catch (e) {
      console.log(e.message);
    }
    return "";
  }

  async test(data?: string): Promise<{ code: string; data?: any; errorMsg?: String } | GeneralApiProblem> {
    console.log("response data==== ", JSON.parse(data));
    return JSON.parse(data);
  }
}

export const FangHeApi = new Api();

export function setFangHeApiCookie(cookie: string) {
  cookie = cookie.replace(/"/g, "");
  console.log(cookie);
  FangHeApi.apisauce.setHeader("token", cookie);
  console.log(FangHeApi.apisauce.headers);
}

const GaoDeMapApiConfig: ApiConfig = {
  url: "https://restapi.amap.com/",
  timeout: 10000
};

export const GaoDeMapApi = new Api(GaoDeMapApiConfig);
