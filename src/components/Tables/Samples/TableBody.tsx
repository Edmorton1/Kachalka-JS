import axios from "axios"
import { useForm } from "react-hook-form"
import TableBodyRecords from "../Records/TableBodyRecords"
import StatisticTableBody from "../Statistic/StatisticTableBody"

interface propsInterface {
    path: string,
    type?: string,
    reloadData: Function,
    elid?: number,

    exercise?: string,
    record?: number,

    date?: any,
    calories?: number,
    time?: string,
    type_id?: number,
    changeMod?: boolean,
    reloadDataHead?: Function
    setUpdateEl?: Function
}

export default function TableBody(props: propsInterface) {
    function dateConverter() {
        const dateLocal = new Date(props.date)
        return `${dateLocal.getFullYear()}-${dateLocal.getMonth() < 9 ? '0' + (dateLocal.getMonth() + 1) : dateLocal.getMonth() + 1}-${dateLocal.getDate() < 10 ? '0' + dateLocal.getDate() : dateLocal.getDate()}`
    }

    function defaultValues(path: string) {
        if (path == "records") {
            return {
                exercise: props.exercise,
                record: props.record,
                date: new Date().toISOString().split('T')[0]
            }
        } else {
            
            return {
                date: !props.date ? new Date().toISOString().split('T')[0] : dateConverter(),
                calories: props.calories,
                time: props.time ? props.time : '00:00:00',
                type_id: props.type_id
            }
        }
    }

    const {register, handleSubmit} = useForm<any>({
        defaultValues: defaultValues(props.path)
    })

    function submitPOST(data: any) {
        console.log(data)
        if (new Date(data.date) <= new Date() && data.time != "00:00:00") {
            axios.post(`/api/${props.path}`, JSON.stringify(data), {
                headers: {'Content-Type': 'application/json'},
            })
            .then(() => props.reloadData())
            .then(() => {props.reloadDataHead && props.reloadDataHead()})
            .catch(err => console.log(err))
        }
    }
    
    function submitPUT(data: any) {
        if (new Date(data.date) <= new Date() && data.time != "00:00:00") {
            axios.put(`/api/${props.path}/${props.elid}`, JSON.stringify(data), {
                headers: {'Content-Type': 'application/json'}
            })
            .then(() => props.reloadData())
            .then(() => {props.reloadDataHead && props.reloadDataHead()})
            .then(() => {props.setUpdateEl && props.setUpdateEl(0)})
            .catch(err => console.log(err))
        }
    }



    if (props.path == "records") {
        return (
            <TableBodyRecords handleSubmit={handleSubmit} submitPUT={submitPUT} submitPOST={submitPOST} register={register} type={props.type}/>
        )
    } else {
        return (
            <StatisticTableBody handleSubmit={handleSubmit} submitPUT={submitPUT} submitPOST={submitPOST} register={register} type={props.type} changeMod={props.changeMod}/>
        )
    }
}