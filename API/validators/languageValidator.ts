export function validateLanguage(language: string) {
    var regex = /[A-Z]/;
    return regex.test(language);
}