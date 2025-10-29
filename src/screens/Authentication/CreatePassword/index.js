import React from "react"; 

import { 
    FormTitle,
    FormText
} from './styled' 

import Button from "components/Form/Button";

import ContainerUnauthenticated from "containers/Unauthenticated";

import Core from "components/Form/Core";
import useController from "./controller";

export default function CreatePassword(){ 
    
    const {
        formRef,
        formItems,
        loading,
        action,
        navigate
    } = useController()
 
    return ( 
        <>  
            <ContainerUnauthenticated> 
                <FormTitle>Cria sua nova senha!</FormTitle>
                <FormText>Informe sua nova senha no campo abaixo</FormText> 
                <Core ref={formRef} formItems={formItems} />
                <Button color="primary" loading={loading} onClick={action}>Criar senha</Button> 
                <Button color="primary" outline onClick={() => navigate('login')}>Cancelar</Button> 
            </ContainerUnauthenticated> 
        </>
    );
}