import useWindowDimensions from "react-native/Libraries/Utilities/useWindowDimensions";
import {Modal, StatusBar, View, StyleSheet} from "react-native";
import React, {useState} from "react";
import StyledText from "./StyledText";
import moment from "moment";
import Button from "./Button";

const DateDetailModalComponent = (props) => {
    React.useEffect(() => {
        setModalInfo(props.modalInfo);
        setModalVisible(props.visible);
    }, [props.visible]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalInfo, setModalInfo] = useState();

    const getText = () => {
        if (modalInfo !== undefined || modalInfo !== ''){
            const date = moment(modalInfo['date'].split('T', 1), "YYYY-MM-DD").format("DD-MMMM-YYYY").split('-');
            const time = modalInfo['date'].split('T', 2)[1].split('.', 1)[0].split(':');
            return(`${date[0]} ${date[1]} ${date[2]} om ${time[0]}:${time[1]}`);
        } else {
            return 'geen data';
        }
    }

    function handleClose(){
        props.onClose();
    }

    return (
        <Modal animationType="fade" transparent={true} statusBarTranslucent={true} deviceHeight={Platform.OS === "ios" ? useWindowDimensions().height : useWindowDimensions().height + StatusBar.currentHeight * 2} visible={modalVisible} onRequestClose={() => {setModalVisible(!modalVisible);}}>
            <View style={styles.centeredView}>
                {(modalInfo !== undefined) ?
                <View style={styles.modalView}>
                    <StyledText theme={'pageTitle'}>Afspraak</StyledText>
                    <StyledText inputStyle={styles.informatie}>{modalInfo.title}</StyledText>
                    <StyledText inputStyle={styles.informatie}>{getText()}</StyledText>
                    <StyledText inputStyle={{color: '#6E7191', fontSize: 13, marginBottom: 10}}>{modalInfo.description}</StyledText>
                    <Button pressAction={handleClose}>Sluiten</Button>
                </View>: null
                }
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

export default DateDetailModalComponent;
