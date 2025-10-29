import { useContext, useEffect, useRef, useState } from "react";  

import { CoreContext } from "context/CoreContext";

import { parseStrapiImage } from "utils";

import { ReadMe, RemoveMe, UpdateMe } from "services/me";
import { toast } from 'react-toastify';
import { DoLogout } from "services/authentication";
import { useNavigate } from "react-router-dom";

export default function useController(){  
    const n = useNavigate();
    const navigate = to => n(`/${ to }`); 

    const { user, setUser } = useContext(CoreContext)
   
    const [preview, setPreview] = useState(user?.image?.url ? parseStrapiImage(user?.image?.url) : null)
    const [loading, setLoading] = useState(false)
    const [fetching, setFetching] = useState(false)

    const formRef = useRef()
    const formItems = [
        { ref:"name", placeholder:"Nome", disabled:true, full:true },
        { ref:"email", placeholder:"Email", disabled:true, full:true },
    ]

    const exit = async () => {  
        await DoLogout() 
        navigate('login');
    }  

    const takePic = async (result) => { 
        setFetching(true)  
        console.log(result)
        if(result?.id){
            await UpdateMe({ image: result.id })
            setPreview( parseStrapiImage(result?.url) )
        } 
        setFetching(false) 
    }

    const init = async () => {
        setLoading(true)
        const result = await ReadMe()
        if(result?.id){
            setUser(result)
            if(result?.image?.url){ setPreview(parseStrapiImage(result?.image?.url)); }
        }
        setLoading(false)
    }

    const removeAccount = async () => {
        setLoading(true)
        await RemoveMe();
        toast.error('Conta excluida com sucesso')
        exit();
        setLoading(false)
    }

    useEffect(() => {
        init()
    },[])

    return {
        preview,
        setPreview,
        takePic,
        fetching,
        user,
        formRef,
        formItems,
        removeAccount,
        loading
    }
    
}