import translations from '../languages/translations.json';
import { NativeModules, Platform, AsyncStorage } from "react-native";

const translate = async () => {
    let locale = ""
    const hasLang = await AsyncStorage.getItem('lang');

    if (hasLang != null){
        locale = hasLang;
    } else {
        if (Platform.OS === 'ios'){
            locale = NativeModules.SettingsManager.settings.AppleLocale.split('_', 1) || NativeModules.SettingsManager.settings.AppleLanguages[0].split('_', 1);
        } else {
            locale = NativeModules.I18nManager.localeIdentifier.split('_', 1);
        }
        locale = locale[0];
    }

    return translations[locale];
}

export default translate;
