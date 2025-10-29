
export const parseCurrency = (value) => {
    let values = `${(parseFloat(value)||0).toFixed(2)}`.split('.')
    return `R$ ${`${values[0]}`.replace(/(\d)(?=(\d{3})+(?!\d))/g, `$1.`)},${values[1]}`
}  

export const parseCurrencyMoney = (value) => {
    let values = `${(parseFloat(value)||0).toFixed(2)}`.split('.')
    return `${`${values[0]}`.replace(/(\d)(?=(\d{3})+(?!\d))/g, `$1.`)},${values[1]}`.split(',')[0]
}

export const parseCurrencyCents = (value) => {
    let values = `${(parseFloat(value)||0).toFixed(2)}`.split('.')
    return values[1]
}
 
export const parseDatestringBRUS = datestring => {
    const ds = `${ datestring }`?.split('/')
    return `${ ds[2] }-${ ds[1] }-${ ds[0] }`
}

export const parseDatestringUSBR = datestring => {
    const ds = `${ datestring }`?.split('T')?.[0]?.split('-')
    return `${ ds[2] }/${ ds[1] }/${ ds[0] }`
}