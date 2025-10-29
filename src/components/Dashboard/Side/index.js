import React from "react";
import { useLocation } from 'react-router-dom';

import {
    DashboardMenuContainer,
    DashboardMenu,
    DashboardMenuFooter,
    DashboardVersionContent,
    DashboardMenuHeader,
    LogoIcon,
    DashboardMenuContent,
    DashboardMenuOption,
    OptionText,
    DashboardMenuBorder,
} from "./styled";

import Button from "components/Form/Button";
import { DoLogout } from "services/authentication";
import { Icon } from "ui/styled";
import { useNavigate } from 'react-router-dom';



export default function DashboardSide({ setLess, less }) {

    const location = useLocation();

    const n = useNavigate();
    const navigate = to => n(`/${to}`);

    const verifyClose = (e) => {
        if (!e.target.closest('.menu-contant')) {
        }
    };

    const exit = async () => {
        await DoLogout();
        navigate('login');
    };

    const menuOptions = [
        { label: 'Inicio', icon: 'home', iconActive: 'home-active', path: 'dashboard' },

        { label: 'Carta Geral', icon: 'support', iconActive: 'support-active', path: 'cg' },
        { label: 'Pioneiros', icon: 'support', iconActive: 'support-active', path: 'pio' },
        { label: 'Ass-co', icon: 'support', iconActive: 'support-active', path: 'ass-co' },
        { label: 'Disc-co', icon: 'support', iconActive: 'support-active', path: 'disc-co' },
        { label: 'DiscB-co', icon: 'support', iconActive: 'support-active', path: 'discb-co' },
        { label: 'Pr-Or-co', icon: 'support', iconActive: 'support-active', path: 'pr-or-co' },
        { label: 'Pr-Or-B-co', icon: 'support', iconActive: 'support-active', path: 'pr-or-b-co' },
        { label: 'T-T', icon: 'support', iconActive: 'support-active', path: 't-t' },

        { label: 'Ass-br', icon: 'support', iconActive: 'support-active', path: 'ass-br' },
        { label: 'Disc-br', icon: 'support', iconActive: 'support-active', path: 'disc-br' },
        { label: 'DiscB-br', icon: 'support', iconActive: 'support-active', path: 'discb-br' },
        { label: 'Pr-Or-br', icon: 'support', iconActive: 'support-active', path: 'pr-or-br' },
        { label: 'Pr-Or-B-br', icon: 'support', iconActive: 'support-active', path: 'pr-or-b-br' },
        { label: 'T-T-br', icon: 'support', iconActive: 'support-active', path: 't-t-br' },
    ];


    const currentPath = location.pathname


    return (
        <>
            <DashboardMenuContainer onClick={verifyClose} >
                <DashboardMenu less={less}>
                    <DashboardMenuHeader less={less}>
                        {less ? null : <LogoIcon icon="logo" nomargin />}
                    </DashboardMenuHeader>
                    <DashboardMenuContent>
                        {menuOptions.map((item) => (
                            <React.Fragment key={item.path}>
                                <DashboardMenuOption
                                    active={currentPath.includes(item.path)}
                                    onClick={() => navigate(item.path)}

                                >

                                    <OptionText active={currentPath.includes(item.path)}>
                                        {item.label}
                                    </OptionText>
                                </DashboardMenuOption>

                                {!item?.border ? null : <DashboardMenuBorder />}
                            </React.Fragment>
                        ))}
                    </DashboardMenuContent>
                </DashboardMenu>
            </DashboardMenuContainer>
        </>
    );
}