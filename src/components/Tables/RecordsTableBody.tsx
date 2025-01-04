import Input from "./Input"
import ButtonSubmit from "./ButtonSubmit"

export default function RecordsTableBody(props: any) {
    return (
    <>
        <td colSpan={1}><Input type="text" name="exercise" value={props.exercise} arr={props.arr} /></td>
        <td colSpan={1}><Input type="text" name="record" value={props.record} arr={props.arr} /></td>
        <td colSpan={2}>
            <div className="d-flex align-items-center">
                <Input type="date" name="date" value={props.date} arr={props.arr} /><ButtonSubmit arr={props.arr} type={props.type} elid={props.elid} />
            </div>
        </td>
    </>
    )
}