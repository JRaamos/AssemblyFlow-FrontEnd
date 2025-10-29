import { useCallback, useContext, useMemo, useState, useEffect } from "react";
import { CoreContext } from "context/CoreContext";
import { Delete, Read } from "services/core";
import { exposeStrapiError, normalizeStrapiList } from "utils";

export default function useList({ table, adapter, populate, filters }){

    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])

    const { searchExpression } = useContext(CoreContext)

    const loadRegisters = useCallback(async () => {
         
        const pop = (populate || [
            // "profile.image"
        ]).map((m,k) => `populate[${k}]=${m}`)?.join("&")
        
        const fil = Object.entries((filters || {
            // "user": 1
        })).map(([key, value]) => `filters[${key}]=${value}`).join("&")

        const result = await Read(table, pop, fil)
        if(result && !exposeStrapiError(result)){
            const normalresult = normalizeStrapiList(result)
            setData(normalresult)
        }
    }, [table, populate, filters])

    const init = useCallback(async () => {
        setLoading(true)
        await loadRegisters()
        setLoading(false)
    }, [loadRegisters])

    const filterExpression = useCallback(item => {
        return ( !searchExpression || Object.keys(item).filter(k => `${ item[k] }`.toLowerCase().indexOf(searchExpression.toLowerCase()) !== -1 ).length > 0)
    }, [searchExpression])

    const remove = useCallback(async (item) => {
        setLoading(true)
        const result = await Delete(table, item?.id)
        if(!(result && !exposeStrapiError(result))){
            setLoading(false)
            return;
        }
        init()
    }, [init, table])

    useEffect(() => { 
        init() ;
    }, [ init ])

    const registers = useMemo(() => {
        return (data||[])?.filter(filterExpression)?.map(adapter ? adapter : m => ({
            ...m
        }))
    }, [data, adapter, filterExpression])

    return {
        loading,
        registers,
        remove
    }
}