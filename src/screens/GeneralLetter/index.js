import React, { useState, useMemo } from "react";

import {
    DashboardTitle,
    DashboardContent
} from "./styled";

import ContainerAuthenticated from "containers/Authenticated";
import Button from "components/Form/Button";
import { ButtonContainer } from "ui/styled";
import LetterEditor from "components/LetterEditor";


export default function GeneralLetter() {
    const [content, setContent] = useState('');

    const handleSave = () => {
        console.log('Conteúdo salvo:', content);
    };

    return (
        <ContainerAuthenticated keep>
            <DashboardTitle>Carta Geral às Congregações</DashboardTitle>
            <LetterEditor value={content} onChange={setContent} />
            <DashboardContent>
                <ButtonContainer end >
                    <Button nospace color="primary" onClick={handleSave}>Salvar</Button>
                </ButtonContainer>
            </DashboardContent>
        </ContainerAuthenticated>
    );
}