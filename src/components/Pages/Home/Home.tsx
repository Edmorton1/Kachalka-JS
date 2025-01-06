import Layout from "../../Layout"
import RecordsTable from "../../Tables/Records/RecordsTable"
import StaticTable from "../../Tables/Statistic/StatisticTable"

export default function Home() {
    return (
        <Layout>
            <RecordsTable />
            <StaticTable />
        </Layout>
    )
}