import translations from '../languages/translations.json'
import { NativeModules, Platform, AsyncStorage } from 'react-native'

let language

const translate = async () => {
    if (!language) {
        language = await AsyncStorage.getItem('lang')
    }

    return translations[language ? language : fetchSystemLocale]
}

const fetchSystemLocale = () => {
    return Platform.OS === 'ios'
        ? (NativeModules.SettingsManager.settings.AppleLocale.split('_', 1) || NativeModules.SettingsManager.settings.AppleLanguages[0].split('_', 1))[0]
        : (NativeModules.I18nManager.localeIdentifier.split('_', 1))[0]
}

export default translate

