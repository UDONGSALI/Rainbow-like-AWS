import styled from '../../../css/component/Intro/OrganizationChart.module.css';

function OrganizationChart() {

    return (
        <div>
            <section id={styled.contentWrap}>
                <div className={styled.layout}>
                    <header id={styled.subTit}>
                        <h3>조직도</h3>
                    </header>
                    <div className={styled.organization}>
                        <div className={styled.orgWrap}>
                            <strong className={styled.head}>기관장</strong>
                            <div className={styled.orgRight}>
                                <p>운영위원회</p>
                            </div>
                            <div className={styled.orgDepth1}>
                                <p><span>기획운영팀</span></p>
                                <p><span>교육사업팀</span></p>
                                <p><span>직장맘지원센터</span></p>
                            </div>
                        </div>
                        <div>
                            <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                                <div className={styled.tblScroll}>
                                    <div className={styled.tblWrap}>
                                        <table className={styled.tbl}>
                                            <colgroup>
                                                <col style={{width: "18%"}}/>
                                                <col style={{width: "35%"}}/>
                                                <col/>
                                                <col/>
                                                <col style={{width: "19%"}}/>
                                            </colgroup>
                                            <thead>
                                            <tr>
                                                <th>팀</th>
                                                <th>업무</th>
                                                <th>성명</th>
                                                <th>직책</th>
                                                <th>내선번호 (044-850)</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td className="br0">&nbsp;</td>
                                                <td>총괄</td>
                                                <td>홍만희</td>
                                                <td>대표</td>
                                                <td>8175</td>
                                            </tr>
                                            <tr>
                                                <td rowSpan="3">기획운영팀</td>
                                                <td>팀 총괄, 여성정책네트워크 운영, 연대사업 등</td>
                                                <td>남희원</td>
                                                <td>팀장</td>
                                                <td>8176</td>
                                            </tr>
                                            <tr>
                                                <td>여성경제적 역량 강화 사업, 창업 지원 프로그램 등</td>
                                                <td>강명주</td>
                                                <td>주임</td>
                                                <td>8179</td>
                                            </tr>
                                            <tr>
                                                <td><span style={{
                                                    color: "#000000",
                                                    letterSpacing: "-1.12px",
                                                    backgroundColor: "#ffffff"
                                                }}>예산 회계, 대관사업 등 </span></td>
                                                <td>정은주</td>
                                                <td><span style={{color: "#000000"}}><span
                                                    style={{backgroundColor: "#ffffff"}}>주임</span></span></td>
                                                <td>044-863-0380</td>
                                            </tr>
                                            <tr>
                                                <td rowSpan="3">교육사업팀</td>
                                                <td>팀 총괄, 교육 및 홍보 등</td>
                                                <td>이진선</td>
                                                <td>팀장</td>
                                                <td>8177</td>
                                            </tr>
                                            <tr>
                                                <td>소모임 지원사업, 여성소식지 기자단 운영 등</td>
                                                <td>노희연</td>
                                                <td>주임</td>
                                                <td>8178</td>
                                            </tr>
                                            <tr>
                                                <td>성인권 배움숲, 성평등 책마당 운영 등</td>
                                                <td>이유진</td>
                                                <td>주임</td>
                                                <td>8128</td>
                                            </tr>
                                            <tr>
                                                <td rowSpan="3">직장맘지원센터</td>
                                                <td>노무상담 총괄, 노동법 교육 등</td>
                                                <td>구미선</td>
                                                <td>노무사</td>
                                                <td>8127</td>
                                            </tr>
                                            <tr>
                                                <td>직장맘지원센터 운영 지원, 힐링 프로그램 운영 등</td>
                                                <td>오정숙</td>
                                                <td>주임</td>
                                                <td>8126</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div>
                                    <h4 className={styled.orgTitle}>운영위원회</h4>
                                    <table className={styled.tbl}>
                                        <colgroup>
                                            <col/>
                                            <col style={{width: "27%"}}/>
                                            <col style={{width: "45%"}}/>
                                        </colgroup>
                                        <thead>
                                        <tr>
                                            <th>구분</th>
                                            <th>성명</th>
                                            <th>소속 및 직함</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>위원장</td>
                                            <td>이영세</td>
                                            <td>전)세종특별자치시 의원</td>
                                        </tr>
                                        <tr>
                                            <td rowSpan="9">위원</td>
                                            <td>박정희</td>
                                            <td>세종시 여성단체협의회장</td>
                                        </tr>
                                        <tr>
                                            <td>박지원</td>
                                            <td>평화나루 사무처장</td>
                                        </tr>
                                        <tr>
                                            <td>박희숙</td>
                                            <td>대한어머니회 세종시지회장</td>
                                        </tr>
                                        <tr>
                                            <td>봉정현</td>
                                            <td>법률사무소 세종로 대표 변호사</td>
                                        </tr>
                                        <tr>
                                            <td>송은영</td>
                                            <td>나다움협동조합 성문화인권센터장</td>
                                        </tr>
                                        <tr>
                                            <td>안우상</td>
                                            <td>한국영상대학교 사회복지과 교수</td>
                                        </tr>
                                        <tr>
                                            <td>주혜진</td>
                                            <td>대전세종연구원 책임연구위원</td>
                                        </tr>
                                        <tr>
                                            <td>황명구</td>
                                            <td>세종시 사회서비스원 사무처장</td>
                                        </tr>
                                        <tr>
                                            <td>김기생</td>
                                            <td>세종특별자치시 여성가족과장(당연직)</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default OrganizationChart;
