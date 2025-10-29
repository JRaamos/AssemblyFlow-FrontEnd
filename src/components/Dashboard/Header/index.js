import React, { useContext, useRef, useState } from "react";

import DashboardSide from "../Side";
import {
    DashboardHeaderContainer,
    DashboardHeaderAction,
    DashboardHeaderActionIcon,
    UserContent,
    UserName,
    UserInitial,
    InfoContainer,
    PlanContent,
    PlanContainer,
    PlanInfoText,
    PlanButton,
    PlanButtonText,
    InputContainer
} from "./styled";
import { Icon } from "ui/styled";
import Core from "../../../components/Form/Core";
import { useNavigate, useLocation } from 'react-router-dom';
import { CoreContext } from "context/CoreContext";

export default function DashboardHeader({ setLess, less, setSearchExpression }) {
    const n = useNavigate();
    const navigate = to => n(`/${to}`);

    const location = useLocation()
    const pathSegment = location.pathname.split('/')[1]

    const [register, setRegister] = useState()
    const formRef = useRef(null);

    const { user } = useContext(CoreContext)

    const [opened, setOpened] = useState(true)

    const formItems = [
        { ref: 'search', placeholder: 'Pesquisar', type: 'search', search: true, full: true, small: true, onChange: () => updateForm(), onBlur: () => updateForm() },
    ]

    const updateForm = () => {
        if (typeof setSearchExpression === 'function') {
            const form = formRef?.current?.getForm(true)
            setSearchExpression(form?.search || "")
        }
    }

    return (
        <>
            <DashboardHeaderContainer less={less}>
                <InputContainer>
                    {
                        !setSearchExpression ? null :
                            <Core ref={formRef} formItems={formItems} register={register} />
                    }
                </InputContainer>
                <InfoContainer>
                    <UserContent onClick={() => navigate('me')}>
                        <UserInitial home={pathSegment === 'dashboard'}>{user?.name?.[0]}</UserInitial>
                        <UserName>{user?.name}</UserName>
                    </UserContent>
                </InfoContainer>
            </DashboardHeaderContainer>
            <DashboardSide setLess={setLess} less={less} />
        </>
    );
}