import moment from 'moment'
import { fr } from 'moment/locale/fr'
import { nl } from 'moment/locale/nl'

export const initDateParser = (language) => {
    moment.updateLocale('nl', [nl])
}

export const parseDate = (dateInput) => {
    return moment(dateInput).format('LLL')
}
