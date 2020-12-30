import { ApisauceInstance, create, ApiResponse } from "apisauce";
import { GeneralApiProblem, getGeneralApiProblem } from "./api-problem";
import { ApiConfig, DEFAULT_API_CONFIG } from "./api-config";
import * as Types from "./api.types";

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

  async get(path: string, params?: {}): Promise<string | GeneralApiProblem> {
    const response: ApiResponse<string, string> = await this.apisauce.get(path, params);
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    try {
      const raw = response.data;
      console.log("=========================");
      console.log("request  path====", path);
      console.log("request  data==== ", JSON.stringify(params));
      console.log("response data==== ", JSON.stringify(raw));
      console.log("=========================");
      return raw;
    } catch (e) {
      console.log(e);
    }
    return "";
  }

  async post(path: string, data?: any): Promise<string | GeneralApiProblem> {
    const response: ApiResponse<string, string> = await this.apisauce.post(path, data);
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    try {
      const raw = response.data;
      console.log("=========================");
      console.log("request  path====", path);
      console.log("request  data==== ", JSON.stringify(data));
      console.log("response data==== ", JSON.stringify(raw));
      console.log("=========================");
      return raw;
    } catch (e) {
      console.log(e);
    }
    return "";
  }

  /**
   * Gets a list of users.
   */
  async getUsers(): Promise<Types.GetUsersResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(`/users`);

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }

    const convertUser = raw => {
      return {
        id: raw.id,
        name: raw.name
      };
    };

    // transform the data into the format we are expecting
    try {
      const rawUsers = response.data;
      const resultUsers: Types.User[] = rawUsers.map(convertUser);
      return {
        kind: "ok",
        users: resultUsers
      };
    } catch {
      return { kind: "bad-data" };
    }
  }

  /**
   * Gets a single user by ID
   */

  async getUser(id: string): Promise<Types.GetUserResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(`/users/${id}`);

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }

    // transform the data into the format we are expecting
    try {
      const resultUser: Types.User = {
        id: response.data.id,
        name: response.data.name
      };
      return {
        kind: "ok",
        user: resultUser
      };
    } catch {
      return { kind: "bad-data" };
    }
  }
}

export const FangHeApi = new Api();

const GaoDeMapApiConfig: ApiConfig = {
  url: "https://restapi.amap.com/",
  timeout: 10000
};

export const GaoDeMapApi = new Api(GaoDeMapApiConfig);
