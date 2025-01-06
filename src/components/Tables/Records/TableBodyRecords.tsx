interface TableBodyRecordsInterface {
    handleSubmit: Function,
    submitPUT: Function,
    submitPOST: Function,
    register: any,
    type: string
}

export default function TableBodyRecords({handleSubmit, submitPUT, submitPOST, register, type}: TableBodyRecordsInterface) {
    return (
        <tr>
            <td colSpan={4}>
            <form className="d-flex" onSubmit={type == 'put' ? handleSubmit(submitPUT) : handleSubmit(submitPOST)}>
                    <input type="text" className="form-control w-25" {...register('exercise')}/>
                    <div className="d-flex w-75">
                        <input type="number" className="form-control w-50" {...register('record')}/>
                        <input type="date" className="form-control" {...register('date')}/>
                        <button type="submit" className="btn btn-primary">Готово</button>
                    </div>
                </form>
            </td>
        </tr>
    )
}