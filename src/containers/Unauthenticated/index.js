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
 

export default function ContainerUnauthenticated({ children, keep }){   
    
    const n = useNavigate();
    const navigate = to => n(`/${ to }`); 

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
        window.scrollTo(0,0)
    }, [])

    return ( 
        <> 
            <ThemedComponent>
                <Content>
                    <Row>
                        <Col md={{ size:7 }}>
                            <SideBackgroundImageContainer>
                                <SideBackgroundImage />
                                <SideBackgroundImageDegree />
                            </SideBackgroundImageContainer>
                        </Col>
                        <Col md={{ size:5 }}>
                            <FormContent>
                                <Touch onClick={() => navigate('')}>
                                    <AppLogo /> 
                                </Touch>
                                { children }
                            </FormContent>
                        </Col>
                    </Row>  
                </Content>
            </ThemedComponent>
        </>
    );
}