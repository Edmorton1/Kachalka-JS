import axios from "axios"
import { useEffect, useState } from "react"
import StatisticTableHead from "./StatisticTableHead"
import "../Table.scss"
import TableBody from "../Samples/TableBody"

export default function StaticTable() {
    const [data, setData] = useState([])
    const [load, setLoad] = useState(false)
    const [changeMod, setChangeMod] = useState(false)
    const [UpdateEl, setUpdateEl] = useState(0)

    async function reloadData() {
        axios.get('api/statistic')
            .then(response => setData(response.data))
    }

    useEffect(() => {
        reloadData()
            .then(() => setLoad(true))
            .then(() => console.log(`Statistic load: ${load}`))
    }, [])
    
    function RecordList(arr: any[]) {
        return arr.map((element: any) => {
            const date = new Date(element.date).toLocaleDateString("ru-RU")
            return (
                <tr key={element.id}>
                <td>{date}</td>
                <td>{element.calories}</td>
                <td>{element.time}</td>
                <td>{element.type_id}</td>
            </tr>
            )
        })
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
                <StatisticTableHead changeMod={changeMod} />
                <tbody>
                    {changeMod && <TableBody reloadData={reloadData} path="statistic" changeMod={changeMod} />}
                    {RecordList(data)}
                </tbody>
            </table>
            </div>
        </>
    )
}