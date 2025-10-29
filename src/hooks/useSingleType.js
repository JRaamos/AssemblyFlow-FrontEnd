import { useContext, useState, useEffect, useCallback } from "react";
import { CoreContext } from "context/CoreContext";
import { Read } from "services/core";
import { exposeStrapiError, normalizeStrapiRegister } from "utils";

export default function useSingleType({ table, adapter, populate, filters }){
    const { user } = useContext(CoreContext)

    const [register, setRegister] = useState(null)
    const [loading, setLoading] = useState(false)
    
    const init = useCallback(async () => {
        setLoading(true)

        const pop = (populate || [
            // "profile.image"
        ]).map((m,k) => `populate[${k}]=${m}`)?.join("&")
        
        const fil = Object.entries((filters || {
            // "user": 1
        })).map(([key, value]) => `filters[${key}]=${value}`).join("&")

        const result = await Read(table, pop, fil)
        if(result && !exposeStrapiError(result)){
            const normalResult = normalizeStrapiRegister(result)
            setRegister( typeof adapter === 'function' ? adapter(normalResult) : { ...normalResult })
        }
        setLoading(false)
    }, [table, adapter])

    useEffect(() => { init() ;}, [user, init])

    return {
        loading,
        register
    }
}