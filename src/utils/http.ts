import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_PREFIX } from '../../config/constant';
import { ResData, Su2ResData } from '../api/global';
import { getToken } from './auth';
import { useUserStoreWithOut } from '../store/modules/user';
import { useMessage } from '../hooks/useMessage';
// import { WhiteList } from './permission';
// import { usePermissioStoreWithOut } from '/@/store/modules/permission';

const { createMessage } = useMessage();
// baseURL
const isDev = import.meta.env.MODE === 'development';
const BASE_URL = import.meta.env.VITE_API_BASE_URL || (isDev ? API_PREFIX : '');

const sensitiveKeys = ['authorization', 'passwd', 'password', 'old_sip_password', 'old_dinlink_passwd', 'dinlink_passwd'];

type RequestConfig = AxiosRequestConfig & {
  skipErrorHandler?: boolean;
};

type ApiError = Error & {
  response?: AxiosResponse;
  data?: unknown;
  config?: RequestConfig;
};

function maskSensitiveData(data: any): any {
  if (!data || typeof data !== 'object') return data;
  if (Array.isArray(data)) return data.map(maskSensitiveData);

  return Object.keys(data).reduce((ret, key) => {
    const value = data[key];
    ret[key] = sensitiveKeys.includes(key.toLowerCase()) ? '***' : maskSensitiveData(value);
    return ret;
  }, {} as Record<string, any>);
}

function getDataShape(data: any): any {
  if (Array.isArray(data)) {
    return data.length > 0 ? [getDataShape(data[0])] : [];
  }
  if (!data || typeof data !== 'object') {
    return typeof data;
  }

  return Object.keys(data).reduce((ret, key) => {
    ret[key] = getDataShape(data[key]);
    return ret;
  }, {} as Record<string, any>);
}

function logRequest(config: RequestConfig) {
  if (!isDev) return;

  console.groupCollapsed(`[SU2 API Request] ${String(config.method || 'GET').toUpperCase()} ${config.url}`);
  console.log('baseURL:', config.baseURL || BASE_URL);
  console.log('params:', maskSensitiveData(config.params));
  console.log('data:', maskSensitiveData(config.data));
  console.groupEnd();
}

function logResponse(response: AxiosResponse) {
  if (!isDev) return;

  console.groupCollapsed(
    `[SU2 API Response] ${String(response.config.method || 'GET').toUpperCase()} ${response.config.url}`,
  );
  console.log('raw:', maskSensitiveData(response.data));
  console.log('shape:', getDataShape(response.data));
  console.groupEnd();
}

function createApiError(message: string, response?: AxiosResponse): ApiError {
  const error = new Error(message) as ApiError;
  error.response = response;
  error.data = response?.data;
  error.config = response?.config as RequestConfig | undefined;
  return error;
}

function getErrorMessage(data: any, fallback = '请求失败，请重试') {
  return data?.message || data?.msg || data?.err || data?.cause || fallback;
}

function showError(message: string, config?: RequestConfig) {
  if (!config?.skipErrorHandler) {
    createMessage.error(String(message));
  }
}

function handleLogout() {
  useUserStoreWithOut().logout();
}

const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  timeout: 10000,
});

instance.interceptors.request.use(
  (config) => {
    // 接口权限拦截
    // const store = usePermissioStoreWithOut();
    // const { url = '' } = config;
    // if (!WhiteList.includes(url) && store.getIsAdmin === 0) {
    //   if (!store.getAuths.includes(url)) {
    //     console.log('url', url, store.getIsAdmin);
    //     return Promise.reject('没有操作权限');
    //   }
    // }

    // 请求头 token配置
    const token = getToken();

    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: token,
      };
      // config.headers['Authorization'] = token;
    }
    logRequest(config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => {
    logResponse(response);
    const config = response.config as RequestConfig;
    const res = response.data as ResData<any> & Su2ResData<any>;
    const responseCode = (res as any).code;
    const success = (res as any).success;

    // 模板默认接口格式
    if ('code' in res && responseCode === 0) {
      return Object.prototype.hasOwnProperty.call(res, 'result') ? res.result : true;
    }

    // 登录失效
    if ('code' in res && responseCode === -1) {
      showError(res.message || '登录已过期，请重新登录', config);
      handleLogout();
      return Promise.reject(createApiError(res.message || '登录已过期，请重新登录', response));
    }

    // 兼容部分后端的字符串 code 登录失效格式
    if ('code' in res && (responseCode === '10001' || responseCode === '10002')) {
      const message = getErrorMessage(res, '登录已过期，请重新登录');
      showError(message, config);
      handleLogout();
      return Promise.reject(createApiError(String(message), response));
    }

    // SU2 接口文档格式：{ status: true, data: ... }
    if ('status' in res && res.status === true) {
      return Object.prototype.hasOwnProperty.call(res, 'data') ? res.data : true;
    }

    // SU2 异常格式：{ status: 500, err: ..., cause: ... }
    if ('status' in res && res.status !== true) {
      const message = getErrorMessage(res, '请求失败，请重试');
      showError(message, config);
      return Promise.reject(createApiError(String(message), response));
    }

    if ('success' in res && success === false && responseCode !== '4000007') {
      const message = getErrorMessage(res, '请求失败，请重试');
      showError(message, config);
      return Promise.reject(createApiError(String(message), response));
    }

    // 异常
    const message = getErrorMessage(res, '请求失败，请重试');
    showError(message, config);
    return Promise.reject(createApiError(String(message), response));
  },
  (error) => {
    // 没权限时，不再重复提示
    if (error === '没有操作权限') {
      return Promise.reject(error);
    }

    if (error.response) {
      const { status, data } = error.response;
      const config = (error.config || error.response.config) as RequestConfig;

      if (status === 401) {
        const message = getErrorMessage(data, '登录已过期，请重新登录');
        showError(message, config);
        handleLogout();
        return Promise.reject(createApiError(String(message), error.response));
      }

      if (status === 403) {
        const message = getErrorMessage(data, '没有权限访问该资源');
        showError(message, config);
        return Promise.reject(createApiError(String(message), error.response));
      }

      const message = getErrorMessage(data, `请求失败: ${status}`);
      showError(message, config);
      return Promise.reject(createApiError(String(message), error.response));
    }

    if (error.request) {
      const message = '网络错误，请检查网络连接';
      showError(message, error.config);
      return Promise.reject(new Error(message));
    }

    return Promise.reject(error);
  },
);

const request = <T = any>(
  config: RequestConfig | string,
  options?: RequestConfig,
): Promise<T> => {
  if (typeof config === 'string') {
    if (!options) {
      return instance.request<T, T>({
        url: config,
      });
      // throw new Error('请配置正确的请求参数');
    } else {
      return instance.request<T, T>({
        url: config,
        ...options,
      });
    }
  } else {
    return instance.request<T, T>(config);
  }
};
export function get<T = any>(
  config: RequestConfig | string,
  params?: any,
  options?: RequestConfig,
): Promise<T> {
  if (typeof config === 'string') {
    return request({ url: config, params, method: 'GET', ...options });
  }
  return request({ ...config, method: 'GET' }, params);
}

export function post<T = any>(
  config: RequestConfig | string,
  data?: any,
  options?: RequestConfig,
): Promise<T> {
  if (typeof config === 'string') {
    return request({ url: config, data, method: 'POST', ...options });
  }
  return request({ ...config, method: 'POST' }, data);
}

export function put<T = any>(
  config: RequestConfig | string,
  data?: any,
  options?: RequestConfig,
): Promise<T> {
  if (typeof config === 'string') {
    return request({ url: config, data, method: 'PUT', ...options });
  }
  return request({ ...config, method: 'PUT' }, data);
}

export function del<T = any>(
  config: RequestConfig | string,
  data?: any,
  options?: RequestConfig,
): Promise<T> {
  if (typeof config === 'string') {
    return request({ url: config, data, method: 'DELETE', ...options });
  }
  return request({ ...config, method: 'DELETE' }, data);
}

export default request;
export type { AxiosInstance, AxiosResponse, RequestConfig };
