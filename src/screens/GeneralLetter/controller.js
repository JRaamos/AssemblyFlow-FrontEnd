import { useContext, useMemo } from "react";

import { CoreContext } from "context/CoreContext";

export default function useController() {

    const { setModal } = useContext(CoreContext)

    const handleOpenModal = () => { setModal({ type: 'sample', }) }

    return {
        handleOpenModal,
    }

}