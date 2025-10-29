import React from "react";

import {
    DashboardAnimation,
    DashboardTitle,
    DashboardText,
    DashboardContainer,
    DashboardContent
} from "./styled";

import ContainerAuthenticated from "containers/Authenticated";
import Button from "components/Form/Button";
import useController from "./controller";
import Core from "components/Form/Core";
import { ButtonContainer, FormSpacer } from "ui/styled";

export default function DashboardHome() {

    const {
        formItemsCo,
        formItemsBr,
        formItemsPio,
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
                    <Core formItems={formItemsCo} />
                </DashboardContainer>
                <DashboardContainer>
                    <DashboardTitle>Assembleia de circuito (CA-br)</DashboardTitle>
                    <Core formItems={formItemsBr} />
                </DashboardContainer>
                <DashboardContainer>
                    <DashboardTitle>Reunião com pioneiros (CA-br)</DashboardTitle>
                    <Core formItems={formItemsPio} />
                </DashboardContainer>
                <DashboardContent>
                    <ButtonContainer end>
                        <Button nospace color="primary">Salvar</Button>
                    </ButtonContainer>
                </DashboardContent>
                <FormSpacer extraLarge />
            </ContainerAuthenticated>
        </>
    );
}