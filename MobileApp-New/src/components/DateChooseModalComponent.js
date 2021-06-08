import useWindowDimensions from "react-native/Libraries/Utilities/useWindowDimensions";
import {Modal, StatusBar, View, StyleSheet, ScrollView, Text, Dimensions} from "react-native";
import React, {useState} from "react";
import Button from "./Button";
import AppointmentChoose from "./AppointmentChoose";
import StyledText from "./StyledText";

const DateChooseModalComponent = (props) => {
    React.useEffect(() => {
        setModalVisible(props.visible);
        if (props.modalInfo !== undefined){
            setDates(props.modalInfo);
        }
    }, [props.visible]);
    const [modalVisible, setModalVisible] = useState(false);
    const [dates, setDates] = useState('');
    const [selectedData, setSelectedData] = useState();

    function handleClose(data){
        props.onClose(false);
        setSelectedData(data);
        props.openDetailModal(data);
    }

    const renderAppointments = () => {
        const appointments = []
        for (let i = 0; i < props.modalInfo.length; i++) {
            const currentAppointment = props.modalInfo[i];
            appointments.push(
                <AppointmentChoose key={i} currApp={currentAppointment} pressAction={handleClose}/>
            )
        }
        return appointments
    }

    function showLoader() {
        return <Text>Er is niks te zien</Text>;
    }

    return (
        <Modal animationType="fade" transparent={true} statusBarTranslucent={true} deviceHeight={Platform.OS === "ios" ? useWindowDimensions().height : useWindowDimensions().height + StatusBar.currentHeight * 2} visible={modalVisible} onRequestClose={() => {setModalVisible(!modalVisible);}}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <StyledText theme={'pageTitle'}>Kies een afspraak</StyledText>
                    <View style={{height: Dimensions.get('window').height * .6, paddingTop: 10}}>
                        <ScrollView>
                            { (props.modalInfo)
                                ? renderAppointments()
                                : showLoader()
                            }
                        </ScrollView>
                    </View>

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

export default DateChooseModalComponent;
