import { useContext, useMemo, useCallback, useEffect, useState } from "react";
import { CoreContext } from "context/CoreContext";
import { ReadStorage, SaveStorage } from "services/storage";

export default function useController() {
    const { setModal } = useContext(CoreContext);
    const [content, setContent] = useState('');


    useEffect(() => {
        const saved = ReadStorage('general_letter_content');
        if (saved) {
            setContent(saved);
        }
    }, []);

    const handleSave = () => {
        SaveStorage('general_letter_content', content || '');
        console.log('Conteúdo salvo no storage');
    };

    const handleChange = (html) => {
        setContent(html);
        SaveStorage('general_letter_content', html || '');
    };

    const buttons = useMemo(() => ([
        { key: 'co', label: 'Carta - CA-co', onClick: () => { } },
        { key: 'br', label: 'Carta - CA-br', onClick: () => { } },
    ]), []);

    return {
        buttons,
        content,
        handleChange,
        handleSave,

    };
}