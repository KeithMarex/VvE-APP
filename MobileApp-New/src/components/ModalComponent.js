import useWindowDimensions from "react-native/Libraries/Utilities/useWindowDimensions";
import {Modal, Pressable, StatusBar, Text, View, StyleSheet} from "react-native";
import React, {useState} from "react";
import StyledText from "./StyledText";
import moment from "moment";
import Button from "./Button";

const ModalComponent = (props) => {
    React.useEffect(() => { setModalVisible(props.visible);
        if (props.modalInfo !== undefined){
            setDate(props.modalInfo['dateString']);
        }
    }, [props.visible]);
    const [modalVisible, setModalVisible] = useState(false);
    const [date, setDate] = useState('');

    function handleClose(){
        props.onClose(false);
    }

    return (
        <Modal animationType="fade" transparent={true} statusBarTranslucent={true} deviceHeight={Platform.OS === "ios" ? useWindowDimensions().height : useWindowDimensions().height + StatusBar.currentHeight * 2} visible={modalVisible} onRequestClose={() => {setModalVisible(!modalVisible);}}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <StyledText theme={'pageTitle'}>Afspraak</StyledText>
                    <StyledText inputStyle={styles.informatie}>{moment(date, "YYYY-MM-DD").format("DD-MMMM-YYYY")} </StyledText>
                    <StyledText inputStyle={{color: '#6E7191', fontSize: 13, marginBottom: 10}}>Lorem ipsum soler dol er set amt</StyledText>
                    <Button pressAction={handleClose}>Sluiten</Button>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    informatie: {
        color: '#14142B',
        fontSize: 13,
        marginBottom: 10,
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

export default ModalComponent;
