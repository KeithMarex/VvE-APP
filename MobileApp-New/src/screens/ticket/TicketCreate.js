import {SafeAreaView, StyleSheet, ScrollView, View, Dimensions, TouchableOpacity, TextInput, Text} from 'react-native'
import React from 'react'
import StyledText from '../../components/StyledText'
import {Logo} from '../../resources'
import PageActionButton from "../../components/PageActionButton";
import BackArrow from '../../resources/icons/Back_Arrow.svg'
import * as ImagePicker from 'expo-image-picker';
import OptionsMenu from "react-native-option-menu";


const window = Dimensions.get('window')

const TicketCreate = (props) => {
    const [subject, onChangeSubject] = React.useState("")
    const [description, onChangeDescription] = React.useState("")

    const takePicture = () => {
        // launchCamera({mediaType: "photo", cameraType: "back", includeBase64: true}, (callback) => {
        //     console.log('hoi');
        // });

        
    };

    const choosePicture = () => {
        // launchImageLibrary({mediaType: "photo", includeBase64: true}, (callback) => {
        //     console.log(callback);
        // })
    };

    const afbeeldingKnop = (<PageActionButton icon={'plus'} text={'Afbeelding toevoegen'}/>);

    return (
        <SafeAreaView style={styles.root}>
            <ScrollView>
                <View style={styles.tickets}>
                    <Logo style={styles.logo} width={window.width / 10 * 5} />
                    <View style={styles.row}>
                        <TouchableOpacity onPress={() => props.navigation.goBack()}>
                            <BackArrow style={styles.back}/>
                        </TouchableOpacity>
                        <StyledText inputStyle={styles.pageTitle} theme={'pageTitle'}>Melding aanmaken</StyledText>
                    </View>

                    <Text style={styles.inputText}>Onderwerp</Text>
                    <View style={styles.inputField}>
                        <TextInput style={styles.input} onChangeText={onChangeSubject} value={subject} placeholder="Onderwerp van melding" />
                    </View>
                    <Text style={styles.inputText}>Bericht</Text>
                    <View style={styles.inputField}>
                        <TextInput style={styles.inputBeschrijving} multiline={true} onChangeText={onChangeDescription} value={description} placeholder="Beschrijving van de melding" />
                    </View>

                    <TouchableOpacity onPress={() => null}>
                        <OptionsMenu customButton={afbeeldingKnop} options={["Maak een foto", "Kies een foto", "Annuleren"]} actions={[takePicture, choosePicture]}/>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => null} style={styles.sendBtn}>
                        <StyledText inputStyle={styles.ticketBtnText}>
                            Versturen
                        </StyledText>
                    </TouchableOpacity>



                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    root: {
        backgroundColor: '#F7F7FC',
        height: '100%',
    },
    sendBtn: {
        backgroundColor: '#A0CAE8',
        borderRadius: 20,
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginTop: 20,
        marginLeft: Dimensions.get('window').width / 2
    },
    ticketBtnText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold'
    },
    tickets: {
        alignItems: 'center',
        flex: 1,
        padding: 30,
        paddingBottom: 30
    },
    logo: {
        marginBottom: 10
    },
    pageTitle: {
        marginBottom: window.height / 40,
        width: Dimensions.get('window').width / 2
    },
    input: {
        flex: 1,
        height: Dimensions.get('window').height / 30 * 2,
        borderRadius: 10,
        paddingLeft: 10,
        paddingRight: 10
    },
    inputBeschrijving: {
        flex: 1,
        height: Dimensions.get('window').height / 5,
        borderRadius: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        textAlignVertical: "top",
    },
    inputField: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EFF0F7',
        borderRadius: 10,
        marginBottom: Dimensions.get('window').height / 30 * 1,
        width: Dimensions.get('window').width / 10 * 7,
    },
    inputText: {
        marginBottom: 5,
        width: Dimensions.get('window').width,
        marginLeft: Dimensions.get('window').width / 3
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        width: Dimensions.get('window').width * 0.9,
        marginLeft: 30,
        marginRight: 30,
    },
    back: {
        marginTop: Dimensions.get('window').height / 30,
        marginRight: Dimensions.get('window').width / 7
    }

})

export default TicketCreate;
