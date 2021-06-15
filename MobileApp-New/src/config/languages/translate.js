import translations from '../languages/translations.json';
import { NativeModules, Platform } from "react-native";

let locale = "";

if (Platform.OS === 'ios'){
    locale = NativeModules.SettingsManager.settings.AppleLocale.split('_', 1) || NativeModules.SettingsManager.settings.AppleLanguages[0].split('_', 1);
} else {
    locale = NativeModules.I18nManager.localeIdentifier.split('_', 1);
}

export default translations[locale];
