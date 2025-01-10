import axios from "axios"
import { useEffect, useState } from "react"
import StatisticTableHead from "./StatisticTableHead"
import TableBody from "../Samples/TableBody"
import ButtonChange from "../Samples/ButtonChange"
import ButtonDelete from "../Samples/ButtonDelete"
import { TimeLocalizeFunction } from "../Samples/TimeLocalizeFunction"

interface avgInterface {
    hours: number,
    minutes: number,
    seconds: number,
  }
  
  interface dataInterface {
    count: string,
    avg_calories: number,
    max: number,
    avg: avgInterface
  }

export default function StaticTable() {
    const [data, setData] = useState([])
    const [typesData, setTypesData] = useState([])
    const [dataHead, setDataHead] = useState<dataInterface>()
    const [headLoad, setHeadLoad] = useState(false)
    const [typesLoad, setTypesLoad] = useState(false)
    const [load, setLoad] = useState(false)
    const [changeMod, setChangeMod] = useState(false)
    const [UpdateEl, setUpdateEl] = useState(0)

    async function reloadData() {
        axios.get('api/statistic')
            .then(response => setData(response.data))
    }

    async function pullTypes() {
        axios.get('api/types/')
            .then(response => setTypesData(response.data))
            .then(() => setTypesLoad(true))
    }

    async function reloadDataHead() {
        axios.get('api/statistic_params')
        .then((response) => setDataHead(response.data[0]))
        .then(() => setHeadLoad(true))
    }

    useEffect(() => {
        {!typesLoad && pullTypes()} {!headLoad && reloadDataHead()}
        reloadData()
            .then(() => setLoad(true))
    }, [])
    
    function RecordList(arr: any[]) {
        return arr.map((element: any, index: any) => {
            const date = new Date(element.date).toLocaleDateString("ru-RU")
            if (UpdateEl == element.id && changeMod) {
                return (
                    <TableBody key={index} reloadDataHead={reloadDataHead} changeMod={changeMod} path="statistic" type="put" reloadData={reloadData} elid={element.id} date={element.date} calories={element.calories} time={element.time} type_id={element.type_id} setUpdateEl={setUpdateEl} />
                )
            }
            return (
                <tr key={element.id}>
                    <td>{date}</td>
                    <td>{element.calories}</td>
                    <td>{TimeLocalizeFunction(element.time)}</td>
                    <td>{typesData[3 - element.type_id]["name"]}</td>
                    {changeMod && <td><ButtonChange elid={element.id} func={setUpdateEl} /> <ButtonDelete elid={element.id} reloadData={reloadData} reloadDataHead={reloadDataHead} path="statistic" /></td>}
                </tr>
            )
        })
    }

    if (!load) {
        return (<div>Загрузка данных...</div>)
    } else if (load && headLoad && typesLoad) {
        return (
            <>
                <div id="TableWrapper" className="StatisticTable">
                <button className={!changeMod ? 'btn btn-primary tree-button' : 'btn btn-danger tree-button'} onClick={() => setChangeMod((prevState) => !prevState)}>ИЗМЕНИТЬ/УДАЛИТЬ</button>
                    <table className="table text-center">
                        <StatisticTableHead changeMod={changeMod} dataHead={dataHead} data={data} />
                        <tbody>
                            {!changeMod && <TableBody reloadData={reloadData} reloadDataHead={reloadDataHead} path="statistic" changeMod={changeMod} />}
                            {RecordList(data)}
                        </tbody>
                    </table>
                </div>
            </>
        )
    }
}