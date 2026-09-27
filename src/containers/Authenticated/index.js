import React, { useEffect, useState } from "react";

import Header from 'components/Dashboard/Header'

import {
    DashboardPage,
    DashboardBody,
    DashboardBodyContent,
    Content,
    MobileBrand,
    MobileMenuButton,
    MobileTopBar,
} from "./styled";
import { ReadObject } from "services/storage";
import { useNavigate } from 'react-router-dom';
import { ThemedComponent } from "ui/theme";
import DashboardSide from "components/Dashboard/Side";

export default function ContainerAuthenticated({ children }) {

    const n = useNavigate();
    const navigate = to => n(`/${to}`);

    const init = () => {
        // const authentication = ReadObject('authentication')
        // if (!authentication?.jwt) {
        //     completeNext()
        // }
    }

    const completeNext = () => {
        navigate('login')
    }

    useEffect(() => {
        init()
        window.scrollTo(0, 0)
    }, [])
    const [less, setLess] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    useEffect(() => {
        const closeMenu = (event) => {
            if (event.key === "Escape") setMobileMenuOpen(false)
        }

        window.addEventListener("keydown", closeMenu)
        return () => window.removeEventListener("keydown", closeMenu)
    }, [])

    return (
        <>
            <ThemedComponent>
                <Content>
                    <DashboardPage>
                        <MobileTopBar>
                            <MobileMenuButton
                                type="button"
                                aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
                                aria-expanded={mobileMenuOpen}
                                onClick={() => setMobileMenuOpen((open) => !open)}
                            >
                                <span />
                                <span />
                                <span />
                            </MobileMenuButton>
                            <MobileBrand>AssemblyFlow</MobileBrand>
                        </MobileTopBar>
                        <DashboardSide
                            setLess={setLess}
                            less={less}
                            mobileOpen={mobileMenuOpen}
                            onMobileClose={() => setMobileMenuOpen(false)}
                        />
                        {/* <Header setLess={setLess} less={less} setSearchExpression={setSearchExpression} /> */}
                        <DashboardBody less={less}>
                            <DashboardBodyContent>
                                {children}
                            </DashboardBodyContent>
                        </DashboardBody>
                    </DashboardPage>
                </Content>
            </ThemedComponent>
        </>
    );
}
