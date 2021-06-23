import React, {useEffect, useState} from 'react'
import {AsyncStorage, Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native'
import {ArrowIcon, ENFlag, Logo, NLFlag} from '../resources'
import StyledText from "./StyledText";
import { getOrgColors } from '../util/OrganizationUtil'

const LanguageSelector = (props) => {
    return (
        <View style={{flexDirection: 'row', marginTop: '5%'}}>
            <TouchableOpacity onPress={async () => {
                await AsyncStorage.setItem('lang', 'nl');
                alert('Restart application for changes to be applied.');
            }}>
                <NLFlag style={{marginRight: '2%'}}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={async () => {
                await AsyncStorage.setItem('lang', 'en');
                alert('Restart application for changes to be applied.');
            }}>
                <ENFlag style={{marginLeft: '2%', marginRight: '-2%'}}/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
})

export default LanguageSelector
