import React, {useEffect, useState} from 'react'
import {Dimensions, Image, StyleSheet, TouchableOpacity, View} from 'react-native'
import { Logo } from '../resources'
import { getOrgLogo } from '../util/OrganizationUtil'
import AutoHeightImage from 'react-native-auto-height-image'

const window = Dimensions.get('window')

const PageLogo = (props) => {
    const [logo, setLogo] = useState()

    useEffect(() => {
        getOrgLogo().then(logo => {
            setLogo(logo)
        })
    }, [])

    return (
        <View>
            { logo && (
                <AutoHeightImage
                    source={{uri: logo}}
                    style={styles.logo}
                    resizeMode={'contain'}
                    width={window.width / 10 * 3}
                    height={window.height}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    logo: {
        marginVertical: 20
    }
})

export default PageLogo
