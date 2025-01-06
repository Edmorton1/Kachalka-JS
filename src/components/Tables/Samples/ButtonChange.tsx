interface ButtonChangeInterface {
    elid: number,
    func: Function
}

export default function ButtonChange({elid, func}: ButtonChangeInterface) {

    return (
        <button className="btn btn-warning" style={{padding: "1px", paddingLeft: "10px", paddingRight: "10px"}} onClick={() => func(elid)}>Изменить</button>
    )
}