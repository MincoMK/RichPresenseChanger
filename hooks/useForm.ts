import {useEffect, useState} from "react";

export default function useFormData(onChange: (arg: any) => any, initial: () => any | Promise<any>) {
    const [formData, setFormData] = useState<any>({});
    const [initialData, setInitialData] = useState<any>({});

    useEffect(() => {
        initial().then((data: any) => {
            setFormData(data);
            setInitialData(data);
            onChange(data);
        });
    }, []);

    const handleChangeText = async (name: string, value: string) => {
        const fd = {
            ...formData,
            [name]: value
        };
        await setFormData(fd);
        onChange(fd);
    }

    return [formData, handleChangeText, initialData]
}