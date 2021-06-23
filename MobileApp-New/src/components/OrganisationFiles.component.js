import {ActivityIndicator, StyleSheet, View} from 'react-native'
import StyledText from './StyledText'
import React, { useEffect, useState } from 'react'
import ApiHelper from '../util/ApiHelper'
import fileModel from '../models/file.model'
import NewsLine from './NewsLine.component'

const OrganisationFilesComponent = () => {
    const [files, setFiles] = useState([])
    const [isFectchingData, setIsFecthingData] = useState(true)

    useEffect(() => {
        if (isFectchingData) {
            ApiHelper.get('/organization/file').then((val) => {
                val.data.forEach((file) => {
                    setFiles((files) => [...files, new fileModel(file._id, file.filename, file.type, humanFileSize(file.filesize, true))])
                })
            })
            setIsFecthingData(false)
        }
    })

    const humanFileSize = (bytes, si = false, dp = 1) => {
        const thresh = si ? 1000 : 1024

        if (Math.abs(bytes) < thresh) {
            return bytes + ' B'
        }

        const units = si
            ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
            : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']
        let u = -1
        const r = 10**dp

        do {
            bytes /= thresh
            ++u
        } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1)

        return bytes.toFixed(dp) + ' ' + units[u]
    }

    const createLoadingSpinner = () => {
        return <ActivityIndicator style={styles.loadingSpinner} size={'large'} color='#451864'/>
    }

    const createFilesList = () => {
        const fileList = []

        for (let i = 0; i < files.length; i++) {
            fileList.push(
                <NewsLine file={files[i]} key={i}/>
            )
        }

        return fileList
    }

    return (
        <View>
            <View style={styles.infoOrganization}>
                <StyledText inputStyle={styles.infoOrganizationName}>De Nieuwe Wereld</StyledText>
                <View style={styles.infoOrganizationFiles}>
                    {!isFectchingData
                        ? (createFilesList())
                        : (createLoadingSpinner())
                    }
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    infoOrganization: {
        marginTop: 12
    },
    infoOrganizationName: {
        fontSize: 16
    },
    infoOrganizationFiles: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
})
export default OrganisationFilesComponent

