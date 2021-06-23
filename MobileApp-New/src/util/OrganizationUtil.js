import { AsyncStorage } from 'react-native'
import ApiHelper from './ApiHelper'

let organization

export const initOrg = async () => {
    await fetchOrganization()
}

export const getOrgColors = async () => {
    if (!organization)
        await fetchOrganization()
    return organization.Theme
}

export const getOrgLogo = async () => {
    if (!organization)
        await fetchOrganization()
    return organization.logo.image_url
}

export const getOrgName = async () => {
    if (!organization)
        await fetchOrganization()
    return organization.name
}

const fetchOrganization = async () => {
    await ApiHelper.get('/organization')
        .then(async (fetchedOrganization) => {
            await AsyncStorage.setItem('organization', JSON.stringify(fetchedOrganization.data))
            organization = fetchedOrganization.data
        })
}
