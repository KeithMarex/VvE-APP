import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";

export const takeCameraImage = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
        alert("Toegang tot uw camera is vereist.");
        return;
    }

    let pickerResult = await ImagePicker.launchCameraAsync();

    return pickerResult.cancelled
        ? null
        : await ImageManipulator.manipulateAsync(
            pickerResult['uri'],
            [],
            {
                compress: .7,
                format: ImageManipulator.SaveFormat.JPEG,
                base64: true
            })
}

export const pickGalleryImage = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
        alert("Wij hebben toegang nodig tot je camera rol.");
        return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    return pickerResult.cancelled
        ? null
        : await ImageManipulator.manipulateAsync(pickerResult['uri'], [], {
            compress: .7,
            format: ImageManipulator.SaveFormat.JPEG,
            base64: true
        })
}
