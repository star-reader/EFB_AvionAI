import axios from "axios"
import apiUrl from "../../config/api/apiUrl"
import createHeader from "../../utils/createHeader"

export default (icao: string): Promise<string> => {
    return new Promise((res) => {
        axios.get(`${apiUrl.weather}?icao=${icao}`,{'headers': createHeader()}).then(r => {
            res(r.data.data.airport_info)
        }).catch(() => res(''))
    })
}