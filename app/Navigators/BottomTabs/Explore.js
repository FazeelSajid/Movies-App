import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import {COLORS} from '../../components/globe/colors';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FavMovieCard from '../../components/FavMovieCard';
// import SwipeCard from '../../components/SwipeCard';
import useMovie from '../../Redux/Features/useMovie';
import {Button} from 'react-native';

const Explore = ({navigation}) => {
  const {trending, popular, topRated, similar, upcoming, movieDetails, clearDetails} = useMovie();

  const [uniqueMovies, setUniqueMovies] = useState([]);

  const shuffle = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    const combinedArray = [
      ...trending.data,
      ...popular.data,
      ...topRated.data,
      ...similar.data,
      ...upcoming.data,
    ];

    const movieOccurrences = {};

    combinedArray.forEach(movie => {
      if (movieOccurrences[movie.id]) {
        movieOccurrences[movie.id].count += 1;
      } else {
        movieOccurrences[movie.id] = {...movie, count: 1};
      }
    });

    const uniques = Object.values(movieOccurrences).filter(
      movie => movie.count === 1,
    );

    setUniqueMovies(shuffle(uniques));
  }, []);

  const handlePress = (id) => {
   
    movieDetails(id);
    navigation.navigate('Detail', {id});
  };
  //  console.log(uniqueMovies);

  // console.log(trending.data);
  return (
    <View style={styles.container}>
      {/* <Text style={styles.heading}>Swipe To Explore More</Text> */}
      {uniqueMovies.length > 0 && (
        <Swiper
        // showSecondCard={false}
          cards={uniqueMovies}
          
          renderCard={movie => {
            // console.log(movie);
            return <FavMovieCard movie={movie} onPress={()=> handlePress(movie.id)} opacity={1} />;
          }}
          onSwiped={cardIndex => {
            // console.log(cardIndex);
          }}
          onSwipedAll={() => {
            // console.log('onSwipedAll');
          }}
          cardIndex={0}
          // backgroundColor={'green'}
          cardStyle={{alignSelf: 'center'}}
          // cardVerticalMargin={hp('20%')}
          containerStyle={{
            backgroundColor: 'transparent',
            marginVertical: hp('14%'),            
          }}
          stackSize={2}></Swiper>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary1,
    // paddingVertical: 
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  heading: {
    color: 'white',
    backgroundColor: '#0d3b66',
    fontSize: 30,
  },
});

export default Explore;
