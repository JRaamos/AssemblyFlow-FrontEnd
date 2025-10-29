import React, { useMemo, useRef, useState } from "react";  

import {  
    TitleContentText,
    TitleContent,
} from "./styled";

import { DashboardActions, DashboardActionsItem, TableContentImage, Touch } from "ui/styled";

import Button from "components/Form/Button";
import Core from "components/Form/Core";

export default function DashboardFormMultiForm({ label, placeholder, value, onChange, formItems }){
    
    const formRef = useRef()

    const [rows, setRows] = useState([])

    const register = useMemo(() => {
        const nextRows = ((value||[])?.map(m => ({ ...m, uid:m?.uid ? m?.uid : m?.id })))
        setRows(nextRows)
        const nextRegister = nextRows?.reduce((p, c, k) => {
            return ({ 
                ...p,
                ...(formItems||[])
                    ?.map(mm => ({ [`${mm?.ref}${ c?.uid }`]: c?.[`${mm?.ref}`] }))
                        ?.reduce((pp, cc) => ({ ...pp, ...cc }) , {})
            })
        } , {})
        return nextRegister
    }, [value])

    const addQuestion = () => {
        setRows([ ...rows, { uid: new Date().getTime() } ])
    }
    
    const remove = item => {
        const nextRows = [ ...rows?.filter(f => f?.uid !== item?.uid )]
        setRows(nextRows)
        const form = formRef?.current?.getForm()
        if(!form) return; 
        propagate(form, nextRows)
    }

    const fi = useMemo(() => [ 
        {
            full: true,
            custom: <>
                <DashboardActions start>
                    <DashboardActionsItem>
                        <Button outline color="secondary" onClick={addQuestion}>Adicionar { placeholder }</Button>
                    </DashboardActionsItem>
                </DashboardActions>
            </>
        },
        ...rows?.map((item, key) => [
            { custom: <> 
                <TitleContent>
                    <TitleContentText>{ label } { key + 1 }</TitleContentText> 
                    <Touch onClick={() => remove(item)}>
                        <TableContentImage src={'/icons/trash.svg'} />
                    </Touch>
                </TitleContent>
            </>, full:true },
            ...(formItems||[])?.map(m => ({ ...m, ref: `${m?.ref}${ item?.uid }`, onBlur:() => save() }))
        ])?.reduce((p,c) => [...p,...c],[]),
    ], [rows, formItems])

    const save = async () => {
        const form = formRef?.current?.getForm()
        if(!form) return; 
        propagate(form, rows)
    } 

    const propagate = (form, rows) => {

        const nextRows = rows?.map(m => ({
            ...(formItems||[])?.map(mm => ({ [`${mm?.ref}`]: form?.[`${mm?.ref}${ m?.uid }`] }))?.reduce((p, c) => ({ ...p, ...c }) , { uid: m?.uid })
        })) 
        
        if(onChange && typeof onChange === 'function'){
            onChange(nextRows)
        }
    }

    return ( 
        <>
            <Core ref={formRef} formItems={fi} register={register} />
        </>
    );
}