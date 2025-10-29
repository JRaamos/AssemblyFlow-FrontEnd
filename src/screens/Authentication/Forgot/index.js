import React from "react"; 

import { 
    FormTitle,
    FormText
} from './styled'
 
import Button from "components/Form/Button";

import ContainerUnauthenticated from "containers/Unauthenticated";

import Core from "components/Form/Core";
import useController from "./controller";

export default function Forgot(){ 
    
    const {
        formRef,
        formItems,
        loading,
        action,
        goBack
    } = useController()
 
    return ( 
        <>  
            <ContainerUnauthenticated> 
                <FormTitle>Esqueceu a senha?</FormTitle>
                <FormText>Informe seu email para recuperar a senha</FormText> 
                <Core ref={formRef} formItems={formItems} />
                <Button color="primary" loading={loading} onClick={action} >Recuperar</Button> 
                <Button color="primary" outline onClick={() => goBack()}>Voltar</Button>  
            </ContainerUnauthenticated> 
        </>
    );
}