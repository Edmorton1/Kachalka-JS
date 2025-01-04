import axios from "axios"
import React, { useEffect, useState } from "react"
import ButtonChange from "./ButtonChange"
import RecordsTableHead from "./RecordsTableHead"
import RecordsTableBody from "./RecordsTableBody"

export default function RecordsTable(): React.ReactNode {
    interface PostShablonInterface {
        exercise: string | null,
        record: string | null,
        date: string | null
    }

    const postShablon: PostShablonInterface = {
        "exercise": null,
        "record": null,
        "date": null
    }

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
                return (
                    <tr key={index}>
                        {UpdateEl == element.id && changeMod && (
                            <RecordsTableBody arr={postShablon} exercise={element.exercise} record={element.record} elid={element.id} type="put"/>
                        )}
                        {UpdateEl != element.id && (
                            <>
                                <td>{element.exercise}</td>
                                <td>{element.record}</td>
                                <td>
                                    {date}
                                    {changeMod && (
                                        <><ButtonChange elid={element.id} func={setUpdateEl}/>
                                        <button>Delete</button></>
                                    )}
                                </td>
                            </>
                        )}

                    </tr> 
                )
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
                    <tr>
                    {UpdateEl == 0 && !changeMod && <RecordsTableBody arr={postShablon} type="post"/>}
                    </tr>
                    {RecordList(data)}
                </tbody>
            </table>
            </div>
            </>
        )
    }