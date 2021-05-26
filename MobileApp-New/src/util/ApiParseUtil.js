const ticketStatus = {
    PENDING: {
        'nl': 'In afwachting',
        'en': 'Pending',
    },
    HANDLING: {
        'nl': 'In afhandeling',
        'en': 'Handling',
    },
    HANDLED: {
        'nl': 'Afgehandeld',
        'en': 'Handled',
    }
}

export const parseTicketStatus = (inputStatus, language) => {
    if (!inputStatus) return '?'
    return ticketStatus[inputStatus][language]
}
