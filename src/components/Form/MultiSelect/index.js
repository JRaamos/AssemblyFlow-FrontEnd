import React, { useMemo, useRef } from "react";  

import Core from "components/Form/Core";

import DashboardFormSelectPool from "components/Form/SelectPool";

export default function DashboardFormMultiSelect({ placeholder, forwardRef, options, value, onChange, disabled, full, multi, required }){  
    
    const formRef = useRef()

    const register = useMemo(() => {
        return { [forwardRef]:value }
    }, [value])

    const formItems = useMemo(() => [
        { placeholder, ref:forwardRef, options: (options || [])?.filter(f => !(value||[])?.includes(`${f.id}`)), onBlur: () => blur(), disabled, half: (!full && (value||[])?.length), full: !(value||[])?.length, multirequired: !!required },
        !(value||[])?.length ? null : { 
            twothree: !!full, 
            half: !full, 
            custom: <>
                <DashboardFormSelectPool selected={value} options={multi?.length ? multi : options} onRemove={item => toggleSelect(item)} />
            </> 
        },
    ]?.filter(f => f), [placeholder, forwardRef, options, value, onChange, multi])

    const isSelected = item => {
        const selected = (value || [])
        return selected?.includes(item)
    }

    const toggleSelect = item => {
        const selected = (value || [])
        const nextSelected = isSelected(item) ? selected?.filter(f => f !== item) : [ ...selected, item]
        if(onChange && typeof onChange === 'function'){ onChange(nextSelected) ;}
    }

    const blur = () => {
        const form = formRef.current.getForm()
        toggleSelect(form?.[forwardRef])
    }

    return ( 
        <> 
            <Core ref={formRef} formItems={formItems} register={register} flat />
        </>
    );
}