import { fetchTrendingMovies, fetchPopularMovies, fetchUpcomingMovies, fetchTopRatedMovies, fetchSimilarMovies, fetchMoviesDetails, setFavourites, removefavorites, detailsClear } from "./moviesSlice";
import { useDispatch, useSelector } from "react-redux";

const useMovie = () => {

    const dispatch = useDispatch();
    const trendingMovies = () =>{
        dispatch(fetchTrendingMovies())
        }
        const popularMovies = () =>{
            dispatch(fetchPopularMovies())
    }
    const upcomingMovies = () =>{
        dispatch(fetchUpcomingMovies())
    }
    const topRatedMovies = () =>{
        dispatch(fetchTopRatedMovies())
    }
    const similarMovies = (id) =>{
        dispatch(fetchSimilarMovies(id))
    }
    const movieDetails = (id) =>{
        dispatch(detailsClear())
        // console.log(id);
        dispatch(fetchMoviesDetails(id))
        }
        
    const setFavourite = (item) =>{
        dispatch(setFavourites(item))
    }
    const removeFavourite = (id) =>{
        // console.log('Remove Fav From useMovie()');
        dispatch(removefavorites(id))
    }
    const clearDetails = () =>{
        dispatch(detailsClear())
    }

    const handleSelectedCategory = (id, selectedCategory, setSelectedCategory, setSearchInput, setCategoryArray) => {
        if (selectedCategory === id) {
          setSelectedCategory('');
        } else {
          setSelectedCategory(id);
          setCategoryArray([]);
        }
    
        setSearchInput('');
      };
    const  genres = [
        {
            "id": 28,
            "name": "Action"
        },
        {
            "id": 12,
            "name": "Adventure"
        },
        {
            "id": 16,
            "name": "Animation"
        },
        {
            "id": 35,
            "name": "Comedy"
        },
        {
            "id": 80,
            "name": "Crime"
        },
        {
            "id": 18,
            "name": "Drama"
        },
        {
            "id": 10751,
            "name": "Family"
        },
        {
            "id": 14,
            "name": "Fantasy"
        },
        {
            "id": 36,
            "name": "History"
        },
        {
            "id": 27,
            "name": "Horror"
        },
        {
            "id": 9648,
            "name": "Mystery"
        },
        {
            "id": 10749,
            "name": "Romance"
        },
        {
            "id": 878,
            "name": "Science Fiction"
        },
        {
            "id": 53,
            "name": "Thriller"
        },
        {
            "id": 10752,
            "name": "War"
        },
        {
            "id": 37,
            "name": "Western"
        }
    ]

    const { trending, upcoming, topRated, similar, details, popular, favourities } = useSelector(state => state.movies)

    const globalArray = [...trending.data, ...popular.data, ...upcoming.data, ...topRated.data];


    

  return {
    trendingMovies,
    popularMovies,
    upcomingMovies,
    topRatedMovies,
    similarMovies,
    movieDetails,
    setFavourite,
    removeFavourite,
    clearDetails,
    handleSelectedCategory,
    trending,
    upcoming,
    topRated,
    similar,
    details,
    popular,
    favourities,
    globalArray,
    genres,
  }
    
  
}

export default useMovie

