import axios from "axios"
import { useForm } from "react-hook-form"
import TableBodyRecords from "../Records/TableBodyRecords"
import StatisticTableBody from "../Statistic/StatisticTableBody"

export default function TableBody(props: any) {
    // interface RecordsInterface {
    //     exercise: string,
    //     record: string,
    //     date: string 
    // }
    // // ЭТО НАСТРОИТЬ ПОТОМ
    // interface StaticInterface {
    //     exercise: string,
    //     record: string,
    //     date: string 
    // }
    
    // ЭТО НАСТРОИТЬ ПОТОМ
    function defaultValues(path: string) {
        if (path == "records") {
            return {
                exercise: props.exercise,
                record: props.record,
                date: new Date().toISOString().split('T')[0]
            }
        } else {
            return {
                exercise: props.exercise,
                record: props.record,
                date: new Date().toISOString().split('T')[0]
            }
        }
    }

    const {register, handleSubmit} = useForm<any>({
        defaultValues: defaultValues(props.path)
    })

    function submitPOST(data: any) {
        axios.post(`/api/${props.path}`, JSON.stringify(data), {
            headers: {'Content-Type': 'application/json'},
        })
        .then(() => props.reloadData())
        .catch(err => console.log(err))
    }
    
    function submitPUT(data: any) {
        axios.put(`/api/${props.path}/${props.elid}`, JSON.stringify(data), {
            headers: {'Content-Type': 'application/json'}
        })
        .then(() => props.reloadData())
        .catch(err => console.log(err))
    }



    if (props.path == "records") {
        return (
            <TableBodyRecords handleSubmit={handleSubmit} submitPUT={submitPUT} submitPOST={submitPOST} register={register} type={props.type} />
        )
    } else {
        return (
            <StatisticTableBody handleSubmit={handleSubmit} submitPUT={submitPUT} submitPOST={submitPOST} register={register} type={props.type} />
        )
    }
}