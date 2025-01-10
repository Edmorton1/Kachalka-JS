import { useState } from "react";
import { dataInterface } from "./UserTable";
import { useForm } from "react-hook-form";
import axios from "axios";

interface TbodyDataInterface {
    data: dataInterface[],
    load: boolean,
    reloadData: Function
}

export default function TbodyUserTable({data, load, reloadData}: TbodyDataInterface) {
    if (!load || !data || data.length === 0) {
        return <tbody><tr><td colSpan={10}>Загрузка данных...</td></tr></tbody>;
    }

    const [changeElement, setChangeElement] = useState(0)
    

    function handleButton(id: number) {
        id == changeElement ? setChangeElement(0) : setChangeElement(id)
        
        console.log(changeElement)
    }

    function makeInputs() {
        return data.map((e, i) => {
            const {register, handleSubmit} = useForm({
                defaultValues: {
                    id: e.id,
                    title: e.title,
                    link: e.link
                }
            })
            function submitPUT(data: any) {
                console.log(data)
                    axios.put(`/api/usertable/${data.id}`, JSON.stringify(data), {
                        headers: {'Content-Type': 'application/json'}
                    })
                    .then(() => console.log(data))
                    .then(() => reloadData())
                    .then(() => handleButton(0))
                    .catch(err => console.log(err))
            }
            return <tr key={i}>
                        <td style={{height: "2.889rem"}} className="d-flex justify-content-between" colSpan={1}>
                            {changeElement != e.id && <>
                                {e.title == '' && e.link == '' ? <button style={{height: "100%", textDecoration: "none"}} className="d-flex form-control align-items-center" onClick={() => handleButton(e.id)}>{e.title}</button> : <a target="_blank" style={{height: "100%", textDecoration: "none"}} href={e.link} className="d-flex form-control align-items-center">{e.title}</a> }
                                <button onClick={() => handleButton(e.id)} className="btn btn-outline-primary d-flex align-items-center">Редактировать</button>
                                </>}
                            {changeElement == e.id && 
                                <form className="d-flex w-100" onSubmit={handleSubmit(submitPUT)}>
                                    <input className="form-control" type="text" {...register('title')} placeholder="Название"/>
                                    <input className="form-control" type="text" {...register('link')} placeholder="Ссылка" />
                                    <button className="btn btn-primary d-flex align-items-center justify-content-center w-25">Готово</button>
                                </form>}
                        </td>
                    </tr>
        })
    }
    return (
        <tbody>
            {makeInputs()}
        </tbody>
    )
}