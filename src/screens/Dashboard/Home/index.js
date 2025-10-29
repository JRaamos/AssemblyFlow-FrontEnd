import React from "react";  

import {  
    DashboardAnimation,
    DashboardTitle,
    DashboardText
} from "./styled";

import ContainerAuthenticated from "containers/Authenticated";
import { Row, Col } from "reactstrap";
import Button from "components/Form/Button";
import useController from "./controller";

export default function DashboardHome(){  

    const {
        handleOpenModal
    } = useController()

    return ( 
        <>
            <ContainerAuthenticated> 
                <Row>
                    <Col></Col>
                    <Col sm={12} md={4}>
                        <DashboardAnimation animationData={require('assets/lotties/peace.json')} />
                        <DashboardTitle centred>
                            Estado vazio
                        </DashboardTitle> 
                        <DashboardText centred>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ut congue nisl. Duis lobortis ante vitae hendrerit efficitur. Quisque dolor magna, efficitur et nunc id, pretium porta mauris. Integer vel lobortis risus. Duis consectetur ac ante at ullamcorper. Nullam luctus sollicitudin odio, eu gravida lorem efficitur ac. Nam pulvinar consequat cursus. Maecenas convallis sagittis erat, at tristique lectus pharetra et. In eget metus nisl. Maecenas orci ipsum, sagittis non erat eleifend, dignissim suscipit mi. Ut a tellus quis enim pellentesque fringilla. Sed in malesuada felis, eget volutpat neque.
                        </DashboardText> 
                        <DashboardText centred>
                            <Button color="primary" onClick={handleOpenModal}>Ver um modal</Button>
                        </DashboardText> 
                    </Col>
                    <Col></Col>
                </Row>
            </ContainerAuthenticated> 
        </>
    );
}