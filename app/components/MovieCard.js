import { StyleSheet, View, TouchableWithoutFeedback, Image } from 'react-native';
import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const MovieCard = ({ onPress, item }) => {
  return (
    <TouchableWithoutFeedback onPress={()=>onPress(item.id)} key={item.id}>
      <View style={styles.movieContainer}>
        <View style={styles.movieView}>
          <Image style={styles.imageView} source={{ uri: "https://image.tmdb.org/t/p/w500" + item.poster_path }} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default MovieCard;

const styles = StyleSheet.create({
  movieContainer: {
    marginRight: wp('4%'),
  },
  movieView: {
    width: wp('35%'),
    height: hp('25%'),
    borderRadius: wp('2%'),
    overflow: 'hidden',
  },
  imageView: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
