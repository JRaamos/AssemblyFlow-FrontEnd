import { useContext, useMemo } from "react";

import { CoreContext } from "context/CoreContext";

export default function useController() {

    const { setModal } = useContext(CoreContext)

    const handleOpenModal = () => { setModal({ type: 'sample', }) }

    const formItemsCircuit = useMemo(() => [
        { ref: 'circuitNumber', label: 'Número do Circuito', placeholder: '', quarter: true },
        { ref: 'name', label: 'Nome do SC', placeholder: '', quarter: true },
        { ref: 'phone', label: 'Telefone', placeholder: '', quarter: true },
        { ref: 'email', label: 'E-mail', placeholder: '', quarter: true },
    ], [])

    const formItemsCo = useMemo(() => [
        { ref: 'dateStart', label: 'Data do evento', type: 'date', placeholder: '', },
        { ref: 'theme', label: 'Tema do evento', placeholder: '', },
        { ref: 'local', label: 'Local do evento', placeholder: '', },
        { ref: 'address', label: 'Endereço do evento', placeholder: '', full: true, space: true },
        { ref: 'rehearsal', label: 'Local do ensaio', placeholder: '', space: true },
        { ref: 'addressRehearsal', label: 'Endereço do ensaio', placeholder: '', space: true },
        { ref: 'dateHour', label: 'Dia e Hora do ensaio', placeholder: '', space: true },
    ], [])

    const formItemsBr = useMemo(() => [
        { ref: 'dateStart', label: 'Data do evento', type: 'date', placeholder: '', },
        { ref: 'theme', label: 'Tema do evento', placeholder: '', },
        { ref: 'local', label: 'Local do evento', placeholder: '', },
        { ref: 'address', label: 'Endereço do evento', placeholder: '', full: true, space: true },
        { ref: 'rehearsal', label: 'Local do ensaio', placeholder: '', space: true },
        { ref: 'addressRehearsal', label: 'Endereço do ensaio', placeholder: '', space: true },
        { ref: 'dateHour', label: 'Dia e Hora do ensaio', placeholder: '', space: true },
    ], [])

    const formItemsPio = useMemo(() => [
        { ref: 'dateStart', label: 'Data do evento', type: 'date', placeholder: '', },
        { ref: 'theme', label: 'Tema do evento', placeholder: '', },
        { ref: 'local', label: 'Local do evento', placeholder: '', },
        { ref: 'address', label: 'Endereço do evento', placeholder: '', full: true, space: true },
        { ref: 'rehearsal', label: 'Local do ensaio', placeholder: '', space: true },
        { ref: 'addressRehearsal', label: 'Endereço do ensaio', placeholder: '', space: true },
        { ref: 'dateHour', label: 'Dia e Hora do ensaio', placeholder: '', space: true },
    ], [])

    return {
        handleOpenModal,
        formItemsCo,
        formItemsBr,
        formItemsPio,
        formItemsCircuit
    }

}