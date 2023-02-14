import {useEffect, useState} from "react";

export default function useFormData(onChange: (arg: any) => any, initial: () => any | Promise<any>) {
    const [formData, setFormData] = useState<any>({});
    const [initialData, setInitialData] = useState<any>({});

    useEffect(() => {
        console.log("UE");
        const i = initial();
        if (i instanceof Promise) {
            i.then((data: any) => {
                console.log(data);
                setInitialData(data);
            });
        } else {
            setInitialData(i);
        }
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