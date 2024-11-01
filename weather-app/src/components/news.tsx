import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Article {
    title: string;
    description: string;
    link: string;
}

export const News: React.FC = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const newsApiKey = 'pub_579092b1e523233094ea295d205291d34866d'; // API key từ NewsData
    const city = 'Ho Chi Minh';

    const fetchWeatherNews = async () => {
        try {
            // Gọi API để lấy danh sách nguồn tin tức
            const response = await axios.get(
                `https://newsdata.io/api/1/latest?country=vi&apikey=pub_579092b1e523233094ea295d205291d34866d`
            );
            setArticles(response.data.results);
        } catch (err) {
            setError('Lỗi khi lấy tin tức thời tiết.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWeatherNews();
    }, []);
    return (
        <div className="weather-news">
            {loading ? (
                <p>Đang tải dữ liệu...</p>
            ) : error ? (
                <p className="error text-red-500">{error}</p>
            ) : (
                <div>
                    <h2 className="text-2xl font-bold text-white">Tin tức tại {city}</h2>
                    <ul className='w-[300px] max-h-[400px] overflow-y-auto'>
                        {articles.map((article, index) => (
                            <li key={index} className="news-item bg-white">
                                <h3 className="news-title font-semibold text-lg text-white mb-2">{article.title}</h3>
                                <p className="news-description text-gray-700">{article.description}</p>
                                <a
                                    href={article.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="news-link text-blue-400 underline hover:text-blue-600"
                                >
                                    Đọc thêm
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};
