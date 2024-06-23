import formatLocation from '../LocationFormat'

export default (type: 'airport' | 'navaid' | 'waypoint', data: any) => {
    switch (type) {
        case 'airport':
            {const d: QueryAirport = data
            const result = [
                {'key': 'Type', 'value': 'Airport'},
                {'key': 'ICAO', 'value': d.icao},
                {'key': 'Name', 'value': d.name},
                {'key': 'Location', 'value': formatLocation(d.location.latitude, d.location.longtitude)},
                {'key': 'Elevation', 'value': `${d.elevation}ft/${(d.elevation * 0.3048).toFixed()}m`},
                {'key': 'TA','value': `${d.transition_altitude}ft`},
                {'key': 'TL','value': `${d.transition_level}}ft`},
                {'key': 'Speed Limit','value': `${d.speed_limit}}knots`},
                {'key': 'Limit Height', 'value': `${d.speed_limit_altitude}ft`}
            ]
            return result}
        case 'navaid':
            {const d: QueryNavaid = data
            const result = [
                {key: 'Type', value: d.type},
                {key: 'Name', value: d.name},
                {key: 'Ident', value: d.ident},
                {key: 'Location', value: formatLocation(d.location.latitude, d.location.longtitude)}
            ]
            if (d.elevation){
                result.push(
                    {key: 'Elevation', value: `${d.elevation}ft/${(d.elevation * 0.3048).toFixed()}m`}
                )
            }
            if (d.magnetic_var){
                result.push(
                    {key: 'Magnitic Var', value: d.magnetic_var > 0 ? `${d.magnetic_var}°E` : `${d.magnetic_var}°W`}
                )
            }
            if (d.range){
                result.push(
                    {key: 'Range', value: d.range.toString()}
                )
            }
            return result}
        case 'waypoint':
            const d: QueryWaypoint = data
            const result = [
                {key: 'Type', value: 'Waypoint'},
                {key: 'Ident', value: d.ident},
                {key: 'Location', value: formatLocation(d.location.latitude, d.location.longtitude)},
            ]
            return result
    
        default:
            break;
    }
}
