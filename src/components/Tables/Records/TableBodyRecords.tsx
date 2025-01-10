interface TableBodyRecordsInterface {
    handleSubmit: Function,
    submitPUT: Function,
    submitPOST: Function,
    register: any,
    type?: string
}

export default function TableBodyRecords({handleSubmit, submitPUT, submitPOST, register, type}: TableBodyRecordsInterface) {
    return (
        <tr>
            <td colSpan={4}>
                <form className="d-flex" onSubmit={type == 'put' ? handleSubmit(submitPUT) : handleSubmit(submitPOST)}>
                    <input style={{width: "33%"}} type="text" className="form-control" {...register('exercise')}/>
                    <input min={1} style={{width: "33%"}} type="number" className="form-control" {...register('record')}/>
                    <div className="d-flex" style={{width: "34%"}}>
                        <input type="date" className="form-control" {...register('date')}/>
                        <button type="submit" className="btn btn-primary">Готово</button>
                    </div>
                </form>
            </td>
        </tr>
    )
}