import {StyleSheet, Text, TouchableOpacity} from "react-native";
import React from 'react';
import moment from "moment";
const AppointmentChoose = (props) => {

    const getText = () => {
        const date = moment(props.currApp['date'].split('T', 1), "YYYY-MM-DD").format("DD-MMMM-YYYY").split('-');
        const time = props.currApp['date'].split('T', 2)[1].split('.', 1)[0].split(':');
        return(`${date[0]} ${date[1]} ${date[2]} om ${time[0]}:${time[1]}`);
    }

    const sendData = () => {
        props.pressAction(props.currApp);
    }

    return (
        <TouchableOpacity style={styles.view} onPress={sendData}>
            <Text>{getText()}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    view: {
        backgroundColor: '#F7F7FC',
        paddingLeft: 40,
        paddingRight: 40,
        paddingTop: 20,
        paddingBottom: 20,
        borderRadius: 10,
        marginBottom: 10
    },
});

export default AppointmentChoose;

