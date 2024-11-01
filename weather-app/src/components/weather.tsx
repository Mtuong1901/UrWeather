import React, { useState } from 'react';
import axios from 'axios';
import { WeatherData } from '../types/weatherData';
import WeatherDisplay from './WeatherDisplay';

const Weather: React.FC = () => {
    const [city, setCity] = useState('');
    const [history, setHistory] = useState<WeatherData[]>([]);
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [error, setError] = useState('');

    const apiKey = 'b6fe010f40d4031416941fa908054527';

    const fetchWeather = async () => {
        try {
            const response = await axios.get<WeatherData>(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
            );
            setWeatherData(response.data);
            setHistory((prevHistory) => [...prevHistory, response.data]);
            setError('');
        } catch (err) {
            setError('Không tìm thấy thành phố. Vui lòng thử lại.');
            setWeatherData(null);
        }
    };
    

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        fetchWeather();
    };
    const handleTakeLocation = (e: React.FormEvent) => {
        e.preventDefault();
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                try {
                    const response = await axios.get<WeatherData>(
                        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
                    );
                    setWeatherData(response.data);
                    setHistory((prevHistory) => [...prevHistory, response.data]);
                    setError('');
                } catch (err) {
                    setError('Lỗi lấy dữ liệu thời tiết. Vui lòng thử lại.');
                }
            },
            () => setError('Không thể lấy vị trí của bạn.')
        );
    };

    return (
        <div className="weather-app">
            <form onSubmit={handleSubmit} className="mb-4 flex flex-col items-center gap-2">
                <div className='flex items-center gap-3'>
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Type city name"
                        className="input w-[300px] h-[55px] p-2 rounded-xl border border-gray-300 focus:outline-none focus:border-blue-500"
                    />
                    <div className='location'>
                        <i className="fa-solid fa-location-dot text-white text-[25px] cursor-pointer" onClick={handleTakeLocation}></i>
                    </div>
                </div>
                <button
                    type="submit"
                    className="button w-[150px] h-[55px] bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition duration-200"
                >
                    Tìm kiếm
                </button>
            </form>
            {error && <p className="error text-[24px] text-white font-bold">{error}</p>}
            {weatherData && <WeatherDisplay weatherData={weatherData} history={history} />}
            </div>
    );
};

export default Weather;
