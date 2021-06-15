import {SafeAreaView, StyleSheet, ScrollView, Dimensions, Text, Image, ActivityIndicator} from 'react-native'
import React, {useState} from 'react'
import ApiHelper from "../../util/ApiHelper";
import FastImage from "react-native-fast-image";

const window = Dimensions.get('window')

const TicketImages = (props) => {
    const { ticket } = props.route.params;
    const [imageUrls, setImageUrls] = useState([]);
    const [dataLoading, setDataLoading] = useState(true);

    if(dataLoading){
        ApiHelper.get(`/ticket/${ticket._id}`).then(ticket => {
            ticket.data.images.forEach(val => {
                setImageUrls((imageUrls) => [...imageUrls, val.image_url])
            })
        })
        setDataLoading(false);
    }

    const getImages = () => {
        const images = [];
        for (let i = 0; i < imageUrls.length; i++){
            images.push(
                <Image resizeMode="contain" style={{borderWidth: 1 ,height: Dimensions.get('window').height * .7, width: Dimensions.get('window').width * .8, marginTop: Dimensions.get('window').height * .1, marginLeft: Dimensions.get('window').width * .05, marginRight: Dimensions.get('window').width * .05}} key={i} source={{uri: `${imageUrls[i]}`}}/>
            )
        }
        return images;
    }

    function showLoader() {
        return <ActivityIndicator style={{marginTop: '15%'}} size={'large'} color='#451864'/>;
    }

    return (
        <SafeAreaView style={styles.root}>
            <ScrollView style={styles.scrollView} horizontal={true}>
                { (!dataLoading)
                    ? getImages()
                    : showLoader()
                }
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    root: {
        backgroundColor: '#F7F7FC',
        height: '100%',
    }
})

export default TicketImages
