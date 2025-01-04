export default function ButtonChange({elid, func}) {

    return (
        <button className="btn btn-primary" onClick={() => func(elid)}>Изменить</button>
    )
}