export function validateEndDate(endDate : Date)
{
    if(endDate == null) // Default Value
        return true
    else
        return this.date <= endDate;
}