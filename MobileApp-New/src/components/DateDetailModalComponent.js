import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions'
import {Modal, StatusBar, View, StyleSheet} from 'react-native'
import React, {useState} from 'react'
import StyledText from './StyledText'
import Button from './Button'
import tra from '../config/languages/translate'
import { parseDateWithTime } from '../util/DateUtil'

const DateDetailModalComponent = (props) => {
    React.useEffect(() => {
        setModalInfo(props.modalInfo)
        setModalVisible(props.visible)
    }, [props.visible])
    const [modalVisible, setModalVisible] = useState(false)
    const [modalInfo, setModalInfo] = useState()
    const [tr, setTr] = React.useState({})

    tra().then(res => {
        setTr(res)
    })

    const getText = () => {
        return modalInfo ? parseDateWithTime(modalInfo.date) : 'Geen datum'
    }

    function handleClose(){
        props.onClose()
    }

    return (
        <Modal animationType="fade" transparent={true} statusBarTranslucent={true}
               deviceHeight={Platform.OS === "ios"
                   ? useWindowDimensions().height
                   : useWindowDimensions().height + StatusBar.currentHeight * 2} visible={modalVisible} onRequestClose={() => {setModalVisible(!modalVisible)}}
        >
            <View style={styles.centeredView}>
                {(modalInfo !== undefined) ?
                <View style={styles.modalView}>
                    <StyledText theme={'pageTitle'}>
                        {modalInfo.title}
                    </StyledText>
                    <StyledText inputStyle={styles.information}>
                        { getText() }
                    </StyledText>
                    <StyledText inputStyle={styles.description}>
                        { modalInfo.description }
                    </StyledText>
                    <Button pressAction={handleClose}>
                        {tr.agenda?.close}
                    </Button>
                </View>: null
                }
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    information: {
        color: '#14142B',
        fontSize: 13,
    },
    description: {
        color: '#6E7191',
        fontSize: 13,
        marginVertical: 25
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#000000aa',
    },
    modalView: {
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
})

export default DateDetailModalComponent
