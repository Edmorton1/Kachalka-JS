import axios from "axios"
import React, { useEffect, useState } from "react"
import RecordsTableHead from "./RecordsTableHead"
import RecordsTableBody from "./RecordsTableBody"
import ButtonChange from "./ButtonChange"
import "./Table.scss"

export default function RecordsTable(): React.ReactNode {


    const [data, setData] = useState([])
    const [load, setLoad] = useState(false)
    const [changeMod, setChangeMod] = useState(false)
    const [UpdateEl, setUpdateEl] = useState(0)

    useEffect(() => {
        axios.get('/api/records')
            .then(response => response.data)
            .then(data => setData(data))
            .then(() => setLoad(true))
            .then(() => console.log(`Дата загрузилась, ${load}`))
    }, [])

    function RecordList(arr: any[]) {
        return arr.map((element, index) => {
            const date = new Date(element.date).toLocaleDateString("ru-RU")
                if (changeMod && UpdateEl == element.id) {
                    return (<RecordsTableBody exercise={element.exercise} record={element.record} date={element.date} elid={element.id} type="put" />)
                } else {
                    return (
                        <tr key={index} style={{height: "45px"}}>
                            <td>{element.exercise}</td>
                            <td>{element.record}</td>
                            <td>{date} {changeMod && <ButtonChange elid={element.id} func={setUpdateEl}/>}</td>
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
            <button className={!changeMod ? 'btn btn-primary tree-button' : 'btn btn-warning tree-button'} onClick={() => setChangeMod((prevState) => !prevState)}>ИЗМЕНИТЬ/УДАЛИТЬ</button>
            <table className="table text-center">
            <RecordsTableHead />
                <tbody>
                    {!changeMod && <RecordsTableBody/>}
                    {RecordList(data)}
                </tbody>
            </table>
            </div>
            </>
        )
    }