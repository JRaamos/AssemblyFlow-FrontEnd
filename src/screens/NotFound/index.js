import React from "react";  

import {  
    ContentBody,
    ContentAnimation
} from "./styled";

import { 
    Animation
} from "ui/styled";

import ContainerLandpage from "containers/Landpage";
import useController from "./controller";

export default function NotFound(){ 
    
    const {

    } = useController()

    return ( 
        <ContainerLandpage> 
            <ContentBody>
                <ContentAnimation>
                    <Animation animationData={require('assets/lotties/404.json')}  />
                </ContentAnimation>
            </ContentBody>  
        </ContainerLandpage>
    );
}