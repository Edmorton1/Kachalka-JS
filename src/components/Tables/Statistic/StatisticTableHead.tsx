export default function StatisticTableHead({changeMod}: any) {
  console.log(changeMod)
    return (
      <thead>
        <tr>
            <td className="text-center" colSpan={5}>
                <h6>
                    Ваш лучший результат был установлен 31 декабря 2024 года - 500 калорий за 50 минут, это было 7 дней назад
                </h6>
            </td>
        </tr>
        <tr>
          <td className="text-center" colSpan={5}>
            <h6>
                <div className="row" style={{width: "100%"}}>
                    <div className="col">Всего тренировок: 523</div>
                    <div className="col">Средний результат: 228</div>
                    <div className="col">Среднее время: 40 минут</div>
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
  