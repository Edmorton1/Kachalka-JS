import axios from "axios"
import { useEffect, useState } from "react"
import TbodyUserTable from "./TbodyUserTable"

export interface dataInterface {
    id: number,
    title: string,
    link: string
}

export default function UserTable() {
    const [data, setData] = useState<dataInterface[]>([])
    const [load, setLoad] = useState(false)

    async function reloadData() {
        axios.get('api/usertable')
            .then(response => setData(response.data))
    }

    useEffect(() => {
        reloadData()
            .then(() => setLoad(true))
    }, [])

    if (!load) {
        return <div>Загрузка данных...</div>
    } else {
        return (
            <div className="UserTable">
                <table className="table text-center" style={{border: "1px solid white"}}>
                    <TbodyUserTable data={data} load={load} reloadData={reloadData}/>
                </table>
            </div>
        )
    }
}