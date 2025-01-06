import axios from "axios"
import React, { useEffect, useState } from "react"
import RecordsTableHead from "./RecordsTableHead"
import TableBody from "../Samples/TableBody"
import ButtonChange from "../Samples/ButtonChange"
import ButtonDelete from "../Samples/ButtonDelete"
import "../Table.scss"

export default function RecordsTable(): React.ReactNode {

    const [data, setData] = useState([])
    const [load, setLoad] = useState(false)
    const [changeMod, setChangeMod] = useState(false)
    const [UpdateEl, setUpdateEl] = useState(0)

    async function reloadData() {
        axios.get('/api/records')
            .then(response => response.data)
            .then(data => setData(data))
    }

    useEffect(() => {
        reloadData()
            .then(() => setLoad(true))
            .then(() => console.log(`Records load: ${load}`))
    }, [])

    function RecordList(arr: any[]) {
        return arr.map((element, index) => {
            const date = new Date(element.date).toLocaleDateString("ru-RU")
                if (changeMod && UpdateEl == element.id) {
                    return (<TableBody key={element.id} exercise={element.exercise} record={element.record} elid={element.id} type="put" reloadData={reloadData} path="records"/>)
                } else {
                    return (
                        <tr key={index} style={{height: "45px"}}>
                            <td>{element.exercise}</td>
                            <td>{element.record}</td>
                            <td>{date} {changeMod && <ButtonChange elid={element.id} func={setUpdateEl}/>} {changeMod && <ButtonDelete elid={element.id} reloadData={reloadData} path="records"/>}</td>
                        </tr>)
                }
            });
    }
    
    if (!load) {
        return (
            <div>Загрузка данных...</div>
        )
    }

    return (
            <>
            <div id="TableWrapper">
            <button className={!changeMod ? 'btn btn-primary tree-button' : 'btn btn-danger tree-button'} onClick={() => setChangeMod((prevState) => !prevState)}>ИЗМЕНИТЬ/УДАЛИТЬ</button>
            <table className="table text-center">
            <RecordsTableHead />
                <tbody>
                    {!changeMod && <TableBody reloadData={reloadData} path="records" />}
                    {RecordList(data)}
                </tbody>
            </table>
            </div>
            </>
        )
    }