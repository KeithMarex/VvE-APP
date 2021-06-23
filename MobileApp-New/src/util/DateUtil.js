import moment from 'moment'
import { enGb } from 'moment/locale/en-gb'
import { nl } from 'moment/locale/nl'

/**
 * If you want to add a locale,
 * import it from moment and add it accordingly
 */
export const initDateParser = (locale) => {
    switch (locale) {
        case 'en':
            moment.updateLocale('en-gb', [enGb])
            break
        case 'nl':
            moment.updateLocale('nl', [nl])
            break
        default:
            moment.updateLocale('en-gb', [enGb])
            break
    }
}

export const parseDateWithTime = (dateInput) => {
    return moment(dateInput).format('LLL')
}

export const parseDateWithoutTime = (dateInput) => {
    return moment(dateInput).format('LL')
}
