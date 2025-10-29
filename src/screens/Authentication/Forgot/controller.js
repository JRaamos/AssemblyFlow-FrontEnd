import { useRef, useState } from "react"; 
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { DoForgotPassword } from "services/authentication";
import { exposeStrapiError } from "utils";

export default function useController(){ 
    const n = useNavigate();
    const navigate = to => n(`/${ to }`); 
    const goBack = () => n(-1);
    
    const [ loading, setLoading ] = useState(false) 

    const formRef = useRef()
    const formItems = [
        { ref:"email", placeholder:"E-mail", required:true, full:true },
    ]

    const action = async () => {
        const form = formRef?.current?.getForm()
        if(!form || loading){ return ;}
        setLoading(true)
        
        const result = await DoForgotPassword({ email: form?.email?.replace(/ /g,'') })   
        
        if(result && !exposeStrapiError(result)){
            completNext()
        } 
        
        setLoading(false)
    }

    const completNext = () => {
        toast.success('Instruções para recuperar senha foram enviadas ao seu email'); 
        navigate('login')
    } 

    return {
        formRef,
        formItems,
        loading,
        action,
        goBack
    }

}