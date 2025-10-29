import React from "react";

import {
    DashboardAnimation,
    DashboardTitle,
    DashboardText,
    DashboardContainer
} from "./styled";

import ContainerAuthenticated from "containers/Authenticated";
import { Row, Col } from "reactstrap";
import Button from "components/Form/Button";
import useController from "./controller";
import Core from "components/Form/Core";

export default function DashboardHome() {

    const {
        formItems,
        formItemsCircuit
    } = useController()

    return (
        <>
            <ContainerAuthenticated keep>
                <DashboardContainer>
                    <DashboardTitle>Informações do Viajante</DashboardTitle>
                    <Core formItems={formItemsCircuit} />
                </DashboardContainer>
                <DashboardContainer>
                    <DashboardTitle>Assembleia de circuito (CA-co)</DashboardTitle>
                    <Core formItems={formItems} />
                </DashboardContainer>
                <DashboardContainer>
                    <DashboardTitle>Assembleia de circuito (CA-br)</DashboardTitle>
                    <Core formItems={formItems} />
                </DashboardContainer>
                <DashboardContainer>
                    <DashboardTitle>Reunião com pioneiros (CA-br)</DashboardTitle>
                    <Core formItems={formItems} />
                </DashboardContainer>
            </ContainerAuthenticated>
        </>
    );
}