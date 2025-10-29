import React from "react"; 

import { 
    FormTitle,
    FormText,
    FormSpacer,
    RegisterForgot,
    ForgotLink,
    RegisterCall
} from './styled' 

import Button from "components/Form/Button";

import ContainerUnauthenticated from "containers/Unauthenticated";

import Core from "components/Form/Core";
import useController from "./controller";

export default function Login(){ 
    
    const {
        formRef,
        formItems,
        navigate,
        loading,
        login
    } = useController()
 
    return ( 
        <>  
            <ContainerUnauthenticated> 
                <FormTitle>Bem-vindo de volta!</FormTitle>
                <FormText>Entre com seus dados do cadastro para acessar sua conta</FormText> 
                <Core ref={formRef} formItems={formItems} />
                <RegisterForgot>
                    Esqueceu a senha?
                    <ForgotLink onClick={() => navigate('forgot')}>Recupere sua senha</ForgotLink>
                </RegisterForgot> 
                <FormSpacer /> 
                <Button color="primary" loading={loading} onClick={login}>Entrar</Button>
                <RegisterCall> Ainda não tem conta? </RegisterCall>
                <Button color="primary" outline onClick={() => navigate('register')}>Criar uma conta</Button> 
            </ContainerUnauthenticated> 
        </>
    );
}