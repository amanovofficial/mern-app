import moment from "moment";
const toStandartDate = (date) => {
    return moment(date).utcOffset(5).format('DD.MM.YYYY  HH:mm')
}
export default toStandartDate