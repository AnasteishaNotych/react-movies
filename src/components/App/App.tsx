import { useState } from "react";
import { fetchMovies } from "../../services/movieService";
import SearchBar from "../SearchBar/SearchBar";
import css from "./App.module.css";
import toast, { Toaster } from 'react-hot-toast';
import type { Movie } from "../../types/movie";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";




function App() {
  const [movies, setMovies]=useState<Movie[]| null>(null);
  const [selectedMovie, setSelectedMovie]=useState<Movie | null>(null);
  const [isError, setIsError]=useState(false);
  const[isLoading, setIsLoading]=useState(false);
  const [isModalOpen, setIsModalOpen]=useState(false);

  const handleSubmit=async (query: string)=>{
    setMovies(null);
    setIsError(false);
    setIsLoading(true);
    try{
    const response = await fetchMovies(query);
    if(response.length===0){
      toast.error("No movies found for your request.");
      setMovies(null);
      return;
    }
    setMovies(response);
    }

    catch{
      setIsError(true)
    }

    finally{
setIsLoading(false);
    }
  }


  const handleSelect = (movie:Movie) =>{
     setSelectedMovie(movie);
     setIsModalOpen(true);
  }

  const handleCloseModal = () =>{
    setIsModalOpen(false);
    setSelectedMovie(null);
  }
  

  return (<div className={css.app}>
  <Toaster />
  <SearchBar onSubmit={handleSubmit}/>
  {isLoading && <Loader />}
  {isError && <ErrorMessage />}
  {movies && movies.length>0 && <MovieGrid movies={movies} onSelect={handleSelect}/>}
  {selectedMovie && isModalOpen && <MovieModal movie={selectedMovie} onClose={handleCloseModal}/>}
  </div>);
}

export default App;