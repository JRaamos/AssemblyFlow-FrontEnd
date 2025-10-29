import React from "react";  

import {  
    Badge,
    BadgeRemove,
    BadgePoll,
    BadgeRemoveIcon,
} from "./styled";

export default function DashboardFormSelectPool({ selected, options, onRemove }){  

    const safeRemove = item => {
        if(onRemove && typeof onRemove === 'function'){ onRemove(item) ;}
    }
    
    return ( 
        <>
            <BadgePoll>
                {
                    (selected||[])?.map((m, k) => 
                        <Badge key={k}>
                            { (options || [])?.find(f => `${f.id}` === m )?.title }
                            <BadgeRemove onClick={() => safeRemove(m)}>
                                <BadgeRemoveIcon />
                            </BadgeRemove>
                        </Badge>
                    )
                }
            </BadgePoll>
        </>
    );
}