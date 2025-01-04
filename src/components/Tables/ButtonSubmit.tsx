import axios from "axios"
import "./Table.scss"

interface ButtonInterface {
    arr: Object,
    type: string,
    elid: string | null
}

export default function Button({arr, type, elid=null}: ButtonInterface):React.ReactNode {
    function HandlerPost(data: Object) {
        axios.post('/api/records', JSON.stringify(data), {
            headers: {'Content-Type': 'application/json'}
        })
        .then(response => console.log(response))
        .catch(err => console.log(err))
    }
    function HandlerPut(data: Object) {
        axios.put(`/api/records/${elid}`, JSON.stringify(data), {
            headers: {'Content-Type': 'application/json'}
        })
        .then(response => console.log(response))
        .catch(err => console.log(err))
    }
    function Handler(arr, type) {
        console.log(`Handler Wirjd, ${arr, type}`)
        {type == 'post' && HandlerPost(arr)}
        {type == 'put' && HandlerPut(arr)}
    }

    return (
        <button onClick={() => Handler(arr, type)} type="submit" className="btn btn-primary">Готово</button>
    )
}