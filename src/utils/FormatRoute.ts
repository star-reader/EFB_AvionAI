import formatRouteStringCoordinates from "./formatRouteStringCoordinates"

export default (route: string) => {
    //匹配数字的正则表达式
    const num_reg = new RegExp("[0-9]")
    let data = route.replace(' SID ',' ').replace(' STAR ',' ').split(' ')
    for (let i = 0; i < data.length; i++){
        if (data[i] == ''){
            data.splice(i,1)
            i--
        }
        if (data[i] == ' '){
            data.splice(i,1)
            i--
        }
        if (data[i].split('/').length >= 2){
            data[i] = data[i].split('/')[0]
        }
        if (data[i].length > 5){
            if (num_reg.test(data[i])){
                continue
            }
            //30N130E
            try {
                let d = data[i]
                if (d.includes('N') && d.includes('E')){
                    let lat = parseFloat(d.split('N')[0])
                    let lng = parseFloat(d.split('N')[1].split('E')[0])
                    data[i] = formatRouteStringCoordinates(lat, lng)
                }else if (d.includes('N') && d.includes('W')){
                    let lat = parseFloat(d.split('N')[0])
                    let lng = 0 - parseFloat(d.split('N')[1].split('W')[0])
                    data[i] = formatRouteStringCoordinates(lat, lng)
                }else if (d.includes('S') && d.includes('E')){
                    let lat = 0 - parseFloat(d.split('S')[0])
                    let lng = parseFloat(d.split('S')[1].split('E')[0])
                    data[i] = formatRouteStringCoordinates(lat, lng)
                }else if (d.includes('S') && d.includes('W')){
                    let lat = 0 - parseFloat(d.split('S')[0])
                    let lng = 0 - parseFloat(d.split('S')[1].split('W')[0])
                    data[i] = formatRouteStringCoordinates(lat, lng)
                }
            } catch (error) {
                data.splice(i,1)
                i--
            }
            
        }
        if (data[i+1]){
            if (data[i] === 'DCT' && data[i + 1] === 'DCT'){
                data.splice(i,1)
                i--
            }
        }
    }
    //检测是否是起飞机场
    {if (data[0].length == 4 && !num_reg.test(data[0])){
        data.splice(0,1)
    }}
    //检测是否为落地机场
    let leng = data.length -1
    {if (data[leng].length == 4 && !num_reg.test(data[leng])){
        data.splice(leng,1)
    }}
    //检测是否为离场程序
    { let checkPoint = data[0].split('')
        if (num_reg.test(data[0]) && !num_reg.test(checkPoint[checkPoint.length-1])){
            data.splice(0,1)
        }}
    //检测是否为进场程序
    {let leng = data.length -1
    let checkPoint = data[leng].split('')
    if (num_reg.test(data[leng]) && !num_reg.test(checkPoint[checkPoint.length-1])){
        data.splice(leng,1)
    }}
    if (data[data.length -1] === 'DCT'){
        data.splice(data.length -1 ,1)
    }
    return data.join(' ')
}