import { useState, type ChangeEvent} from "react";

export default function useForm<T extends Record<string, string>>(initialValues: T) {
    const [data, setData] = useState(initialValues)

    function changeHandler(event: ChangeEvent<HTMLInputElement>) {
        setData((state) => ({
            ...state,
            [event.target.name]: event.target.value
        }))
    };

    function formInputRegister(name: keyof T) {
        return {
            name,
            value: data[name],
            onChange: changeHandler
        }
    }

    return {changeHandler, formInputRegister, data, setData}
}