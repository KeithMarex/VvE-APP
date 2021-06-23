import {StyleSheet, View, TouchableOpacity} from "react-native";
import StyledText from "./StyledText";
import React from "react";
import ApiHelper from "../util/ApiHelper";
import download from "downloadjs";

const NewsLine = (props) => {
    const openFile = () => {
        ApiHelper.get(`/organization/file/${props.file._id}`, {headers: {'Content-Type': 'application/pdf'}, timeout: 1000}).then((val) => {
        })
    }

    return (
        <View style={styles.infoOrganizationFile}>
            <TouchableOpacity onPress={() => openFile()}>
                <StyledText inputStyle={styles.infoOrganizationFileName}>{props.file?._filename}</StyledText>
            </TouchableOpacity>
            <StyledText inputStyle={styles.infoOrganizationFileSize}>({props.file?._filesize})</StyledText>
        </View>
    )
}

const styles = StyleSheet.create({
    infoOrganizationFile: {
        paddingBottom: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    infoOrganizationFileName: {
        color: '#6E7191',
        fontSize: 16,
        textDecorationLine: 'underline'
    },
    infoOrganizationFileSize: {
        marginLeft: 6,
        fontSize: 16,
        color: '#A0CAE8',
    }
})

export default NewsLine;
