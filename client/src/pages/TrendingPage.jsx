import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
function TrendingPage() {
  const [allAnime, setAllAnime] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(null);
  const [topTen,setTopTen]=useState([]);
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
      // console.log("API Response:", response.data);
  
      const animeList = response.data.data; // Array of anime
      setAllAnime(animeList);
  
      // Adjust filtering logic based on available fields
      const trendings = animeList
        .filter((anime) => {
          // Use `status` or other field to filter currently airing shows
          // console.log(`Checking anime: ${anime.title}, Status: ${anime.status}`);
          return anime.status === "Currently Airing";
        })
        .sort((a, b) => b.favorites - a.favorites) // Sort by score
        .slice(0, 3); // Take top 3
  
      // console.log("Filtered Trending Anime:", trendings);
      setTrending(trendings);
      
      const topTens = animeList.slice(0, 10); // Take top 10
      setTopTen(topTens);

    // console.log("Filtered Trending top 10 Anime:", topTens);
      setTopTen(topTens);
      setLoading(false);
    } catch (error) {
      // console.error("Error fetching data:", error);
      setIsError(error.message);
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Loading and Error Handling
  if (loading) {
    return <div className="flex justify-center items-center h-full w-full bg-black"><Loader/></div>;
  }

  if (isError) {
    return <div>Error: {isError}</div>;
  }

  return (
    <div className="h-auto bg-zinc-800 text-white flex-col items-center justify-center">
      {/* Top 3 Trending Anime */}
      <div className="text-center mb-9 pt-9 text-4xl font-extrabold text-orange-700">
        <h1>Top 3 Trending🔥</h1>
      </div>
    <div className="flex justify-center items-center">
      <ul className="flex items-center bg-zinc-800 h-full w-5/6 justify-around rounded-lg gap-2">
  {Array.isArray(trending) && trending.length > 0 ? (
    trending.map((item,ind) => (
      <li className="flex justify-around w-full h-[70vh] align-middle p-6 gap-4 bg-zinc-900 rounded-xl text-nowrap" key={item.mal_id}><div>
        <div className="font-medium text-5xl font-mono text-slate-300 mb-2"><i>{ind+1}</i></div>
        <strong className="text-orange-700 h-1/3">{item.title_english===null?item.title:item.title_english}</strong> <br />  <p>Favorites: {item.favorites}</p> <div>⭐ {item.score}</div>
        <div className="flex justify-center h-full w-full mt-7"><a href={`${item.trailer.url}`}>
        <img className="rounded-lg h-72 w-55 object-cover" src={`${item.images.webp.image_url}`} alt="" />
        </a>
        </div>
      </div>
      </li>
    ))
  ) : (
    <li className="text-white font-bold">No trending anime available.</li>
  )}
</ul> 
    </div>
     
     <div className="h-auto w-full bg-zinc-800 flex justify-center items-center mt-40 text-center">
          <div className="bg-zinc-900 w-5/6 h-auto rounded-lg mb-48 flex-col text-center ">
          <div className="text-center mb-4 pt-10 text-4xl font-extrabold text-orange-700 w-full">
        <h1>Top 10 Trending🔥</h1>
      </div>
          <ul className="w-full">
          {Array.isArray(topTen) && topTen.length > 0 ? (
         topTen.map((item,ind) => (
      <li className="flex w-full h-auto p-4 gap-4 bg-zinc-900 rounded-xl text-nowrap " key={item.mal_id}><div>
        <div className="flex h-full w-full mt-8 p-8"><img className="rounded-lg h-72 w-auto object-cover" src={`${item.images.webp.image_url}`} alt="img" />
          <strong className="text-orange-700 h-1/3 p-8 flex-col text-start text-wrap"><div className="font-medium text-5xl font-mono text-slate-300 "><i>{ind+1}</i></div>{item.title_english===null?item.title:item.title_english}<div className="text-white text-start">Favorites: {item.favorites}</div>
          <div className="text-white text-start text-wrap font-light">{item.synopsis}</div>
          </strong>
        </div>
      </div>
      </li>
    ))
  ) : (
    <li className="text-white font-bold">No trending anime available.</li>
  )}
          </ul>
          </div>
      </div>
    </div>  
  )
}

export default TrendingPage;