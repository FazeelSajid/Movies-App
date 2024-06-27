import React, { useState } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from './globe/colors';
import useMovie from '../Redux/Features/useMovie';
import { IconButton } from 'react-native-paper';

const FavMovieCard = ({ movie, onPress, opacity }) => {
  const { id } = movie;
  const { removeFavourite, favourities, setFavourite } = useMovie();

  const favourite = favourities.data.find(movie => movie.id === id);
  
  const [showFullDescription, setShowFullDescription] = useState(false);

  const handleDescriptionToggle = () => {
    setShowFullDescription(!showFullDescription);
  };

  const renderDescription = () => {
    const maxLength = 100; 
    if (showFullDescription || movie.overview.length <= maxLength) {
      return (
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.description}>{movie.overview}</Text>
          {movie.overview.length > maxLength && (
            <Text style={styles.seeAll} onPress={handleDescriptionToggle}>
              See Less
            </Text>
          )}
        </View>
      );
    } else {
      return (
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.description}>
            {movie.overview.substring(0, maxLength)}...
            <Text style={styles.seeAll} onPress={handleDescriptionToggle}>
            See All
          </Text>
          </Text>
         
        </View>
      );
    }
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={opacity} style={styles.cardContainer}>
      <ImageBackground
        source={{ uri: "https://image.tmdb.org/t/p/w500" + movie.poster_path }}
        style={styles.imageBackground}
        imageStyle={{ borderRadius: 10 }}
      >
        <IconButton
          icon={favourite ? 'cards-heart' : 'cards-heart-outline'}
          iconColor={favourite ? COLORS.primary2 : COLORS.fontColor1}
          size={25}
          style={{ position: 'absolute', top: 0, right: 0 }}
          onPress={() => favourite ? removeFavourite(movie.id) : setFavourite(movie)}
        />

        <View style={styles.overlay}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.subtitle}>
            [{movie.release_date.split('-')[0]}] {movie.genres?.map(genre => genre.name).join(', ')}
          </Text>
          {renderDescription()}
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    width: wp('90%'),
    marginVertical: hp('2%'),
    // alignSelf: 'center',
  },
  imageBackground: {
    width: '100%',
    height: hp('55%'),
    justifyContent: 'flex-end',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: wp('3%'),
    paddingBottom: wp('4%'),
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  title: {
    color: COLORS.fontColor1,
    fontSize: wp('4%'),
    fontWeight: 'bold',
    marginVertical: wp('3%'),
  },
  subtitle: {
    color: COLORS.primary3,
    fontSize: wp('3.3%'),
    fontWeight: '500',
    marginBottom: hp('0.5%'),
  },
  description: {
    color: 'white',
    fontSize: wp('3%'),
    lineHeight: wp('5%'),
  },
  seeAll: {
    color: COLORS.primary3,
    fontSize: wp('3%'),
    // backgroundColor: 'white',
  },
});

export default FavMovieCard;
