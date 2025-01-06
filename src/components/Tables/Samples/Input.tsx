export default function Input({type, name, arr}: any) {
    function HanglerPost(name: keyof typeof arr, event:string): void {
        arr[name] = event
        console.log(arr)
    }
    
    return (
        <input type={type} className="form-control" onChange={(event) => HanglerPost(name, event.target.value)} />
    )
}