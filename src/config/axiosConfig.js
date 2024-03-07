import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL;

// Create axios instance
const axiosClient = axios.create({
  baseURL,
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  (config) => {
    // Get the token from localStorage
    const token = localStorage.getItem('token');
    // If token exists, add it to the request headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response && error.response.status === 401) {
      // Token expired or unauthorized, remove token and redirect to login
      localStorage.removeItem('token'); // Remove the token from localStorage or wherever you store it
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Get Request
export async function getRequest(URL) {
  try {
    const response = await axiosClient.get(URL);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Post Request
export async function postRequest(URL, payload) {
  try {
    const response = await axiosClient.post(URL, payload);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Post Request using FormData
export async function postRequestFormData(URL, payload) {
  try {
    const formData = new FormData();
    for (const key in payload) {
      if (payload[key] instanceof Array) {
        payload[key].forEach((file) => {
          formData.append(key, file);
        });
      } else formData.append(key, payload[key]);
    }
    const response = await axiosClient.post(URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Patch Request
export async function patchRequest(URL, payload) {
  try {
    const response = await axiosClient.patch(URL, payload);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Delete Request
export async function deleteRequest(URL) {
  try {
    const response = await axiosClient.delete(URL);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default axiosClient;
