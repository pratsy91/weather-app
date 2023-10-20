//Initialization of files
import React, { useState, useEffect } from "react";
import { formatDate } from "../../utils/formatDate";
import { formatTime } from "../../utils/formatTime";
import "./Dashboard.css";
import { getCurrentWeatherData } from "../../api/getCurrentWeatherData";
import { AiOutlineSearch } from "react-icons/ai";
import { LineChart } from "../Chart/LineChart";
import { getHistoricalData } from "../../api/getHistoricalData";

//Start of the main functional component
const Dashboard = () => {
  const [weatherData, setWeatherData] = useState({});
  const [location, setLocation] = useState({});
  const [query, setQuery] = useState("kolkata");
  const [historicalData, setHistoricalData] = useState([]);
  const keys = [
    { key: "temp", title: "Temparature" },
    { key: "humidity", title: "Humidity" },
  ];
  const fetchHistoricalData = async () => {
    const data = await getHistoricalData(10, query);
    setHistoricalData(data);
  };

  useEffect(() => {
    getCurrentWeatherData(query, (data, err) => {
      if (!err) {
        setLocation(data?.location);
        setWeatherData(data?.current);
      } else {
        console.log(err);
      }
    });
    fetchHistoricalData();
  }, []);
  const handleSearch = async () => {
    getCurrentWeatherData(query, (data, err) => {
      if (!err) {
        setLocation(data?.location);
        setWeatherData(data?.current);
        fetchHistoricalData();
      } else {
        console.log(err);
      }
    });
  };
  return (
    <div className="dash-holder">
      <div className="home-img">
        {location.name ? (
          <h1>
            {location.name} <br />
            <span>{location.country}</span>
          </h1>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
      <div className="info">
        <div className="date-time">
          <div className="date-time-info">
            <h4>Update Time</h4>
            <h1>{formatTime(location.localtime)}</h1>
            <p>{formatDate(location.localtime)}</p>
          </div>
        </div>
        <div className="weatherData">
          <div className="weatherData-img">
            {/* <ReactAnimatedWeather
              icon={weatherData.icon}
              color={defaults.color}
              size={defaults.size}
              animate={defaults.animate}
            /> */}
          </div>
          <div className="weatherData-details">
            <p className="details-wet">{weatherData.main}</p>
            <div className="humidity">
              <p>Humidity</p>
              <h1>{weatherData.humidity}%</h1>
            </div>
          </div>
        </div>
        <div className="temparature">
          <h1>
            {" "}
            {weatherData.temp_c}
            <span>°C</span>
          </h1>
          <p>TEMPERATURE</p>
        </div>
      </div>
      <div className="Search">
        <input
          type="text"
          className="search-bar"
          placeholder="Search any city"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        ></input>
        <button onClick={handleSearch}>
          <a className="search-btn">
            <AiOutlineSearch size={20} />
          </a>
        </button>
      </div>
      <div className="search-place">
        <div className="place place-dummy">
          {/* <img src={CloudImg} />
          <p>Delhi,IN</p> */}
        </div>
        <div className="place place-humidity weather2">
          {weatherData && (
            <img src={weatherData?.condition?.icon} alt="weatherData icon" />
          )}
          <p>
            {weatherData?.name}, {weatherData?.country}
          </p>
        </div>
        <div className="place place-humidity humidity2">
          <h1>{Math.round(weatherData.humidity)}%</h1>
          <p>Humidity</p>
        </div>
        <div className="place place-humidity visibility2">
          <h1>
            {weatherData.vis_km}
            <span>km</span>
          </h1>
          <p>Visibility</p>
        </div>
        <div className="place place-humidity temp2">
          <h1>{weatherData.temp_c}°C</h1>
          <p>Temperature</p>
        </div>
        <div className="place place-humidity place-special wind-speed2">
          <h1>
            {weatherData.wind_kph} <span>Km/h</span>
          </h1>
          <p>Wind Speed</p>
        </div>
      </div>
      <div className="chart">
        {historicalData?.length > 0 ? (
          <section className="chart">
            {keys.map(({ key, title }) => (
              <LineChart
                key={key}
                chartTitle={title}
                dataset={historicalData.map(({ date, info }) => ({
                  date: new Date(date),
                  value: info[key],
                }))}
              />
            ))}
          </section>
        ) : (
          <h2>Loading Chart...</h2>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
