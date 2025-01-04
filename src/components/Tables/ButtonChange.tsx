export default function ButtonChange({elid, func}) {

    return (
        <button className="btn btn-primary" style={{padding: "1px", paddingLeft: "10px", paddingRight: "10px"}} onClick={() => func(elid)}>Изменить</button>
    )
}