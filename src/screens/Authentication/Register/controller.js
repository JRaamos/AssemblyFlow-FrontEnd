import { useContext, useRef, useState } from "react"; 
import { useNavigate } from 'react-router-dom'; 
import { toast } from 'react-toastify';

import { DoLogin, DoRegister } from "services/authentication";
import { exposeStrapiError } from "utils"; 
import { UpdateMe } from "services/me";
import { CoreContext } from "context/CoreContext";

export default function useController(){ 

    const n = useNavigate();
    const navigate = to => n(`/${ to }`); 

    const [ loading, setLoading ] = useState(false) 
    const { reloadMe } = useContext(CoreContext)

    const formRef = useRef()
    const formItems = [
        { ref:"name", placeholder:"Nome", required:true, full:true },
        { ref:"email", placeholder:"E-mail", required:true, full:true },
        { ref:"password", placeholder:"Senha", type:"password", required:true, full:true },
    ]

    const action = async () => {
        const form = formRef?.current?.getForm()
        if(!form || loading){ return ;}
        setLoading(true)
        
        const payload = {
            username: form.email?.replace(/ /g,''),
            email: form.email?.replace(/ /g,''),
            password: form.password
        }

        const result = await DoRegister(payload)  
        
        if(result && !exposeStrapiError(result)){
            await makeAuth(payload)

            const datapayload = {
                name: form?.name
            }

            await UpdateMe(datapayload)

            afterLogin()
        } 
        setLoading(false)
    }

    const makeAuth = async (payload) => {
        const result = await DoLogin({ ...payload, identifier: payload?.email })
        if(result && !exposeStrapiError(result)){
            await reloadMe()
        } 
    }

    const afterLogin = () => {
        toast.success('Conta criada com sucesso'); 
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