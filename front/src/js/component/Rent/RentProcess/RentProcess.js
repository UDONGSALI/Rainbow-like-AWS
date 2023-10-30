import * as React from "react";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Stack from '@mui/material/Stack';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Button from '@mui/material/Button';
import styles from '../../../../css/component/Rent/RentProcess.module.css';


//대관 신청 절차//
const StyledPaper = styled(Paper)(({theme}) => ({
    backgroundColor: "rgba(253,244,255,0.79)",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    maxWidth: 400,
    color: "rgb(75,75,77)",

}));

//유의사항//
const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({theme}) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));
const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{fontSize: '0.9rem'}}/>}
        {...props}
    />
))(({theme}) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));
const AccordionDetails = styled(MuiAccordionDetails)(({theme}) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));


//대관신청하기 버튼//
function redirectToURL(){
    window.location.href="/rent/status";
};


export default function RentProcess() {
    const [expanded, setExpanded] = React.useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <div id={styles.title}>

            <div className={styles.main1}><h3>대관 신청 절차</h3>
                <div className={styles.boxWrap}>
                    <Box className={styles.boxStyle} sx={{
                        flexGrow: 1,
                        overflow: "hidden",
                        px: 10,
                        display: "flex",
                        padding: "5px",
                        width: "100%",
                    }}>
                        <StyledPaper
                            sx={{
                                my: 1,
                                mx: "auto",
                                p: 2,
                            }}
                        >

                            <Grid container wrap="nowrap" spacing={3} style={{width: '150px', height: '100px'}}>
                                <Grid item >
                                    <Avatar>01</Avatar>
                                </Grid>
                                <Grid item xs zeroMinWidth>
                                    <Typography
                                        sx={{
                                            fontSize: "15px",
                                            align: "center",
                                            textAlignment: "center",
                                            fontWeight:"bold",

                                        }}
                                    >대관 장소 및 <br/>대관현황 확인</Typography>
                                </Grid>
                            </Grid>
                        </StyledPaper>
                        <h2> > </h2>
                        <StyledPaper
                            sx={{
                                my: 1,
                                mx: "auto",
                                p: 2,
                                position: "relative",
                            }}
                        >
                            <Grid container wrap="nowrap" spacing={3} style={{width: '150px', height: '100px'}}>
                                <Grid item>
                                    <Avatar>02</Avatar>
                                </Grid>
                                <Grid item xs>
                                    <Typography sx={{
                                        fontSize: "15px",
                                        align: "center",
                                        textAlignment: "center",
                                        fontWeight:"bold",

                                    }}>대관 신청서 작성</Typography>
                                </Grid>
                            </Grid>
                        </StyledPaper>
                        <h2> > </h2>
                        <StyledPaper
                            sx={{
                                my: 1,
                                mx: "auto",
                                p: 2,
                                position: "relative",

                            }}
                        >
                            <Grid className="contents3" container wrap="nowrap" spacing={3}
                                  style={{width: '150px', height: '100px'}}>
                                <Grid item>
                                    <Avatar>03</Avatar>
                                </Grid>
                                <Grid item xs>
                                    <Typography
                                        sx={{

                                            fontSize: "15px",
                                            align: "center",
                                            textAlignment: "center",
                                            fontWeight:"bold",

                                        }}>대관 담당자 확인</Typography>
                                </Grid>
                            </Grid>
                        </StyledPaper>
                        <h2> > </h2>
                        <StyledPaper
                            sx={{
                                my: 1,
                                mx: "auto",
                                p: 2,
                                position: "relative",
                            }}
                        >
                            <Grid container wrap="nowrap" spacing={3} style={{width: '150px', height: '100px'}}>
                                <Grid item>
                                    <Avatar>04</Avatar>
                                </Grid>
                                <Grid item xs>
                                    <Typography sx={{
                                        fontSize: "15px",
                                        align: "center",
                                        textAlignment: "center",
                                        fontWeight:"bold",

                                    }}>승인 및 <br/>결제 안내(이메일)</Typography>
                                </Grid>
                            </Grid>
                        </StyledPaper>
                        <h2> > </h2>
                        <StyledPaper
                            sx={{
                                my: 1,
                                mx: "auto",
                                p: 2,
                                position: "relative",
                            }}
                        >
                            <Grid container wrap="nowrap" spacing={3} style={{width: '150px', height: '100px'}}>
                                <Grid item>
                                    <Avatar>05</Avatar>
                                </Grid>
                                <Grid item xs>
                                    <Typography sx={{
                                        fontSize: "15px",
                                        align: "center",
                                        textAlignment: "center",
                                        fontWeight:"bold",

                                    }}>대관공간 사용</Typography>
                                </Grid>
                            </Grid>
                        </StyledPaper>
                    </Box>
                </div>
            </div>
            <div className={styles.main2}>
                <h3>대관 운영 시간</h3>
                <div className={styles.table}>
                    <table className={styles.rentTime}
                           style={{
                               width:'100%',
                               textAlign: 'center',
                               padding: '10px',
                               position: 'relative',
                           }}>
                        <colgroup>
                            <col className={styles.colStyle} />
                            <col className={styles.colStyle}/>
                        </colgroup>
                        <thead className={styles.tableHeader}>
                        <tr className={styles.col1}>
                            <td><b style={{fontWeight : 'bold'}}>대관일</b></td>
                            <td><b style={{fontWeight : 'bold'}}>휴관일</b></td>
                        </tr>
                        </thead>
                        <tbody className={styles.tableBody}>
                        <tr className={styles.col2}>
                            <td>
                                <p> 평일(월~금) 9:30 ~ 17:30<br/>
                                    토요일 12:30 ~ 17:30</p>
                            </td>
                            <td>
                                <p> 주말, 공휴일, 근로자의 날(5월 1일), <br/>
                                    임시휴일(시설 보수 등 사유 또는 기관장이 정하는 날)</p>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <p> - 대관시간에는 준비 및 정리 시간이 포함됩니다.</p>
                <p> - 대관이 필요한 날로부터 <span>1개월 전부터 3일 전</span>까지 신청 가능합니다.</p>
            </div>
            <div className={styles.main3}><h3>이용료</h3>
                <p>공유오피스 공간은 무료이고, 나머지 공간은 유료입니다. 다만, 다음과 같이 이용료 면제 기준이 있습니다.</p>
                <ul className={styles.rentFeeStandard}><b>이용료 면제기준</b>
                    <li>○ 국가 또는 지방자치단체가 직접 이용하는 경우</li>
                    <li>○ 국가나 지방자치단체가 설치하거나 지정한 여성가족 관련 기관·시설이 이용하는 경우</li>
                    <li>○ 국가나 지방자치단체가 위탁 또는 보조하는 여성가족 관련 비영리법인 및 비영리단체가 이용하는 경우</li>
                    <li>○ 그 밖에 성평등 문화 확산을 위하여 시장이 필요하다고 인정하는 경우</li>
                    <li><b>* 이용료 면제 기준에 해당이 되면 담당자가 단체 및 시설을 확인하고 위한 추가 서류를 요청할 수 있음며, 증빙서류가 미충족될 경우 감면이 어려울 수 있습니다.</b>
                    </li><br/><br/>
                </ul>
                <ul className={styles.rentFeeAccept}><b>승인 및 결제</b>
                    <li>○ 대관이 승인된 일로부터 2일 이내에 대관료 전액이 결제되어야 합니다.(카드결제 및 현장 납부 불가)</li>
                    <li>○ 대관료 입금 계좌 : 하나은행 533-910007-36604(세종여성플라자)</li>
                    <li>○ 이용료가 납부되면 납부확인서를 발행해 드립니다.(세금계산서 또는 현금영수증 발행 불가)</li>
                </ul><br/><br/>
                <ul className={styles.rentFeeReturn}><b>이용료 반환 기준</b>
                    <li>○ 국가적 행사, 세종특별자치시 또는 세종여성플라자의 특별한 사정으로 사용 취소 또는 중지된 경우 : 납부한 사용료 중 사용하지 아니한 일수에 해당하는 사용료 반환</li>
                    <li>○ 천재지변이나 불가항력의 사유로 인하여 사용이 불가능하게 된 경우 : 100% 반환</li>
                    <li>○ 이용허가를 받은 자가 이용일 전일까지 그 이용을 취소한 경우 : 50% 반환</li>
                    <li>○ 이용 기준에 어긋난 행위를 했을 경우 및 당일 취소한 경우 : 0% 반환</li>
                </ul>
            </div>
            <div className={styles.main4}>
                <h3>유의사항</h3>
                <div className={styles.accordion}>
                    <Accordion className="Acc1" expanded={expanded === 'panel1'} onChange={handleChange('panel1')}
                               style={{
                                   backgroundColor: "rgba(253,249,255,0.36)",
                                   border: '1px solid #ba68c8',
                                   borderRadius: '5px',
                               }}>
                        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header"
                                          style={{
                                              backgroundColor: "rgba(225,183,246,0.66)",
                                              borderRadius: '5px',
                                              padding : '5px',
                                              paddingLeft :' 20px',
                                          }}>
                            <Typography sx={{
                                color: 'black',
                                fontSize: '18px',
                                fontWeight : 'bold',
                            }}>시설이용제한</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                <ul>
                                    <b style={{fontWeight : 'bold'}}>다음에 해당하는 경우에는 시설의 이용을 제한할 수 있습니다.</b>
                                    <br/><br/>
                                    <li>&nbsp;○ 공공질서 또는 미풍양속을 저해한다고 판단되는 경우(음주, 흡연 포함)</li>
                                    <li>&nbsp;○ 허가받은 목적과 다르게 이용하는 경우</li>
                                    <li>&nbsp;○ 공간의 안전과 관리가 필요한 경우</li>
                                    <li>&nbsp;○ 정치활동, 종교활동, 광고행위, 판매행위, 유료강습·강연을 하려는 경우</li>
                                    <li>&nbsp;○ 이용료를 납부하지 아니하고 무단으로 이용하는 경우</li>
                                    <li>&nbsp;○ 신청목적과 다르게 이용한 사실이 확인된 경우에는 확인된 날부터 1년 동안 시설의 이용을 제한할 수 있습니다.</li>
                                </ul>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className="Acc2" expanded={expanded === 'panel2'} onChange={handleChange('panel2')}
                               style={{
                                   backgroundColor: "rgba(253,249,255,0.36)",
                                   border: '1px solid #ba68c8',
                                   borderRadius: '5px',
                               }}>
                        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header"
                                          style={{
                                              backgroundColor: "rgba(225,183,246,0.66)",
                                              borderRadius: '5px',
                                              padding : '5px',
                                              paddingLeft :' 20px',

                                          }}>
                            <Typography sx={{
                                color: 'black',
                                fontSize: '18px',
                                fontWeight : 'bold',
                            }}>이용자 준수사항</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                <ul>
                                    <li>&nbsp;○ 대관 시간에는 준비 및 마무리 시간이 포함되며 입·퇴실시간을 지켜주세요.</li>
                                    <li>&nbsp;○ 사용 허가를 받은 사람은 관리자의 승인없ㄷ이 허가사항을 타인에게 양도/전대하지 못하며 이를 위반할 경우 사용허가를 취소합니다.
                                    </li>
                                    <li>&nbsp;○ 폭언, 막말, 모욕 등의 행위 시 이후 대관 사용이 제한됩니다.</li>
                                    <li>&nbsp;○ 대관 시설 내에 음식물 반입 및 섭취, 음주는 금지합니다.</li>
                                    <li>&nbsp;○ 개인 소지의 전기포트, 버너, 온풍기 등 모든 종류의 전열, 가열기구는 반입하실 수 없습니다.</li>
                                    <li>&nbsp;○ 대관 사용 후 정리정돈 및 책상/의자/마이크 등 기자재 정위치 바랍니다.</li>
                                    <li>&nbsp;○ 대관 시 음향, 빔프로젝터, 책상 등을 이용자가 직접 세팅합니다. 작동 오류 등이 발생하였을 경우에 문의하시면 세종여성플라자
                                        직원이 안내해 드립니다.
                                    </li>
                                    <li>&nbsp;○ 기본 설치된 기자재 이외의 노트북, 빔프로젝터 포인터 등 기타 필요한 장비는 각 이용자가 준비하여야 합니다. (빔 프로젝터 연결
                                        시 노트북에 HDMI단자 개별 준비)
                                    </li>
                                    <li>&nbsp;○ 이용자가 사용 기간 중에 그 사용과 관련하여 필요한 시설물 및 장비 등을 설치할 때는 사전에 관리자에게 승인을 받아야 하며 설치
                                        및 철거 비용은 이용자가 부담합니다.
                                        이용자는 사용기간 종료와 동시에 설치한 시설물 등을 철거하고 원상복구 하여야 합니다. 원상복구를 하지 않은 경우 세종여성플라자에서 직접
                                        원상복구하고 그 비용을 이용자로부터 징수합니다.
                                    </li>

                                </ul>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className="Acc3" expanded={expanded === 'panel3'} onChange={handleChange('panel3')}
                               style={{
                                   backgroundColor: "rgba(253,249,255,0.36)",
                                   border: '1px solid #ba68c8',
                                   borderRadius: '5px',
                               }}>
                        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header"
                                          style={{
                                              backgroundColor: "rgba(225,183,246,0.66)",
                                              borderRadius: '5px',
                                              padding : '5px',
                                              paddingLeft :' 20px',
                                          }}>
                            <Typography sx={{
                                color: 'black',
                                fontSize: '18px',
                                fontWeight : 'bold',
                            }}>방역관련 안내</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                <ul>
                                    <li>&nbsp;○ 모든 참가자는 마스크를 착용해 주십시오.</li>
                                    <li>&nbsp;○ 카페테리아 이외의 공간에서는 모든 종류의 음식물 섭취는 불가합니다.</li>
                                    <li>&nbsp;○ 수시로 공간을 환기해 주세요.</li>
                                    <li>&nbsp;○ 세종여성플라자는 방역물품(손소독제)을 제공해 드립니다.</li>
                                    <li>&nbsp;○ 대관일에 시행하는 방역수칙 및 사회적 거리두기의 기준을 준수해주세요.</li>
                                </ul>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className="Acc4" expanded={expanded === 'panel4'} onChange={handleChange('panel4')}
                               style={{
                                   backgroundColor: "rgba(253,249,255,0.36)",
                                   border: '1px solid #ba68c8',
                                   borderRadius: '5px',
                               }}>
                        <AccordionSummary aria-controls="panel4d-content" id="panel4d-header"
                                          style={{
                                              backgroundColor: "rgba(225,183,246,0.66)",
                                              borderRadius: '5px',
                                              padding : '5px',
                                              paddingLeft :' 20px',
                                          }}>
                            <Typography sx={{
                                color: 'black',
                                fontSize: '18px',
                                fontWeight : 'bold',
                            }}>주차 및 출입 안내</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                <ul>
                                    <li>&nbsp;○ 주차공간이 매우 협소합니다. 가급적 대중교통을 이용해주세요.</li>
                                    <li>&nbsp;○ 세종여성플라자 방문 시 가까운 출입구는 지상 1층 3번 출입구, 지하주차장 3번 출입구입니다.</li>
                                    <li>&nbsp;○ 엘리베이터는 2,3호기를 이용하셔야 합니다. 이 엘리베이터만 4층까지 운행하며, 1층 집현(책방) 맞은편에 있습니다.</li>
                                    <li>&nbsp;○ 본 기관이 위치한 새롬종학복지센터는 오전 9시 이전, 오후 6시 이후에는 외부인이 출입할 수 없습니다. 출입 시간을 참고하여
                                        행사를 진행해주세요.
                                    </li>
                                    <li>&nbsp;○ 새롬종합복지센터는 유료 주차장으로 운영되고 있습니다. (최대 3시간 무료주차, 이후 10분당 200원 부과/1일 최대
                                        10,000원 부과) 세종여성플라자 인근 무료주차장은 나성동 백화점부지가 있습니다 (무료 주차장 주소: 세종시 나성동 361-54)
                                    </li>
                                </ul>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className="Acc5" expanded={expanded === 'panel5'} onChange={handleChange('panel5')}
                               style={{
                                   backgroundColor: "rgba(253,249,255,0.36)",
                                   border: '1px solid #ba68c8',
                                   borderRadius: '5px',
                               }}>
                        <AccordionSummary aria-controls="panel5d-content" id="panel5d-header"
                                          style={{
                                              backgroundColor: "rgba(225,183,246,0.66)",
                                              borderRadius: '5px',
                                              padding : '5px',
                                              paddingLeft :' 20px',
                                          }}>
                            <Typography sx={{
                                color: 'black',
                                fontSize: '18px',
                                fontWeight : 'bold',
                            }}>쓰레기 분리수거 안내</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                <ul>
                                    <li>&nbsp;○ 재활용쓰레기를 비치된 분리수거함에 분리 배출합니다.</li>
                                    <li>&nbsp;○ 음식물쓰레기 발생 시 모든 음식물쓰레기를 가져가셔야 합니다. (본 건물은 음식물쓰레기 처리시설이 없습니다)</li>
                                </ul>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </div>
            <Stack className={styles.buttonWrap} spacing={2} direction="row">
                <Button className={styles.button}
                        onClick={redirectToURL}
                        style={{
                            width: "150px",
                            height: "50px",
                            backgroundColor: "#a38ced",
                            color: "rgb(255,255,255)",
                            borderRadius: '5px',
                            fontSize: "20px",
                            fontWeight: "bold",
                        }}>대관신청하기</Button>
            </Stack>

        </div>
    );
}