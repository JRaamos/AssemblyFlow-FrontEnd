import React from "react"; 

import { Row, Col, Container } from 'reactstrap'; 
import { useNavigate } from 'react-router-dom';

import {
    FooterContainer,
    FooterLogo,
    FooterTitle,
    FooterText,
    FooterLink,
    FooterLinkImage,
    FooterSection,
    FooterPhoneContent,
    FooterPhoneIcon,
    FooterCopyright
} from './styled' 

export default function Footer(){ 
 
    const n = useNavigate();
    const navigate = to => n(`/${ to }`); 

    return ( 
        <> 
            <FooterContainer>
                <Container>
                    <Row>
                        <Col md={{size:5}}>
                            <FooterLogo />
                            <FooterTitle>AppGenerated</FooterTitle>
                            <FooterText>Rua sem nome, 18, Sala 02, SP, São Paulo</FooterText>
                            <FooterPhoneContent>
                                <FooterPhoneIcon />
                                <FooterLink>+55 (55) 5555-5555</FooterLink>
                            </FooterPhoneContent>
                        </Col>
                        <Col md={{size:7}}>
                            <Row>
                                <Col md={{size:6}}>
                                    <FooterSection>
                                        <FooterTitle>&nbsp;</FooterTitle>
                                        <FooterLink onClick={() => navigate('')}>Inicio</FooterLink>
                                        <FooterLink onClick={() => navigate('about')}>Sobre</FooterLink>
                                    </FooterSection>
                                </Col>
                                <Col md={{size:6}}> 
                                    <FooterSection>
                                        <FooterTitle>Nos siga nas redes</FooterTitle>
                                        <FooterLink>
                                            <FooterLinkImage src={'/icons/insta.svg'} />
                                            Instagram
                                        </FooterLink>
                                        <FooterLink>
                                            <FooterLinkImage src={'/icons/face.svg'} />
                                            Facebook
                                        </FooterLink> 
                                    </FooterSection>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col > 
                            <FooterCopyright>Criado por X-Apps</FooterCopyright> 
                        </Col> 
                    </Row>
                </Container>
            </FooterContainer>
        </>
    );
}