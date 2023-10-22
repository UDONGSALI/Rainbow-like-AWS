import React, {useState, useEffect, memo} from 'react';
import useFetch from "../hook/useFetch";
import { SERVER_URL } from "../Common/constants";
import { PieChart as RechartsPieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import {urlToNameMapping} from "./urlToNameMapping";

function Chart() {
    const { data: fetchedLogs, loading } = useFetch(`${SERVER_URL}log`);
    const [memberType, setMemberType] = useState("ALL");
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        if (loading) return;

        const logs = fetchedLogs;

        const filteredLogs = memberType === "ALL"
            ? logs
            : (memberType === "null"
                ? logs.filter(log => !log.member)
                : logs.filter(log => log.member && log.member.type === memberType));

        const urlCounts = filteredLogs.reduce((acc, log) => {
            acc[log.url] = (acc[log.url] || 0) + 1;
            return acc;
        }, {});

        const transformedData = Object.entries(urlCounts).map(([name, value]) => ({ name, value }));

        setChartData(transformedData);

    }, [loading, fetchedLogs, memberType]);

    function getUrlName(url) {
        return urlToNameMapping[url] || url;  // 만약 매핑되지 않은 URL이면 URL 그대로 반환
    }

    const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#FF9F40', '#FFCD56', '#C9CBCF', '#C45679'];

    if (loading) return <div>데이터를 불러오는 중...</div>;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <select onChange={e => setMemberType(e.target.value)}>
                <option value="ALL">전체</option>
                <option value="null">비회원</option>
                <option value="ADMIN">관리자</option>
                <option value="USER">일반 회원</option>
                <option value="LABOR">노무사</option>
                <option value="COUNSELOR">상담사</option>
            </select>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <RechartsPieChart  width={800} height={400}>
                    <Pie
                        data={chartData}
                        cx={370}
                        cy={200}
                        labelLine={false}
                        label={({ name, value, percent }) => {
                            const pageName = getUrlName(name);
                            if (percent < 0.03) return;
                            return `${pageName} : ${value}회`;
                        }}
                        outerRadius={170}
                        innerRadius={90}
                        fill="#8884d8"
                        dataKey="value"
                        startAngle={90}
                        endAngle={-270}
                        paddingAngle={1}
                    >
                        {
                            chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                        }
                    </Pie>
                    <Tooltip formatter={(value, name) => [`${value}`, `${getUrlName(name)}`]} />
                </RechartsPieChart >
                <div style={{ width: 350, border: '1px solid #ccc', borderRadius: '10px', padding: '10px', boxShadow: '0px 4px 8px rgba(0,0,0,0.1)' }}>
                    <h4 style={{ textAlign: 'center', marginBottom: '20px' }}>가장 많이 방문한 페이지</h4>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {
                            chartData
                                .sort((a, b) => b.value - a.value)  // 값에 따라 내림차순 정렬
                                .slice(0, 10)  // 상위 10개 항목만 선택
                                .map((item, index) => (
                                    <div key={item.name} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', padding: '5px 0' }}>
                                        <span>{index + 1}위</span>
                                        <span>{getUrlName(item.name)}</span>
                                    </div>
                                ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(Chart);