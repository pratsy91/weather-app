import axios from "../libs/axios";
import { API_KEY } from "../config";

const currentWeatherData = async (city) => {
  return axios.get("/current.json", {
    params: {
      key: API_KEY,
      q: city,
      aqi: "no",
    },
  });
};

export const getCurrentWeatherData = async (location, callback) => {
  try {
    const res = await currentWeatherData(location);
    const data = res?.data || {};
    callback(data, null);
  } catch (error) {
    callback(null, error);
  }
};
