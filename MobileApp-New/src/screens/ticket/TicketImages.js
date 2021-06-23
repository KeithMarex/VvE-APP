import {SafeAreaView, StyleSheet, ScrollView, Dimensions, ActivityIndicator} from 'react-native'
import React, {useEffect, useState} from 'react'
import ApiHelper from '../../util/ApiHelper'
import AutoHeightImage from 'react-native-auto-height-image'
import {getOrgColors} from "../../util/OrganizationUtil";

const window = Dimensions.get('window')

const TicketImages = (props) => {
    const { ticket } = props.route.params;
    const [imageUrls, setImageUrls] = useState([])
    const [dataLoading, setDataLoading] = useState(true)
    const [colors, setColors] = useState({})

    useEffect(() => {
        getOrgColors().then(colors => {
            setColors(colors)
        })
    }, [])


    if (dataLoading) {
        ApiHelper.get(`/ticket/${ticket._id}`).then(ticket => {
            ticket.data.images.forEach(val => {
                setImageUrls((imageUrls) => [...imageUrls, val.image_url])
            })
        })
        setDataLoading(false)
    }

    const getImages = () => {
        const images = []
        for (let i = 0; i < imageUrls.length; i++) {
            images.push(
                <AutoHeightImage
                    resizeMode="contain"
                    style={styles.image}
                    source={{uri: `${imageUrls[i]}`}}
                    width={window.width * .9}
                    key={i}
                />
            )
        }
        return images
    }

    function showLoader() {
        return <ActivityIndicator style={{marginTop: '15%'}} size={'large'} color={colors?.primarycolor}/>
    }

    return (
        <SafeAreaView style={styles.root}>
            <ScrollView contentContainerStyle={styles.scrollView} horizontal={true}>
                { (!dataLoading)
                    ? getImages()
                    : showLoader()
                }
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    root: {
        backgroundColor: '#F7F7FC',
        height: '100%',
    },
    image: {
        marginTop: window.height * .1,
        marginLeft: window.width * .05,
        marginRight: window.width * .05
    }
})

export default TicketImages
