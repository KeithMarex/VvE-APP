export function validateName(name: string) {
    var regex = /[A-Z a-z '",-_`]/;
    return regex.test(name);
}