import React, { useEffect } from "react";  

import Header from 'components/Landpage/Header'
import Footer from 'components/Landpage/Footer' 

import { 
    Content
} from "./styled"; 
import { ThemedComponent } from "ui/theme";

export default function ContainerLandpage({ children }){ 
    useEffect(() => { window.scrollTo(0,0) ;},[])
    return ( 
        <ThemedComponent>
            <Content>
                <Header />
                    { children }
                <Footer /> 
            </Content>
        </ThemedComponent>
    );
}