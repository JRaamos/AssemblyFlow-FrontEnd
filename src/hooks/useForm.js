import { useContext, useState, useEffect, useRef, useCallback } from "react";
import { CoreContext } from "context/CoreContext";
import { Create, Delete, ReadOne, Update } from "services/core";
import { exposeStrapiError, normalizeStrapiRegister } from "utils";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";


export default function useForm({ table, adapter, populate, filters }){
    const n = useNavigate(); 
    const goBack = () => n(-1);

    const { id } = useParams()
    
    const formRef = useRef()

    const { user } = useContext(CoreContext)

    const [register, setRegister] = useState(null)
    const [loading, setLoading] = useState(false)

    const save = async () => {
        const form = formRef?.current?.getForm()
        if(!form) return;
        setLoading(true)
        const payload = {
            ...form,
            user: {
                set: [user?.documentId]
            }
        }

        delete payload?.id
        delete payload?.documentId
        delete payload?.createdAt
        delete payload?.updatedAt
        delete payload?.publishedAt

        const result = id ? await Update(table, { data:{ ...payload }}, id) : await Create(table, { data:{ ...payload }})
        if(result && !exposeStrapiError(result)){
            toast.success(id ? "Atualizado com sucesso" : "Criado com sucesso")
            goBack()
        }
        setLoading(false)
    }
 
    const remove = useCallback(async () => {
         setLoading(true)
         const result = await Delete(table, id)
         if(!(result && !exposeStrapiError(result))){
             setLoading(false)
             return;
         }
         goBack()
     }, [goBack, table])

    const init = useCallback(async () => {
        if(id){
            setLoading(true)

            const pop = (populate || [
                // "profile.image"
            ]).map((m,k) => `populate[${k}]=${m}`)?.join("&")
            
            const fil = Object.entries((filters || {
                // "user": 1
            })).map(([key, value]) => `filters[${key}]=${value}`).join("&")

            const result = await ReadOne(table, id, pop, fil)
            if(result && !exposeStrapiError(result)){
                const normalResult = normalizeStrapiRegister(result)
                setRegister(typeof adapter === 'function' ? adapter(normalResult) : { ...normalResult })
            }
            setLoading(false)
        }
    }, [id, table, adapter, populate, filters])

    useEffect(() => { init() ;}, [init])

    return {
        loading,
        register,
        formRef,
        save,
        remove
    }
}