import React from "react";

import {
    DashboardTitle,
    DashboardContent,
    DashboardText,
    DashboardContainer
} from "./styled";

import ContainerAuthenticated from "containers/Authenticated";
import Button from "components/Form/Button";
import { ButtonContainer, FormSpacer } from "ui/styled";
import LetterEditor from "components/LetterEditor";
import useController from "./controller";


export default function GeneralLetter() {
    const { buttons, content, handleChange, handleSave } = useController();

    return (
        <ContainerAuthenticated keep>
            <DashboardTitle>Carta Geral às Congregações</DashboardTitle>
            <DashboardContainer>
                <DashboardText>Modelo da CARTA GERAL para ás congregações - ASS Co  / Ass Br</DashboardText>
                <DashboardText>Observação: Esta carta precisa ser adaptada segundo as circunstâncias de cada circuito. A fraseologia deve ser mudada a cada evento.  É preciso também enviar uma carta para o corpo de anciãos sobre a resolução para os donativos.</DashboardText>
            </DashboardContainer>
            <ButtonContainer end space>
                <Button color="primary" nospace >Baixar PDF</Button>
                {buttons.map((b) => (<Button key={b.key} color="secondary" nospace onClick={b.onClick}>{b.label}</Button>))}
            </ButtonContainer>
            <FormSpacer />
            <LetterEditor value={content} onChange={handleChange} />
            <FormSpacer extraLarge />
            <DashboardContent>
                <ButtonContainer end>
                    <Button nospace color="lightBlue" onClick={handleSave}>Salvar</Button>
                </ButtonContainer>
            </DashboardContent>
        </ContainerAuthenticated>
    );
}