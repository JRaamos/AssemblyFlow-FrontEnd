import { useContext, useRef, useState } from "react"; 
import { useNavigate } from 'react-router-dom';

import { CoreContext } from "context/CoreContext";
import { DoLogin } from "services/authentication";
import { exposeStrapiError } from "utils";

export default function useController(){ 
    const n = useNavigate();
    const navigate = to => n(`/${ to }`); 

    const [ loading, setLoading ] = useState(false)
    const { reloadMe } = useContext(CoreContext)

    const formRef = useRef()
    const formItems = [
        { ref:"identifier", placeholder:"E-mail", required:true, full:true },
        { ref:"password", placeholder:"Senha", type:"password", required:true, full:true },
    ]

    const login = async () => {
        const form = formRef?.current?.getForm()
        if(!form || loading){ return ;}
        setLoading(true)
        const result = await DoLogin({ ...form, identifier: form.identifier?.replace(/ /g,'') })  
        if(result && !exposeStrapiError(result)){
            await reloadMe()
            completeLogin()
        } 
        setLoading(false)
    }

    const completeLogin = () => {
        navigate('dashboard')
    }  

    return {
        formRef,
        formItems,
        navigate,
        loading,
        login
    }

}