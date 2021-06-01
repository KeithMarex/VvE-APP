import React from 'react'
import {Dimensions, StyleSheet, View} from 'react-native'
import {PenIcon, PlusIcon, CloseButton} from '../resources'
import StyledText from './StyledText'

const window = Dimensions.get('window')

const PageActionButton = (props) => {
    return (
        <View style={styles.addButton}>
            <View style={styles.addButtonIconWrapper}>
                {props.icon === 'plus' && (
                    <PlusIcon stroke={'#F7F7FC'} width={window.width / 10 * .6} height={window.width / 10 * .6}/>
                )}
                {props.icon === 'pen' && (
                    <PenIcon stroke={'#F7F7FC'} width={window.width / 10 * .6} height={window.width / 10 * .6}/>
                )}
                {props.icon === 'close' && (
                    <CloseButton stroke={'#FFF'} width={window.width / 10 * .3} height={window.width / 10 * .3}/>
                )}
            </View>
            {!!props.text && (
                <StyledText inputStyle={styles.addButtonText}>{props.text}</StyledText>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    addButton: {
        marginVertical: 15,
        alignItems: 'center'
    },
    addButtonIconWrapper: {
        backgroundColor: '#A0CAE8',
        borderRadius: 50,
        width: window.width / 10 * 1.1,
        height: window.width / 10 * 1.1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    addButtonText: {
        marginTop: 4,
        fontSize: 11,
        color: 'black'
    },
})

export default PageActionButton
