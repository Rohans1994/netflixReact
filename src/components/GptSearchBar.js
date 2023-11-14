import React, { useRef } from "react";
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import openai from "../utils/openAi";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovies } from "../utils/gptSlice";

const GptSearchBar = () => {
  const selectedLang = useSelector((store) => store.config.lang);
  const dispatch = useDispatch()
  const searchText = useRef(null);

  const getMoviesTMBD = async (movie) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`,
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };
  const handleGptSearch = async () => {
    const gptQuery = `Act as a Movie Recommendation system and suggest some movies for the query : ${searchText.current.value} only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya`;

    const gptSearchResult = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo",
    });

    if (!gptSearchResult.choices) {
      // TODO: Write error handling
    }

    // Sample result : Andaz Apna Apna, Hera Pheri, Amar Akbar Anthony, Chupke Chupke, Chalti Ka Naam Gaadi
    // split the result by comma
    const movies = gptSearchResult.choices?.[0]?.message?.content.split(",");

    // ['Andaz Apna Apna', ' Hera Pheri', ' Amar Akbar Anthony', ' Chupke Chupke', ' Chalti Ka Naam Gaadi']
    // Call TMND get movies API for each movie
    console.log(movies);
    const moviesPromise = movies.map((movie) => getMoviesTMBD(movie));
    const moviesData = await Promise.all(moviesPromise);
    dispatch(addGptMovies({movieNames:movies, movieResults: moviesData }))

    console.log(moviesData);
  };
  return (
    <div className="pt-[35%] md:pt-[10%] flex justify-center">
      <form
        className="w-full md:w-1/2 bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="p-4 m-4 col-span-9"
          placeholder={lang[selectedLang].gptSearchPlaceholder}
        />
        <button
          className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg"
          onClick={handleGptSearch}
        >
          {lang[selectedLang].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
