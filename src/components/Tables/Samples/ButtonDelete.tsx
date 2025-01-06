import axios from "axios"

interface ButtonDeleteInterface {
    elid: number,
    reloadData: Function,
    path: string
}

export default function ButtonDelete({elid, reloadData, path}:ButtonDeleteInterface) {
    function submitDELETE(elid: number) {
        axios.delete(`/api/${path}/${elid}`)
            .then(() => reloadData())
            .catch((err) => console.log(err))
    }

    return (
        <button className="btn btn-danger" style={{padding: "1px", paddingLeft: "10px", paddingRight: "10px"}} onClick={() => submitDELETE(elid)}>Удалить</button>
    )
}