import React from "react"; 

import { 
    FormTitle,
    FormText,
    RegisterCall
} from './styled'

import Button from "components/Form/Button";

import ContainerUnauthenticated from "containers/Unauthenticated";

import Core from "components/Form/Core";
import useController from "./controller";

export default function Register(){ 

    const {
        formRef,
        formItems,
        loading,
        action,
        navigate
    } = useController()
 
    return ( 
        <>  
            <ContainerUnauthenticated keep>
                <FormTitle>Novo por aqui?</FormTitle>
                <FormText>Cadastre-se grátis :)</FormText>
                <Core ref={formRef} formItems={formItems} />
                <Button color="primary" loading={loading} onClick={action}>Criar conta</Button>
                <RegisterCall> Já possui uma conta? </RegisterCall>
                <Button color="primary" outline onClick={() => navigate('login')}>Faça o login</Button> 
            </ContainerUnauthenticated> 
        </>
    );
}