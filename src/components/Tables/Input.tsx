import axios from "axios"

export default function Input({props: any}) {

    function HanglerResponse(data: Object) {
        axios.post('/api/records', JSON.stringify(data), {
            headers: {'Content-Type': 'application/json'}
        })
        .then(response => console.log(response))
        .catch(err => console.log(err))
    }

    interface PostShablonInterface {
        exercise: string | null,
        record: string | null,
        date: string | null
    }

    const postShablon: PostShablonInterface = {
        "exercise": null,
        "record": null,
        "date": null
    }

    function HanglerPost(name: keyof PostShablonInterface, event:string): void {
        postShablon[name] = event
        console.log(name, event, postShablon)
    }
    
    return (
        <input type={type} />
    )
}