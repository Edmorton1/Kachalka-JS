import { useForm } from "react-hook-form"
import Layout from "../Layout"

export default function TEST() {
    const {register, handleSubmit, setValue} = useForm()

    function submit(data) {
        console.log(data)
    }
    function submitError(data) {
        console.log(data)
    }

    return (
        <>
        <Layout />
        <form onSubmit={handleSubmit(submit, submitError)}>
            <input type="text" {...register('excercise', {required: true})} />
            <input type="number" {...register('record')} />
            <input type="date" {...register('date')} />
            <button type="button" onClick={() => setValue('excercise', 'Пауку')}>Очистить</button>
            <button>Готово</button>
        </form>
        </>
        
    )
}