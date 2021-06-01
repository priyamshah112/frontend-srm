import * as moment from 'moment'

export const calculateDate1 =  (item) =>{
    return moment(item).format('DD/MM/YY')
}
export const  calculateDate2 =  (item) =>{
    return moment(item).format('DD MMM YY')
}
export const calculateDate3 =  (item) =>{
    return moment(item).format('DD/MM/YY hh:mm A')
}

export const trimTitle = (item) =>{
    if(item.length > 35){
        return item.slice(0,30) + '...'
    }
    return item
}
