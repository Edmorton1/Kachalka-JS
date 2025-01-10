import Layout from "../../Layout"
import RecordsTable from "../../Tables/Records/RecordsTable"
import StaticTable from "../../Tables/Statistic/StatisticTable"
import UserTable from "../../Tables/UserTable/UserTable"
import "../../Tables/TableDarkTheme.scss"
import "../../Tables/Table.scss"

export default function Home() {
    return (
        <Layout>
            <div className="TablesWrapper">
                <RecordsTable />
                <UserTable />
                <StaticTable />
            </div>
        </Layout>
    )
}