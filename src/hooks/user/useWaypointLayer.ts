import axios from 'axios'
import pubsub from 'pubsub-js'
import apiUrl from '../../config/api/apiUrl'
import createHeader from '../../utils/createHeader'

export default () => {
    axios.get(apiUrl.waypoint, {'headers': createHeader()}).then(res => {
        if (res.data.code !== 200) return
        //TODO 数据显示
        const waypoint: GeoJSON = {
            type: 'FeatureCollection',
            features: []
        }
        const airport: GeoJSON = {
            type: 'FeatureCollection',
            features: []
        }
        const vor: GeoJSON = {
            type: 'FeatureCollection',
            features: []
        }
        const ndb: GeoJSON = {
            type: 'FeatureCollection',
            features: []
        }
        for (let d of res.data.data){
            if (d.type === 'airport'){
                airport.features.push({
                    type: 'feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [d.longitude, d.latitude]
                    },
                    properties: {...d}
                })
            }else if (d.type === 'waypoint'){
                waypoint.features.push({
                    type: 'feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [d.longitude, d.latitude]
                    },
                    properties: {...d}
                })
            }else if (d.type === 'vor'){
                vor.features.push({
                    type: 'feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [d.longitude, d.latitude]
                    },
                    properties: {...d}
                })
            }else if (d.type === 'ndb'){
                ndb.features.push({
                    type: 'feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [d.longitude, d.latitude]
                    },
                    properties: {...d}
                })
            }else{
                waypoint.features.push({
                    type: 'feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [d.longitude, d.latitude]
                    },
                    properties: {...d}
                })
            }
        }
        return pubsub.publish('custom-waypoint-load',{
            waypoint, vor, ndb, airport
        })
    })
}