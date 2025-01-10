import { TimeLocalizeFunction, TimeConverter } from "../Samples/TimeLocalizeFunction"

interface avgInterface {
  hours: number,
  minutes: number,
  seconds: number,
}

interface dataHeadInterface {
  count: string,
  avg_calories: number,
  max: number,
  avg: avgInterface
}

interface dataInterface {
  id: number,
  date: string,
  calories: number,
  time: string,
  type_id: number
}

interface StatisticTableHeadInterface {
  changeMod: boolean,
  dataHead: dataHeadInterface | undefined,
  data: dataInterface[],
}

export default function StatisticTableHead({changeMod, dataHead, data}: StatisticTableHeadInterface) {
  const hasData = data.length > 0
  const hasDataHead = dataHead?.count != '0'
  // ФУНКЦИИ И ПЕРЕМЕННЫЕ С ДАТАМИ
  function dateConverter(date?: string | undefined): string {
      const dateLocal = date == undefined ? new Date() : new Date(date)
      return `${dateLocal.getFullYear()}-${dateLocal.getMonth() < 9 ? '0' + (dateLocal.getMonth() + 1) : dateLocal.getMonth() + 1}-${dateLocal.getDate() < 10 ? '0' + dateLocal.getDate() : dateLocal.getDate()}`
  }
  let bestScore = data.find(element => element.calories == dataHead?.max)
  let bestScoreDate = dateConverter(bestScore?.date)

  let bestScroeOdds = ((new Date(dateConverter()).getTime() - new Date(bestScoreDate).getTime()) / 1000 / 60 / 60 / 24)
  // ФУНКЦИИ И ПЕРЕМЕННЫЕ С ДАТАМИ
    return (
      <thead>
        <tr>
            <td className="text-center" colSpan={5}>
                <h6>
                    {hasData && hasDataHead ? `Ваш лучший результат был установлен ${bestScoreDate} - ${bestScore?.calories} калорий за ${bestScore && TimeLocalizeFunction(bestScore?.time)}, это было ${bestScroeOdds} дней назад` : 'Данные появятся после первой тренировки'}
                </h6>
            </td>
        </tr>
        <tr>
          <td className="text-center" colSpan={5}>
            <h6>
                <div className="row" style={{width: "100%"}}>
                    <div className="col">Всего тренировок: {dataHead?.count}</div>
                    <div className="col">Средний результат: {dataHead && Math.round(dataHead.avg_calories)}</div>
                    <div className="col">Среднее время: {hasData && hasDataHead && dataHead ? TimeLocalizeFunction(TimeConverter(dataHead.avg.hours, dataHead.avg.minutes)) : 0}</div>
                </div>
            </h6>
          </td>
        </tr>
        <tr>
          <th className="th20">Дата</th>
          <th className="th20">Калории</th>
          <th className="th20">Время</th>
          <th className="th20">Тип</th>
          {changeMod && <th className="th20"></th>}
        </tr>
      </thead>
    );
  }
  