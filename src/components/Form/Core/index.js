import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from "react";
import { toast } from "react-toastify";
import { faker } from '@faker-js/faker';

import {
    FormInput,
    FormWrapper,
    FormSeparator,
    ContentFormHeader,
    ContentForm,
    UploadContent,
    InputRequired,
    AutofillButton,
    AutofillButtonIcon,
} from "./styled";

import Input, { CurrencyInput, MaskedInput } from "components/Form/Input";
import Select from "components/Form/Select";
import PasswordValidation from "components/Form/PasswordValidation";
import UploadFile from "../UploadFile";
import DashboardFormMultiSelect from "../MultiSelect";
import DashboardFormMultiForm from "../MultiForm";
import { isImage } from "utils";
import { DEV_MODE } from "services/api";
import Check from "../Check";
import Toggle from "../Toggle";

const keywordFakerMap = [
    { keyword: 'name', generate: () => faker.person.fullName() },
    { keyword: 'email', generate: () => faker.internet.email(undefined, undefined, 'uorak.com') },
    { keyword: 'age', generate: () => faker.number.int({ min: 18, max: 65 }).toString() },
    { keyword: 'phone', generate: () => faker.phone.number() },
    { keyword: 'address', generate: () => faker.location.streetAddress() },
    { keyword: 'company', generate: () => faker.company.name() },
    { keyword: 'password', generate: () => faker.internet.password() },
    { keyword: 'description', generate: () => faker.lorem.sentence() },
];

export default forwardRef(function FormCore({ formItems, register, disabled, title, nospace }, ref) {

    const [form, setForm] = useState({})
    const formValue = ref => { return form?.[ref] ? form?.[ref] : ''; }
    const changeForm = (value, ref) => { setForm({ ...form, [ref]: value }); }

    const [nextBlur, setNextBlur] = useState(null)
    const [nextPrint, setNextPrint] = useState([])

    const scheduleBlur = (item) => {
        setTimeout(() => { setNextBlur(item); }, 1)
    }

    const safeBlur = (item) => {
        if (typeof item?.onBlur === "function") {
            item.onBlur()
        }
    }

    const handleAutoFill = () => {
        const fakeData = {};
        formItems?.filter(f => f?.ref).forEach((field) => {
            fakeData[field?.ref] = field?.options ? field?.options?.[0]?.id : smartFaker(field?.ref);
        });
        setForm({ ...fakeData, ...form });
    };

    const smartFaker = (fieldName) => {
        const match = keywordFakerMap.find(({ keyword }) =>
            fieldName.toLowerCase().includes(keyword)
        );
        return match ? match.generate() : faker.word.sample();
    };

    useEffect(() => {
        if (register) {
            setForm({ ...register })
        }
    }, [register])

    useEffect(() => {
        if (nextBlur) {
            safeBlur(nextBlur)
        }
    }, [nextBlur])

    useEffect(() => {
        setNextPrint([...formItems])
    }, [formItems])


    const valid = (payload, array) => {
        for (let item of array) {
            if (item?.ref && !payload?.[item?.ref] && item?.required) {
                toast.error(`O campo ${item?.label || item?.placeholder || item?.ref} é obrigatório.`)
                return false;
            }
            if (item?.ref && item?.validate && !item?.validate(payload?.[item?.ref])) {
                return false;
            }
        }
        return true;
    };

    useImperativeHandle(ref, useCallback(() => ({
        getForm(skip = false) {
            if (!skip && !valid(form, formItems)) { return; }
            return form;
        }
    }), [form, formItems]))

    return (
        <>
            <ContentForm active={!!title}>
                <ContentFormHeader active={!!title}>{title}</ContentFormHeader>
                <FormWrapper nospace={nospace}>
                    {
                        nextPrint.map((item, key) => <>
                            {
                                item.separator ? <FormSeparator /> : <FormInput full={item.full} half={item.half} quarter={item.quarter} twenty={item.twenty} key={key}>
                                    {
                                        item.custom ?
                                            item.custom
                                            : item.options ? (
                                                item?.multi ?
                                                    <DashboardFormMultiSelect required={item?.required || !!item?.validate} forwardRef={item.ref} placeholder={item.placeholder} options={item.options} value={formValue(item.ref)} onChange={val => { changeForm(val, item.ref); scheduleBlur(item); }} disabled={item.disabled || disabled} full={item.full} multi={item?.multi} />
                                                    :
                                                    <Select required={item?.required || !!item?.validate} multirequired={item?.multirequired} placeholder={item.placeholder} options={item.options} value={formValue(item.ref)} onChange={val => { changeForm(val, item.ref); scheduleBlur(item); }} disabled={item.disabled || disabled} label={item?.label} />
                                            ) : item.formItems ?
                                                <DashboardFormMultiForm title={item.title} label={item.label} placeholder={item.placeholder} value={formValue(item.ref)} onChange={e => changeForm(e, item.ref)} formItems={item.formItems} />
                                                : item.type === 'toggle' ?
                                                    <Toggle label={item.label} placeholder={item.placeholder} checked={formValue(item.ref)} onChange={val => changeForm(val, item.ref)} disabled={item.disabled || disabled} />
                                                    : item.type === 'checkbox' ?
                                                        <Check label={item.label} placeholder={item.placeholder} checked={formValue(item.ref)} onChange={val => changeForm(val, item.ref)} disabled={item.disabled || disabled} />
                                                        : item.mask ?
                                                            <MaskedInput required={item?.required || !!item?.validate} mask={item.mask} type={item.type} space={item.space} label={item.label} placeholder={item.placeholder} value={formValue(item.ref)} onChange={e => changeForm(e.target.value, item.ref)} onBlur={() => typeof item?.onBlur === "function" ? item.onBlur(formValue(item.ref)) : null} disabled={item.disabled || disabled} />
                                                            : item.type === 'money' ?
                                                                <CurrencyInput required={item?.required || !!item?.validate} mask={item.mask} type={item.type} placeholder={item.placeholder} value={formValue(item.ref)} onChange={e => changeForm(e.target.value, item.ref)} onBlur={() => typeof item?.onBlur === "function" ? item.onBlur(formValue(item.ref)) : null} disabled={item.disabled || disabled} />
                                                                : item.type === 'upload' ?
                                                                    <UploadFile value={formValue(item.ref)} onChange={value => changeForm(value, item.ref)} >
                                                                        <UploadContent image={formValue(item.ref)?.url}>
                                                                            {formValue(item.ref) ? (!isImage(formValue(item.ref)?.ext) ? formValue(item.ref)?.name : null) : item.placeholder}
                                                                            {item?.required && !formValue(item.ref) ? <InputRequired> * </InputRequired> : null}
                                                                        </UploadContent>
                                                                    </UploadFile>
                                                                    : item.passwordValidation ?
                                                                        <PasswordValidation password={form.password} />
                                                                        :
                                                                        <Input required={item?.required || !!item?.validate} type={item.type} placeholder={item.placeholder} label={item?.label} value={formValue(item.ref)} onChange={e => {
                                                                            if (typeof item?.onChange === "function") { item.onChange(formValue(item.ref)); }
                                                                            changeForm(e.target.value, item.ref)
                                                                        }} disabled={item.disabled || disabled} onBlur={() => typeof item?.onBlur === "function" ? item.onBlur(formValue(item.ref)) : null} space={item?.space} small={item?.small} icon={item?.icon} search={item?.search} />
                                    }
                                </FormInput>
                            }
                        </>
                        )
                    }
                </FormWrapper>
                {
                    !DEV_MODE ? null :
                        <AutofillButton onClick={handleAutoFill}>
                            <AutofillButtonIcon />
                        </AutofillButton>
                }
            </ContentForm>
        </>
    );
})