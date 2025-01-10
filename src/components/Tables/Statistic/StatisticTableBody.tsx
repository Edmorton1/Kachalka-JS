interface TableBodyRecordsInterface {
    handleSubmit: Function,
    submitPUT: Function,
    submitPOST: Function,
    register: any,
    type?: string,
    changeMod?: boolean,
}
`form-control th20`
export default function StatisticTableBody({handleSubmit, submitPUT, submitPOST, register, type, changeMod}: TableBodyRecordsInterface) {
    return (
        <tr>
            <td colSpan={5}>
                <form className="d-flex" onSubmit={type == 'put' ? handleSubmit(submitPUT) : handleSubmit(submitPOST)}>
                    <input type="date" className={changeMod ? `form-control th20` : `form-control th25`} {...register('date')}/>
                    <input type="number" min={1} className={changeMod ? `form-control th20` : `form-control th25`} {...register('calories')}/>
                    <input type="time" className={changeMod ? `form-control th20` : `form-control th25`} {...register('time')}/>
                    <div className={changeMod ? `d-flex th40` : `d-flex th25`}>
                        <select className={changeMod ? `form-control th50` : `form-control`} {...register('type_id')}>
                            <option value="1">Силовая</option>
                            <option value="2">Кардио</option>
                            <option value="3">Смешанная</option>
                        </select>
                        <button type="submit" className={changeMod ? `btn btn-primary th50` : `btn btn-primary`}>Готово</button>
                    </div>
                </form>
            </td>
        </tr>
    )
}