import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StyleSheet } from 'react-native';

const globeStyles = StyleSheet.create({
    container: {
        flex: 1,
        // marginTop: 20
    },
    poster: {
        width: "100%",
        resizeMode: "cover",
        flexWrap: "wrap", 
        aspectRatio: 16 / 9
    },
    headerText: {
        marginLeft: wp('5%'),
        marginTop: hp('2.5%'),
        color: "white",
        fontSize: wp('6.5%'),
        fontWeight: "bold"
    },
    score: {
        marginLeft: wp('5%'),
        marginTop: hp('1.25%'),
        color: "#327740",
        fontSize: wp('6.5%'),
        fontWeight: "bold"
    },
    genreView: {
        flexDirection: "row",
        marginTop: hp('1.25%'),
        marginLeft: wp('5%')
    },
    genreText: {
        color: "white",
        fontSize: wp('4.4%'),
        marginHorizontal: wp('1.25%'),
        fontWeight: "bold"
    },
    optionView: {
        flexDirection: "row",
        marginTop: hp('3.75%'),
        marginLeft: wp('5%'),
    },
    optionViewColumn: {
        flexDirection: "column",
        marginHorizontal: wp('2.5%'),
        alignItems: "center"
    },
    optionText: {
        color: "white",
        fontSize: wp('4.6%'),
        marginTop: hp('1.25%')
    },
    overview: {
        marginLeft: wp('5%'),
        marginTop: hp('3.75%')
    },
    overviewText: {
        fontSize: wp('5.2%'),
        color: "white",
        fontWeight: "bold",
    },
    relatedView: {
        marginLeft: wp('5%'),
        marginTop: hp('2.5%'),
    },
    relatedMovieView: {
        flex: 1,
        width: wp('30%'),
        flexDirection: "row",
        height: hp('22.25%'),
        borderRadius: wp('2%'),
        marginHorizontal: wp('2.5%')
    },
    relatedText: {
        fontSize: wp('5.2%'),
        color: "white",
        fontWeight: "bold",
    },
    relatedImageView: {
        flex: 1,
        width: wp('30%'), 
        height: hp('22.25%'),
        resizeMode: "cover",
        borderRadius: wp('2%')
    }
});

export default globeStyles;
