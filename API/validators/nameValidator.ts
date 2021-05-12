export function validateName(name: string) {
    var regex = /[A-Z a-z \s'",-_`]/;
    return regex.test(name);
}