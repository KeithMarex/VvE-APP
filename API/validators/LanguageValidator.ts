export function validateLanguage(language: string) {
    var regex = /[A-Za-z]/;
    return regex.test(language);
}