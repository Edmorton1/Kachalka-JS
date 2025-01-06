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
            <td colSpan={5}>
                <form className="d-flex" onSubmit={type == 'put' ? handleSubmit(submitPUT) : handleSubmit(submitPOST)}>
                    <input type="date" className="form-control" {...register('date')}/>
                    <input type="number" className="form-control" {...register('calories')}/>
                    <input type="time" className="form-control" {...register('time')}/>
                    <select className="form-control" {...register('type')}>
                        <option value="1">Option 1</option>
                        <option value="2">Option 2</option>
                        <option value="3">Option 3</option>
                    </select>
                    <button type="submit" className="btn btn-primary">Готово</button>
                </form>
            </td>
        </tr>
    )
}