import { useRef, useState } from "react"; 
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { DoResetPassword } from "services/authentication.js";
import { exposeStrapiError } from "utils";

export default function useController(){ 
    const n = useNavigate();
    const navigate = to => n(`/${ to }`); 

    const params = new URLSearchParams(window.location.search)
    const [ loading, setLoading ] = useState(false) 
        
    const formRef = useRef()
    const formItems = [
        { ref:"password", placeholder:"Nova Senha", type:"password", required:true, full:true },
        { ref:"cpassword", placeholder:"Confirmar nova Senha", type:"password", required:true, full:true },
    ]

    const valid = (formdata) => {  

        if( formdata?.password !== formdata?.cpassword){ 
            toast.error('Nova senha e confirmação da nova senha não são iguais') ;
            return false; 
        } 

        return true
    }

    const action = async () => {
        const form = formRef?.current?.getForm()
        if(!form || !valid(form) || loading){ return ;}
        setLoading(true)
        
        const result =  await DoResetPassword({
            code: params.get('code'),
            password: form?.password,
            passwordConfirmation: form?.cpassword
        })   
        
        if(result && !exposeStrapiError(result)){
            completNext()
        } 
        
        setLoading(false)
    }

    const completNext = () => {
        toast.success('Senha criada com sucesso'); 
        navigate('login')
    } 
 
    return {
        formRef,
        formItems,
        loading,
        action,
        navigate
    }

}