import axios from "axios";

const BASE_URL = "http://192.168.0.196:9096"; 

export const signupApi = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/v1/customer/signup`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const resendOtpApi = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/v1/customer/createOTP`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const verifyOtpApi = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/v1/customer/verifyOTP`, {
      otp: data.otp, // The entered OTP
      email: data.email, // Add email to the payload
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
