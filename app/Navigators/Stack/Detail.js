import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import globeStyles from '../../components/globe/globeStyles';
import {COLORS} from '../../components/globe/colors';
import useMovie from '../../Redux/Features/useMovie';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Icon, IconButton, ActivityIndicator} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import MovieCard from '../../components/MovieCard';
import Genere from './Genere';
import Badge from '../../components/Badge';
import PaperBtn from '../../components/PaperButton';
import CustomButton from '../../components/CustomButton';

const Detail = ({route, navigation}) => {
  const {
    similarMovies,
    similar,
    details,
    setFavourite,
    removeFavourite,
    favourities,
    movieDetails,
  } = useMovie();

  const {id} = route.params;
  const [item, setItem] = useState(null);

  const favourite = favourities.data.find(movie => movie.id === id);

  useEffect(() => {
    similarMovies(id);
    // console.log(details.data);
    if (details.data) {
      setItem(details.data);
    
    }
    // console.log(item);
  }, [id, details.data]);
  console.log(item);


  const handlePress = (id) => {
    movieDetails(id);
    navigation.replace('Detail', {id});
  };

  if (!item) {
    return (
      //   <View style={{flex: 1, backgroundColor: COLORS.bgColor}}>
      <ActivityIndicator
        size="large"
        color={COLORS.primary2}
        animating={true}
        style={styles.loading}
      />
      //   </View>
    );
  }

  return (
    item && (
      <ScrollView style={styles.container}>
        {/* {console.log(item , 'item')} */}
        <Image
          style={styles.poster}
          source={{uri: 'https://image.tmdb.org/t/p/w500' + item.backdrop_path}}
        />
        <CustomButton icon={favourite ? 'heart' : 'heart-outline'} onPress={()=>favourite ? removeFavourite(item.id) : setFavourite(item)}  iconColor={favourite ? COLORS.primary2 : 'white'} iconSize={30}  containerStyle={{position: 'absolute', top: 10, right: 6}}  />

        <View style={styles.contentContainer}>
          <Text style={styles.headerText}>{item.original_title}</Text>

          <Text style={styles.score}>
            {' '}
            <Icon source={'star'} color="gold" size={16} />{' '}
            {`${item.vote_average}`}
          </Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.genreView}>

            {item.genres?.map(genre => (
              <Badge item={genre}  />
            ))}
          </ScrollView>

          <View style={styles.optionView}>
            
              <CustomButton icon={"web-box"} iconColor={COLORS.fontColor1} iconSize={35}  onPress={() => Linking.openURL(item.homepage)}/>
              <CustomButton   textStyle={{color: COLORS.bgColor, fontSize: 20, fontWeight:'bold', backgroundColor: 'gold', padding: wp('1%'), borderRadius: 5 }}  onPress={() =>  Linking.openURL(`https://www.imdb.com/title/${item.imdb_id}`)}>IMDB</CustomButton>
              
          
            {/* <View style={styles.optionViewColumn}>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(`https://www.imdb.com/title/${item.imdb_id}`)
                }>
                <Ionicons name="film-outline" color="white" size={35} />
                <Text style={styles.optionText}>IMDB</Text>
              </TouchableOpacity>
            </View> */}
          </View>

          <View style={styles.overview}>
            <Text style={styles.overviewText}>Overview</Text>
            <Text style={{marginTop: 10, color: 'white', fontSize: wp('4.5%')}}>
              {item.overview}
            </Text>
          </View>

          <View style={styles.additionalInfo}>
            <Text style={styles.infoText}>
              <Text style={styles.infoText2}>Release Date: </Text>
              {item.release_date}
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.infoText2}>Runtime: </Text>
              {item.runtime} minutes
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.infoText2}>Language: </Text>
              {item.spoken_languages[0].english_name}
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.infoText2}>Country: </Text>
              {item.production_countries
                .map(country => country.name)
                .join(', ')}
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.infoText2}>Production Companies: </Text>
              {item.production_companies
                .map(company => company.name)
                .join(', ')}
            </Text>
          </View>
        </View>
        <View style={styles.relatedView}>
          <Text style={styles.relatedText}>You might like</Text>
          <FlatList
            horizontal
            data={similar.data}
            renderItem={({item}) => <MovieCard item={item} onPress={()=>handlePress(item.id)} />}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={{
              paddingHorizontal: wp('2.5%'),
              marginBottom: hp('2.5%'),
            }}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </ScrollView>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary1,
  },
  loading: {
    flex: 1,
    backgroundColor: COLORS.bgColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    marginHorizontal: wp('5%'),
    marginTop: hp('2.5%'),
  },
  poster: {
    resizeMode: 'cover',
    flexWrap: 'wrap',
    aspectRatio: 16 / 9,
  },
  headerText: {
    marginLeft: wp('2.5%'),
    marginTop: hp('2.5%'),
    color: COLORS.primary2,
    fontSize: wp('6%'),
    fontWeight: 'bold',
    // fontFamily: ''
  },
  score: {
    marginVertical: hp('1.5%'),
    marginHorizontal: hp('1.5%') ,
    color: 'white',
    fontSize: wp('4%'),
    textAlign: 'right',
  },
  genreView: {
    flexDirection: 'row',
    marginTop: hp('1%'),
    marginLeft: wp('1%'),
  },
  genreText: {
    color: 'white',
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
  },
  genresText: {
    color: COLORS.primary2,
    fontSize: wp('3.8%'),
    textAlignVertical: 'center',
    marginHorizontal: wp('1.25%'),
    fontWeight: 'bold',
  },
  optionView: {
    flexDirection: 'row',
    marginTop: hp('3%'),
    marginLeft: wp('2.5%'),
  },
  optionViewColumn: {
    flexDirection: 'column',
    marginHorizontal: wp('2.5%'),
    alignItems: 'center',
  },
  optionText: {
    color: 'white',
    fontSize: wp('4.5%'),
    marginTop: hp('1%'),
  },
  overview: {
    marginLeft: wp('2.5%'),
    marginTop: hp('3%'),
  },
  overviewText: {
    fontSize: wp('6%'),
    color: COLORS.primary2,
    fontWeight: 'bold',
  },
  additionalInfo: {
    marginLeft: wp('2.5%'),
    marginTop: hp('2.5%'),
    color: 'white',
    fontSize: wp('4.5%'),
  },
  infoText: {
    color: 'white',
    fontSize: wp('3.5%'),
    marginTop: hp('0.5%'),
  },
  infoText2: {color: COLORS.primary2, fontSize: wp('4%'), fontWeight: '500'},
  relatedView: {
    marginLeft: wp('2.5%'),
    marginTop: hp('2.5%'),
  },
  relatedMovieView: {
    width: wp('30%'),
    height: hp('20%'),
    borderRadius: 8,
    marginHorizontal: wp('2.5%'),
  },
  relatedText: {
    marginLeft: wp('2.5%'),
    marginBottom: wp('2.5%'),
    fontSize: wp('6%'),
    color: COLORS.primary2,
    fontWeight: 'bold',
  },
  relatedImageView: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 8,
  },
});

export default Detail;
