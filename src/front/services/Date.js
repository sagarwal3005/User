const fullMonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
class DateService {
    static convertUTC = (date = '') => {
        const adaptedDate = new Date(date);
        const day = DateService.addZero(adaptedDate.getUTCDay());
        const month = fullMonth[adaptedDate.getUTCMonth()]
        const hour = DateService.addZero(adaptedDate.getUTCHours());
        const minute = DateService.addZero(adaptedDate.getUTCMinutes());
        const year = DateService.addZero(adaptedDate.getUTCFullYear());

        return { month, day, year, hour, minute }
    }
    static addZero(date) {
        return date < 10 ? `0${date}` : date;
    }
    static postDate = date => {
        const dateStructure = DateService.convertUTC(date)
        return dateStructure.day + '-' + dateStructure.month + '-' + dateStructure.year
    }
}
export default DateService