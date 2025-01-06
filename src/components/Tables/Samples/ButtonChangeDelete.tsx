import { useState } from "react"

export default function ButtonChangeDelete() {
    const [click, setClick] = useState(false)

    return (
        <button className={!click ? 'btn btn-primary tree-button' : 'btn btn-warning tree-button'} onClick={() => setClick((prevState) => !prevState)}>ИЗМЕНИТЬ/УДАЛИТЬ</button>
    )
}