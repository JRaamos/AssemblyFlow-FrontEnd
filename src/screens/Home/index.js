import React from "react";

import {
    DashboardTitle,
    DashboardContainer,
    DashboardContent,
    ModeButton,
    ModeButtonIndicator,
    ModeButtonText,
    ModeDescription,
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
        formItemsCircuit,
        formItemsComposition,
        circuitMode,
        travelerRegister,
        coRegister,
        brRegister,
        pioRegister,
        compositionRegister,
        updateTraveler,
        updateEvent,
        updateComposition,
        toggleCircuitMode,
        resetSection,
    } = useController()

    const singleCircuit = circuitMode === "single";

    return (
        <>
            <ContainerAuthenticated keep>
                <DashboardContainer>
                    <DashboardTitle>Formato do projeto</DashboardTitle>
                    <ModeButton
                        type="button"
                        role="switch"
                        aria-checked={singleCircuit}
                        active={singleCircuit}
                        onClick={toggleCircuitMode}
                    >
                        <ModeButtonIndicator active={singleCircuit} />
                        <ModeButtonText>
                            Circuito Único
                            <ModeDescription>
                                {singleCircuit
                                    ? "Ativado — todo o projeto usa uma única programação."
                                    : "Desativado — o projeto usa Partes A e B."}
                            </ModeDescription>
                        </ModeButtonText>
                    </ModeButton>
                </DashboardContainer>
                <DashboardContainer>
                    <DashboardTitle>Início — Informações do viajante</DashboardTitle>
                    <Core formItems={formItemsCircuit} register={travelerRegister} onFormChange={updateTraveler} />
                </DashboardContainer>
                <DashboardContainer>
                    <DashboardTitle>
                        Assembleia de circuito (CA-co){singleCircuit ? "" : " — Parte A e Parte B"}
                    </DashboardTitle>
                    <Core formItems={formItemsCo} register={coRegister} onFormChange={(form) => updateEvent("co", form)} />
                </DashboardContainer>
                <DashboardContainer>
                    <DashboardTitle>
                        Assembleia de circuito (CA-br){singleCircuit ? "" : " — Parte A e Parte B"}
                    </DashboardTitle>
                    <Core formItems={formItemsBr} register={brRegister} onFormChange={(form) => updateEvent("br", form)} />
                </DashboardContainer>
                <DashboardContainer>
                    <DashboardTitle>
                        Reunião com pioneiros{singleCircuit ? "" : " — Parte A e Parte B"}
                    </DashboardTitle>
                    <Core formItems={formItemsPio} register={pioRegister} onFormChange={(form) => updateEvent("pioneers", form)} />
                </DashboardContainer>
                <DashboardContainer>
                    <DashboardTitle>Composição do circuito</DashboardTitle>
                    <Core formItems={formItemsComposition} register={compositionRegister} onFormChange={updateComposition} />
                </DashboardContainer>
                <DashboardContent>
                    <ButtonContainer end space>
                        <Button nospace color="secondary" onClick={() => resetSection("events")}>Restaurar eventos</Button>
                        <Button nospace color="secondary" onClick={() => resetSection("circuitComposition")}>Restaurar composição</Button>
                        <Button nospace color="primary" onClick={() => resetSection("all")}>Restaurar projeto</Button>
                    </ButtonContainer>
                </DashboardContent>
                <FormSpacer extraLarge />
            </ContainerAuthenticated>
        </>
    );
}
