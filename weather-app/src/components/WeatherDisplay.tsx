import React from 'react';
import { WeatherData } from '../types/weatherData';

interface WeatherDisplayProps {
  weatherData: WeatherData;
  history: WeatherData[];
}
const translateWeatherDescription = (description: string) => {
  const translations: { [key: string]: string } = {
      "clear sky": "Trời quang đãng",
      "few clouds": "Ít mây",
      "scattered clouds": "Mây rải rác",
      "broken clouds": "Mây đứt quãng",
      "shower rain": "Mưa rào",
      "moderate rain" :"mưa vừa",
      "rain": "Mưa",
      "thunderstorm": "Giông bão",
      "snow": "Tuyết",
      "mist": "Sương mù"
      // Bổ sung thêm các trường hợp cần thiết
  };

  return translations[description] || description; // Trả về mô tả gốc nếu không tìm thấy
};

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weatherData,history }) => {
  return (
    <>
      <div className="weather-display flex items-center justify-center gap-2 text-[#ffffff]">
        <h2 className='text-white text-[20px]'>{weatherData.name}</h2>
        <p className='text-red-500'>Nhiệt độ: <span>{weatherData.main.temp}°C</span></p>
        <p className='text-blue-500'>Độ ẩm: <span>{weatherData.main.humidity}%</span></p>
        <p>Mô tả: <span>{translateWeatherDescription(weatherData.weather[0].description)}</span></p>
        <img
          src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
          alt="Weather icon"
        />
      </div>
      <div className="history flex flex-col items-center">
        <h2 className="text-white text-[20px]">Lịch sử</h2>
        <div className="w-[400px] rounded-lg">
          {history.map((item, index) => (
            <div key={index} className="history-item mb-2 text-white flex gap-2 text-left overflow-auto">
              <p className="font-bold">{item.name}</p>
              <p>Nhiệt độ: {item.main.temp}°C</p>
              <p>Độ ẩm: {item.main.humidity}%</p>
              <p>Mô tả: <span>{translateWeatherDescription(weatherData.weather[0].description)}</span></p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default WeatherDisplay;
