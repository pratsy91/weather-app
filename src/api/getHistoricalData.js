import axios from "../libs/axios";
import { API_KEY } from "../config";

const historicalData = async (city, date) => {
  return axios.get("/history.json", {
    params: {
      key: API_KEY,
      q: city,
      dt: date,
    },
  });
};

export const getHistoricalData = async (count, city) => {
  try {
    let currentDate = new Date();
    const data = [];
    for (let i = 0; i < count; i++) {
      currentDate.setDate(currentDate.getDate() - 1);
      let previousDateFormatted = currentDate.toISOString().slice(0, 10);
      const res = await historicalData(city, previousDateFormatted);
      const weather = res.data.forecast.forecastday[0];
      data.push({
        date: weather.date,
        info: {
          temp: weather.day.avgtemp_c,
          humidity: weather.day.avghumidity,
        },
      });
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};
