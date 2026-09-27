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

import { useNavigate } from 'react-router-dom';
import useAssemblyProject from "hooks/useAssemblyProject";
import { getDashboardMenuItems } from "services/assembly/registry";



export default function DashboardSide({ setLess, less }) {

    const location = useLocation();
    const { project } = useAssemblyProject();

    const n = useNavigate();
    const navigate = to => n(`/${to}`);

    const verifyClose = (e) => {
        if (!e.target.closest('.menu-contant')) {
        }
    };

    const menuOptions = getDashboardMenuItems(project.settings?.circuitMode);


    const currentPath = location.pathname.replace(/^\/+|\/+$/g, "");


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
                                    active={currentPath === item.path}
                                    onClick={() => navigate(item.path)}

                                >

                                    <OptionText active={currentPath === item.path}>
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
