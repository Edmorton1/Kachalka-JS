import axios from "axios"
import React, { useEffect, useState } from "react"

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

    function HanglerPost(name: keyof PostShablonInterface, event:string): void {
        postShablon[name] = event
        console.log(name, event, postShablon)
    }

    function HanglerResponse(data: Object) {
        axios.post('/api/records', JSON.stringify(data), {
            headers: {'Content-Type': 'application/json'}
        })
        .then(response => console.log(response))
        .catch(err => console.log(err))
    }

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
                    <td>{element.exercise}</td>
                    <td>{element.record}</td>
                    <td>{date}</td>
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
            <div>
                <a href="#" className="btn btn-primary tree-button">ДОБАВИТЬ/ИЗМЕНИТЬ/УДАЛИТЬ</a>
            </div>
            <table className="table text-center">
                <thead>
                    <tr>
                        <th colSpan={1} scope="col">Упражнение</th>
                        <th colSpan={1} scope="col">Рекорд</th>
                        <th colSpan={1} scope="col">Дней с последнего рекорда</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan={1}><input type="text" className="form-control" onChange={event => HanglerPost('exercise', event.target.value)} /></td>
                        <td colSpan={1}><input type="number" className="form-control" onChange={event => HanglerPost('record', event.target.value)} /></td>
                        <td colSpan={2}>
                            <div className="d-flex align-items-center">
                                <input type="date" className="form-control" onChange={event => HanglerPost('date', event.target.value)} /><button onClick={() => HanglerResponse(postShablon)} type="submit" className="btn btn-primary">Готово</button>
                            </div>
                        </td>
                    </tr>
                    {RecordList(data)}
                </tbody>
            </table>
            </>
        )
    }