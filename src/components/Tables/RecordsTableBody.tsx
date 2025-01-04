import axios from "axios"
import { useForm } from "react-hook-form"


export default function RecordsTableBody(props: any) {
    interface RecordsInterface {
        exercise: string,
        record: string,
        date: Date 
    }

    const {register, handleSubmit} = useForm<RecordsInterface>({
        defaultValues: {
            exercise: props.exercise,
            record: props.record,
            date: props.date
        }
    })

    function submitPOST(data: RecordsInterface) {
        axios.post('/api/records', JSON.stringify(data), {
            headers: {'Content-Type': 'application/json'},
        })
        .then(response => console.log(response))
        .catch(err => console.log(err))
    }
    function submitPUT(data: RecordsInterface) {
        axios.put(`/api/records/${props.elid}`, JSON.stringify(data), {
            headers: {'Content-Type': 'application/json'}
        })
        .then(response => console.log(response))
        .catch(err => console.log(err))
    }



    return (
        <tr>
            <td colSpan={4}>
            <form className="d-flex" onSubmit={props.type == 'put' ? handleSubmit(submitPUT) : handleSubmit(submitPOST)}>
                    <input type="text" className="form-control w-25" {...register('exercise')}/>
                    <div className="d-flex w-75">
                        <input type="number" className="form-control w-50" {...register('record')}/>
                        <input type="date" className="form-control" {...register('date')}/>
                        <button type="submit" className="btn btn-primary">Готово</button>
                    </div>
                </form>
            </td>
        </tr>
    )
}