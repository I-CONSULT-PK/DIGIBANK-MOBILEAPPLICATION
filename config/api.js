import axios from 'axios';
import { useContext } from 'react';
import { AppLoaderContext } from './LoaderHOC'; // Adjust the path as needed
import API_BASE_URL from './index'; // Adjust the path as needed

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Create a custom hook to get the loader context
const useLoaderContext = () => {
  return useContext(AppLoaderContext);
};

// Axios interceptors to show/hide the loader
api.interceptors.request.use(
  config => {
    const { showLoader } = useLoaderContext();
    showLoader();
    return config;
  },
  error => {
    const { hideLoader } = useLoaderContext();
    hideLoader();
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  response => {
    const { hideLoader } = useLoaderContext();
    hideLoader();
    return response;
  },
  error => {
    const { hideLoader } = useLoaderContext();
    hideLoader();
    return Promise.reject(error);
  }
);

export default api;
