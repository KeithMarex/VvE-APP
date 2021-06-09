import {SafeAreaView, StyleSheet, ScrollView, Dimensions, Text, Image} from 'react-native'
import React, {useState} from 'react'
import AppointmentChoose from "../../components/AppointmentChoose";
import ApiHelper from "../../util/ApiHelper";
import moment from "moment";

const window = Dimensions.get('window')

const TicketImages = (props) => {
    const { ticket } = props.route.params;
    const [imageUrls, setImageUrls] = useState([]);
    const [dataLoading, setDataLoading] = useState(true);

    if(dataLoading){
        console.log('DIT BEN IK:: ', ticket._id)
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
                <Image style={{height: Dimensions.get('window').height * .8, width: Dimensions.get('window').width * .8, marginTop: Dimensions.get('window').height * .1, marginLeft: Dimensions.get('window').width * .05, marginRight: Dimensions.get('window').width * .05}} key={i} source={{uri: imageUrls[i]}}/>
            )
        }
        return images;
    }

    function showLoader() {
        return <Text>Loading images...</Text>;
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
