import React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { Logo } from '../resources'

const window = Dimensions.get('window')

const PageLogo = (props) => {
    return (
        <View>
            <Logo style={styles.logo} width={window.width / 10 * 4} height={window.width / 10 * 3}/>
        </View>
    )
}

const styles = StyleSheet.create({
    logo: {
        marginVertical: 5
    }
})

export default PageLogo
