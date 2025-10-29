import React from "react";  

import {  
    DashboardText,
    DashboardButton,
    DarboardUserImage,
    DarboardUserImageAction,
    DarboardUserImageActionIcon
} from "./styled";

import ContainerAuthenticated from "containers/Authenticated";
import { Row, Col } from "reactstrap";

import moment from 'moment';
import 'moment/locale/pt-br';

import Button from "components/Form/Button";

import UploadFile from "components/Form/UploadFile";

import { Load } from "ui/styled";
import Core from "components/Form/Core";
import useController from "./controller";

export default function DashboardMe(){  
    
    const {
        preview,
        setPreview,
        takePic,
        fetching,
        user,
        formRef,
        formItems,
        removeAccount,
        loading
    } = useController()

    return ( 
        <>
            <ContainerAuthenticated> 
                <Row>
                    <Col></Col>
                    <Col sm={12} md={4}>
                        <DarboardUserImage image={preview ? preview : '/images/no-user.png'}>
                            <UploadFile onChange={takePic} onPreview={setPreview}>
                                { fetching ? <Load /> : null }
                                <DarboardUserImageAction>
                                    <DarboardUserImageActionIcon />
                                </DarboardUserImageAction>
                            </UploadFile>
                        </DarboardUserImage>
                        
                        <Core register={user} ref={formRef} formItems={formItems} />
                        
                        <DashboardText centred>
                            Usuário desde { moment(user.created_at).format('L') }
                        </DashboardText> 
                        <DashboardButton onClick={removeAccount}>
                            <Button loading={loading} color="secondary">Excluir Conta</Button>
                        </DashboardButton>
                    </Col>
                    <Col></Col>
                </Row>
            </ContainerAuthenticated> 
        </>
    );
}