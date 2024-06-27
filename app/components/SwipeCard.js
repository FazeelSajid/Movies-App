import React from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const SwipeCard = ({ movie }) => {
  return (
    <View style={styles.cardContainer}>
      <ImageBackground
        source={{ uri: "https://image.tmdb.org/t/p/w500" + movie.backdrop_path }}
        style={styles.imageBackground}
        imageStyle={{ borderRadius: 10 }}
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.subtitle}>
            [{movie.release_date.split('-')[0]}] {movie.genres.map(genre => genre.name).join(', ')}
          </Text>
          <Text style={styles.description}>{movie.overview}</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: wp('90%'),
    height: hp('70%'),
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 15,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  title: {
    color: 'white',
    fontSize: wp('5%'),
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#00bfff',
    fontSize: wp('4%'),
    marginVertical: hp('1%'),
  },
  description: {
    color: 'white',
    fontSize: wp('3.5%'),
    marginBottom: hp('1%'),
  },
});

export default SwipeCard;
