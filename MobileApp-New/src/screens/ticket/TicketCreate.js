import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Dimensions,
    TouchableOpacity,
    TextInput,
    Text,
    Image,
    Alert,
    ActivityIndicator
} from 'react-native'
import React, {useEffect, useState} from 'react'
import StyledText from '../../components/StyledText'
import {Logo} from '../../resources'
import PageActionButton from '../../components/PageActionButton';
import BackArrow from '../../resources/icons/Back_Arrow.svg'
import * as ImagePicker from 'expo-image-picker';
import OptionsMenu from "react-native-option-menu";
import ApiHelper from "../../util/ApiHelper";
import * as ImageManipulator from 'expo-image-manipulator';
import CloseButtonComponent from "../../components/Buttons/CloseButton.Component";
import tr from '../../config/languages/translate';

const window = Dimensions.get('window')

const TicketCreate = (props) => {
    const [subject, onChangeSubject] = React.useState("")
    const [description, onChangeDescription] = React.useState("")
    const [images, setImages] = React.useState([]);

    const takePicture = async () => {
        let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Toegang tot uw camera is vereist.");
            return;
        }

        let pickerResult = await ImagePicker.launchCameraAsync();
        const result = await ImageManipulator.manipulateAsync(pickerResult['uri'], [], {compress: 0.1, format: ImageManipulator.SaveFormat.PNG, base64: true});
        setImages((images) => [...images, result]);
    };

    const choosePicture = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Wij hebben toegang nodig tot je camera rol.");
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        const result = await ImageManipulator.manipulateAsync(pickerResult['uri'], [], {compress: 0.1, format: ImageManipulator.SaveFormat.PNG, base64: true});
        setImages((images) => [...images, result]);
    };

    const afbeeldingKnop = (<PageActionButton icon={'plus'} text={tr.ticket.addPictures}/>);

    async function maakMelding() {
        const fd = new FormData();
        fd.append('title', subject);
        fd.append('description', description);
        fd.append('creator', '60a69daf408255502dd4a948');

        images.forEach((image, index) => {
            fd.append(`file${index+1}` , {
                name: image['uri'].split('ImageManipulator/')[1],
                type: 'image/png',
                uri: image['uri']
            })
        })

        await ApiHelper.post('/ticket', fd, {'content-type': 'multipart/form-data'}).then(res => {
            props.navigation.goBack();
        }).catch(error => {
            console.log(error);
            if (error.response.status === 413) {
                Alert.alert('Te veel data', 'Probeer minder afbeeldingen mee te sturen');
            }
        })
    }

    function removeImage(image) {
        const array = [...images]
        const index = array.indexOf(image);
        if (index !== -1) {
            array.splice(index, 1);
            setImages(array);
        }
    }

    return (
        <SafeAreaView style={styles.root}>
            <ScrollView>
                <View style={styles.tickets}>
                    <Logo style={styles.logo} width={window.width / 10 * 5} />
                    <View style={styles.row}>
                        <TouchableOpacity onPress={() => props.navigation.goBack()}>
                            <BackArrow style={styles.back}/>
                        </TouchableOpacity>
                        <StyledText inputStyle={styles.pageTitle} theme={'pageTitle'}>{tr.ticket.createTicket}</StyledText>
                    </View>

                    <Text style={styles.inputText}>{tr.ticket.subject}</Text>
                    <View style={styles.inputField}>
                        <TextInput style={styles.input} onChangeText={onChangeSubject} value={subject} placeholder={tr.ticket.placeholderSubject} />
                    </View>
                    <Text style={styles.inputText}>{tr.ticket.message}</Text>
                    <View style={styles.inputField}>
                        <TextInput style={styles.inputBeschrijving} multiline={true} onChangeText={onChangeDescription} value={description} placeholder={tr.ticket.placeholderMessage} />
                    </View>

                    <TouchableOpacity onPress={() => null}>
                        <OptionsMenu customButton={afbeeldingKnop} options={[`${tr.ticket.photo.makePhoto}`, `${tr.ticket.photo.choosePicture}`, `${tr.ticket.photo.cancel}`]} actions={[takePicture, choosePicture]}/>
                    </TouchableOpacity>

                    <View style={styles.images}>
                        {images.map(image => (
                            <TouchableOpacity key={image['uri'].split('ImageManipulator/')[1]} onPress={() => removeImage(image)}>
                                <Image style={{width: 100, height: 100, borderRadius: 15, marginLeft: 5, marginRight: 5, marginTop: 5, marginBottom: 5}} source={{uri: `data:image/png;base64,${image['base64']}`}} />
                                <CloseButtonComponent style={styles.circle}/>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <TouchableOpacity onPress={() => maakMelding()} style={styles.sendBtn}>
                        <StyledText inputStyle={styles.ticketBtnText}>
                            {tr.ticket.send}
                        </StyledText>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    images: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    circle: {
        position: 'absolute',
        right: 1,
        top: 1,
        marginTop: -5,
        marginRight: -5
    },
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
