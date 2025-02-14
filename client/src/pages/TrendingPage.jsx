import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

function TrendingPage() {
  const [allAnime, setAllAnime] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(null);
  const [topTen, setTopTen] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    }
  }, [navigate]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://api.jikan.moe/v4/seasons/now");
      const animeList = response.data.data;
      setAllAnime(animeList);

      const trendings = animeList
        .filter((anime) => anime.status === "Currently Airing")
        .sort((a, b) => b.favorites - a.favorites)
        .slice(0, 3);
      setTrending(trendings);

      const topTens = animeList.slice(0, 10);
      setTopTen(topTens);
      setLoading(false);
    } catch (error) {
      setIsError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen w-full bg-black"><Loader/></div>;
  }

  if (isError) {
    return <div className="text-white text-center p-4">Error: {isError}</div>;
  }

  return (
    <div className="min-h-screen bg-zinc-800 text-white flex flex-col items-center justify-center p-4">
      <div className="text-center mb-9 pt-9 text-3xl md:text-4xl font-extrabold text-orange-700">
        <h1>Top 3 Trending🔥</h1>
      </div>
      <div className="flex flex-wrap justify-center items-center gap-4 w-full max-w-36xl">
        {trending.map((item, ind) => (
          <div key={item.mal_id} className="flex flex-col-reverse md:flex-row items-center bg-zinc-900 p-4 rounded-xl w-full md:w-1/3 text-wrap">
            <div className="text-center md:text-left p-6">
              <div className="font-medium text-5xl font-mono text-slate-300 mb-2"><i>{ind+1}</i></div>
              <strong className="text-orange-700">{item.title_english || item.title}</strong>
              <p>Favorites: {item.favorites}</p>
              <div>⭐ {item.score}</div>
            </div>
            <a href={item.trailer.url} className="mt-4 md:mt-0">
              <img className="rounded-lg h-48 md:h-72 w-full object-cover" src={item.images.webp.image_url} alt="Anime" />
            </a>
          </div>
        ))}
      </div>
     
      <div className="w-full max-w-7xl mt-16">
        <div className="text-center mb-4 text-3xl md:text-4xl font-extrabold text-orange-700">
          <h1>Top 10 Trending🔥</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {topTen.map((item, ind) => (
            <div key={item.mal_id} className="flex flex-col md:flex-row items-center bg-zinc-900 p-4 rounded-xl">
              <img className="rounded-md h-auto md:h-auto w-1/2 md:w-full object-cover pt-4" src={item.images.webp.image_url} alt="Anime" />
              <div className="flex flex-col p-4 items-center md:items-start">
                <div className="font-medium text-3xl md:text-5xl font-mono text-slate-300"><i>{ind+1}</i></div>
                <strong className="text-orange-700">{item.title_english || item.title}</strong>
                <p className="text-white">Favorites: {item.favorites}</p>
                <p className="text-white text-sm md:text-base font-light">{item.synopsis}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>  
  );
}

export default TrendingPage;
