import React, { useState } from 'react'

import { Row, Col, Container } from 'reactstrap'; 
import { useNavigate } from 'react-router-dom';
 
import { 
    HeaderContainer,
    RowCenter,
    RowEnd,
    AppLogo,
    HeaderLeftMenu,
    HeaderMenuItem,
    HeaderMobile,
    MenuIcon,
    HeaderMobileMenu,
    HeaderMobileItem
} from './styled';

import { 
    Touch,
    ButtonWhite
} from 'ui/styled';
import Button from 'components/Form/Button';

export default function Header(){
    
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const n = useNavigate();
    const navigate = to => n(`/${ to }`); 

    const options = {
        left:[
            { title:'Inicio', active:true, action:() => navigate('') },
            { title:'Sobre', action:() => navigate('about') }
        ],
        right:[ 
            { title:'Login', button:true, action:() => navigate('login') },
            { title:'Registro', button:true, outline:true, action:() => navigate('register') },
        ]
    }
    
    return (
        <>
            <HeaderContainer>
                <Container fluid>
                    <Row>
                        <Col md={{ size:7 }}> 
                            <RowCenter>
                                <AppLogo />
                                <HeaderLeftMenu>
                                    {
                                        options?.left?.map((item, key) => item.button ? 
                                            <Button key={key} nospace outline={item.outline} onClick={item.action}>{ item.title }</Button> 
                                                :
                                            <HeaderMenuItem key={key} active={item.active} onClick={item.action}>{ item.title }</HeaderMenuItem>
                                        )
                                    } 
                                </HeaderLeftMenu>
                                <HeaderMobile>
                                    <Touch className="touch" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                                        <MenuIcon />
                                    </Touch>
                                    {
                                        mobileMenuOpen ? 
                                            <HeaderMobileMenu>
                                                {
                                                    [...options?.left, ...options?.right]?.map((item, key) => item.button ? 
                                                        <HeaderMobileItem key={key} centred> 
                                                            <Button nospace outline={item.outline} nomargin onClick={item.action}>{ item.title }</Button> 
                                                        </HeaderMobileItem>
                                                            :
                                                        <HeaderMobileItem key={key} active={item.active} onClick={item.action}>{ item.title }</HeaderMobileItem>
                                                    )
                                                }  
                                            </HeaderMobileMenu>
                                        : null
                                    }
                                </HeaderMobile>
                            </RowCenter> 
                        </Col>
                        <Col md={{ size:5 }}>
                            <RowEnd>
                                {
                                    options?.right?.map((item, key) => item.button ? 
                                        <Button key={key} nospace outline={item.outline} onClick={item.action}>{ item.title }</Button> 
                                            :
                                        <HeaderMenuItem key={key} className={item.active ? "active" : ""} onClick={item.action}>{ item.title }</HeaderMenuItem>
                                    )
                                } 
                            </RowEnd>
                        </Col>
                    </Row>
                </Container>
            </HeaderContainer>
        </>
    )
}