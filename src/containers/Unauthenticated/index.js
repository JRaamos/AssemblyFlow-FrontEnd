import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import { Row, Col } from 'reactstrap';
import { ReadObject } from "services/storage";
import { ThemedComponent } from "ui/theme";

import {
    SideBackgroundImageContainer,
    SideBackgroundImage,
    SideBackgroundImageDegree,

    FormContent,
    AppLogo,
    Content,
    Touch
} from './styled'
import { Icon } from "ui/styled";


export default function ContainerUnauthenticated({ children, keep, image }) {

    const n = useNavigate();
    const navigate = to => n(`/${to}`);

    const init = () => {
        const authentication = ReadObject('authentication')
        if (authentication?.jwt && !keep) {
            completeNext()
        }
    }

    const completeNext = () => {
        navigate('dashboard')
    }

    useEffect(() => {
        init()
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <ThemedComponent>
                <Content>
                    <Row>
                        <Col md={{ size: 7 }} className="nopadding">
                            <SideBackgroundImageContainer>
                                {!image ? null : <SideBackgroundImage />}
                                {image ? null : <Icon icon="logo" />}
                            </SideBackgroundImageContainer>
                        </Col>
                        <Col md={{ size: 5 }} className="nopadding">
                            <FormContent>
                                {children}
                            </FormContent>
                        </Col>
                    </Row>
                </Content>
            </ThemedComponent>
        </>
    );
}