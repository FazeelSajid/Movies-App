import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {Alert} from 'react-native';

const initialState = {
  trending: {
    data: [],
    status: 'idle',
    error: null,
  },
  upcoming: {
    data: [],
    status: 'idle',
    error: null,
  },
  similar: {
    data: [],
    status: 'idle',
    error: null,
  },
  topRated: {
    data: [],
    status: 'idle',
    error: null,
  },
  popular: {
    data: [],
    status: 'idle',
    error: null,
  },
  details: {
    data: {},
    status: 'idle',
    error: null,
  },
  favourities: {
    data: [],
    status: 'idle',
    error: null,
  },
};

const apis = {
  getTrendingMovies:
    'https://api.themoviedb.org/3/trending/movie/day?api_key=36eb317b865f67ade748be2f276bbbbd&language=en-US&page=1',
  getUpcomingMovies:
    'https://api.themoviedb.org/3/movie/upcoming?api_key=36eb317b865f67ade748be2f276bbbbd&language=en-US&page=1',
  getTopRatedMovies:
    'https://api.themoviedb.org/3/movie/top_rated?api_key=36eb317b865f67ade748be2f276bbbbd&language=en-US&page=1',
  getPopularMovies:
    'https://api.themoviedb.org/3/movie/popular?api_key=36eb317b865f67ade748be2f276bbbbd&language=en-US&page=1',
};

export const fetchTrendingMovies = createAsyncThunk(
  'fetchTrendingMovie',
  async () => {
    const response = await axios.get(apis.getTrendingMovies);
    return response.data;
  },
);
export const fetchUpcomingMovies = createAsyncThunk(
  'fetchUpcomingMovie',
  async () => {
    const response = await axios.get(apis.getUpcomingMovies);
    return response.data;
  },
);

export const fetchTopRatedMovies = createAsyncThunk(
  'fetchTopRatedMovie',
  async () => {
    const response = await axios.get(apis.getTopRatedMovies);
    return response.data;
  },
);
export const fetchPopularMovies = createAsyncThunk(
  'fetchPopularMovie',
  async () => {
    const response = await axios.get(apis.getPopularMovies);
    return response.data;
  },
);
export const fetchSimilarMovies = createAsyncThunk(
  'fetchSimilarMovie',
  async id => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/similar?api_key=36eb317b865f67ade748be2f276bbbbd&language=en-US&page=1`,
    );
    return response.data;
  },
);
export const fetchMoviesDetails = createAsyncThunk(
  'fetchMoviesDetail',
  async id => {
    // console.log(id, 'fetch');
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=36eb317b865f67ade748be2f276bbbbd&language=en-US&page=1`,
    );
    return response.data;
  },
);

const shuffle = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
const setFavourite = (state, action) => {
  const item = action.payload;
  // console.log(item);

  const existingMovie = state.favourities.data.find(
    movie => movie.id === item.id,
  );
  if (existingMovie) {
    Alert.alert(`${item.original_title}`, 'Is already exist', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
  } else {
    state.favourities.data.push(item);
  }
};
const removefavorite = (state, action) =>{
  const id = action.payload;
  state.favourities.data = state.favourities.data.filter(movie => movie.id !== id)
}
const clearDetails = (state, action) => {
  state.details.data = undefined;
  // state.details.loading = true
};

export const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setFavourites: setFavourite,
    removefavorites : removefavorite,
    detailsClear : clearDetails
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTrendingMovies.pending, state => {
        state.trending.status = 'loading';
      })
      .addCase(fetchTrendingMovies.fulfilled, (state, action) => {
        state.trending.status = 'succeeded';
        state.trending.data = shuffle(action.payload.results);
      })
      .addCase(fetchTrendingMovies.rejected, (state, action) => {
        state.trending.status = 'failed';
        state.trending.error = action.error.message;
      })
      .addCase(fetchUpcomingMovies.pending, state => {
        state.status = 'pending';
      })
      .addCase(fetchUpcomingMovies.fulfilled, (state, action) => {
        state.upcoming.status = 'succeeded';
        state.upcoming.data = shuffle(action.payload.results);
      })
      .addCase(fetchUpcomingMovies.rejected, async (state, action) => {
        state.upcoming.status = 'failed';
        state.upcoming.error = action.error.message;
      })
      .addCase(fetchTopRatedMovies.pending, state => {
        state.topRated.status = 'pending';
      })
      .addCase(fetchTopRatedMovies.fulfilled, (state, action) => {
        state.topRated.status = 'succeeded';
        state.topRated.data = shuffle(action.payload.results);
      })
      .addCase(fetchTopRatedMovies.rejected, (state, action) => {
        state.topRated.status = 'failed';
        state.topRated.error = action.error.message;
      })
      .addCase(fetchPopularMovies.pending, state => {
        state.popular.status = 'pending';
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.popular.status = 'succeeded';
        state.popular.data = shuffle(action.payload.results);
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.popular.status = 'failed';
        state.popular.error = action.error.message;
      })
      .addCase(fetchSimilarMovies.pending, state => {
        state.similar.status = 'pending';
      })
      .addCase(fetchSimilarMovies.fulfilled, (state, action) => {
        state.similar.status = 'succeeded';
        state.similar.data = shuffle(action.payload.results);
      })
      .addCase(fetchSimilarMovies.rejected, (state, action) => {
        state.similar.status = 'failed';
        state.similar.error = action.error.message;
      })
      .addCase(fetchMoviesDetails.pending, state => {
        state.details.status = 'pending';
      })
      .addCase(fetchMoviesDetails.fulfilled, (state, action) => {
        state.details.status = 'succeeded';
        // console.log(action.payload);
        state.details.data = action.payload;
      })
      .addCase(fetchMoviesDetails.rejected, (state, action) => {
        state.details.status = 'failed';
        state.details.error = action.error.message;
      });
  },
});

export const {setFavourites, removefavorites, detailsClear} = movieSlice.actions;
export default movieSlice.reducer;
