
export const filterExpression = item => {
    return ( !searchExpression || Object.keys(item).filter(k => `${ item[k] }`.toLowerCase().indexOf(searchExpression.toLowerCase()) !== -1 ).length > 0)
}