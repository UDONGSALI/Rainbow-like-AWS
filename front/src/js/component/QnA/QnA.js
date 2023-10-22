import React, {memo, useState} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from '../../../css/component/QnA/QnA.module.css';


function QnA() {
    const [expandedPanel, setExpandedPanel] = useState(null);  // 현재 확장된 패널의 상태 관리

    const handleAccordionChange = (panel) => (event, isExpanded) => {
        setExpandedPanel(isExpanded ? panel : false);
    }
const accordionData = [
    {
        question: "세종여성플라자는 '여성'만 이용할 수 있나요?",
        answer: "남녀노소 관계없이 세종시민 누구나 자유롭게 이용하실 수 있습니다."
    },
    { question: "세종여성플라자 공간대관은 어떻게 이용 할 수 있나요?",
        answer: "세종여성플라자 운영시간인 평일(월~금)에 공간을 이용하실 수 있습니다. 공간대관 신청 페이지를 통해 비어 있는" +
            "시간과 장소를 확인하고, 대관신청을 하시면 됩니다."
    },
    { question: "세종여성플라자 책마당의 책을 빌릴 수 있나요?",
        answer: "책마당 퐁당은 세종 지역의 유일한 성평등 도서관으로 여성정책,여성주의,인권 등에 대한 도서를 구비하고 있습니다." +
            "아직 대출시스템이 마련되어 있지 않아 당분간 대출은 어렵습니다."
    },
    { question: "세종여성플라자는 창업 지원을 어떻게 해주나요?",
        answer: "창업을 희망하는 예비 창업자 여성들을 대상으로 창업 초기에 필요한 단계의 컨설팅 및 창업 공간을 지원합니다." +
            "2022년에는 요식업 및 카페 창업을 희망하는 예비 창업자들에게 멘토링 등을 진행했습니다."
    },
    { question: "세종여성플라자에서 취업도 알선해 주나요?",
        answer: "여성들의 취업 관련 상담 및 교육은 세종여성플라자와 업무협약을 맺은 세종여성새로일하기센터(취업지원팀 044-863-8219/ 취업교육팀 044-863-8218)에서 전문적으로 서비스를 제공하고 있습니다. "
    },
    { question: "세종여성플라자는 어떤 일을 하나요?",
        answer: "세종여성플라자의 사업은 크게 시민들을 위한 사업과 여성단체 및 관련기관들을 위한 사업이 있습니다. 여성들의 경제적 역량을 강화할 수 있도록 교육을 제공하고 창업 지원 프로그램을 운영하고 있습니다. 또한 다양한 성평등교육 및 문화 프로그램, 소모임 지원사업을 진행하고 있습니다. 활동공간이 필요한 분들에게 세종여성플라자의 공간을 대관을 하고 있습니다. 여성·가족사업을 하는 기관 및 단체들과 네트워크를 통해 여성 정책 발전을 모색하며, 여러 행사를 진행합니다. "
    },
    { question: "세종여성플라자는 어떻게 만들어 졌나요?",
        answer: "세종여성플라자는 세종시가 여성들의 지역사회 참여를 돕고 성평등 문화를 확산하기 위해 설치 하였습니다. 「양성평등기본법」 제45조와 「세종특별자치시 여성플라자 운영에 관한 조례」에 근거하여 운영되고 있습니다. 세종시가 2017년 첫 계획을 세운 후 타당성조사를 하고 여성단체와 시민, 전문가가 참여하는 추진위원회를 운영하는 등 민·관이 함께 준비하여 새롬종합복지센터(새롬로 14) 4층에 공간을 마련하고 2022년 3월 25일 개소하였습니다."
    },
];

        return (
            <div style={{ width: '60%', margin: '0 auto', marginTop: '3em'}}>
                {accordionData.map((data, index) => (
                    <Accordion
                        key={index}
                        expanded={expandedPanel === `panel${index + 1}`}
                        onChange={handleAccordionChange(`panel${index + 1}`)}
                        className={index === 0 ? (expandedPanel ? styles.firstAccordionActive : styles.firstAccordion) : ""}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`panel${index + 1}-content`}
                            id={`panel${index + 1}-header`}
                        >
                            <Typography component="div">
                                <div className={expandedPanel === `panel${index + 1}` ? styles.acodiHeaderActive : styles.acodiHeader}>
                                    <span className={styles.QuestionMark}>Q</span>
                                    <div className={styles.Question}>{data.question}</div>
                                </div>
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails style={{backgroundColor: '#F3F3F3FF'}}>
                            <Typography component="div">
                                <div className={styles.acodInner}>
                                    <span className={styles.answerMark}>A</span>
                                    <div className={styles.answerTxt}>{data.answer}</div>
                                </div>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </div>
        )
    }
export default memo(QnA)