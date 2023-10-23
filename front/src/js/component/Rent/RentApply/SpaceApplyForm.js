import React, {useEffect, useState} from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import {SERVER_URL} from "../../Common/constants";
import { useNavigate } from 'react-router-dom';
import SpaceModal from "./SpaceModal";
import RentCalendar from './RentCalender';
import {DataGrid} from "@mui/x-data-grid";
import RentSpace from "./RentSpace";
import RentStatus from "./RentStatus";

function SpaceApplyForm({onSelectdInfo}) {
    const [member, setMember] = useState([]);
    const [spaces, setSpaces] = useState([]);
    const [rent, setRent] = useState([]);
    const [loadingSpaces, setLoadingSpaces] = useState(true);
    const [loadingRent, setLoadingRent] = useState(true);
    const [selectedTimes, setSelectedTimes] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedSpace, setSelectedSpace] = useState(null);
    const [selectedInfo, setSelectedInfo] = useState(null);
    const [mode, setMode] = useState(false);
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const currentMinutes = currentDate.getMinutes();
    const currentTime = `${String(currentHour).padStart(2, '0')}:${String(currentMinutes).padStart(2, '0')}`;

    const navigate = useNavigate();
    const memId = sessionStorage.getItem("memId");


    // 대관내역 불러오기
    useEffect(() => {
        const fetchRentHist = async () => {
            try {
                const response = await fetch(SERVER_URL + 'rent');
                const data = await response.json();
                // console.log('Raw Data:', data);
                setRent((prevRent) => [...prevRent, ...data]); // 이전 상태를 기반으로 업데이트
            } catch (error) {
                alert('대관 장소 정보를 찾을 수 없습니다!');
                console.error(error);
            }
        };

        // 컴포넌트 마운트될 때 한 번만 실행
        fetchRentHist();
    }, []);

    useEffect(() => {
        fetch(SERVER_URL + `members/id/${memId}`)
            .then(response => response.json())
            .then(data => {
                setMember(data);
                // console.log("Raw data:", data);

            })
            .catch(error => {
                alert('대관 예약 신청은 로그인하셔야 가능합니다.');
            });
    }, []);



// 일자 선택
    const handleDateSelect = (selectedDate) => {
        const currentDate = new Date();
        const isSameOrPastDay = new Date(selectedDate) <= currentDate;

        if (isSameOrPastDay) {
            alert("당일은 예약이 불가합니다.");
        } else {
            setSelectedDate(selectedDate);  // 선택된 날짜를 업데이트
        }
    };

    // 시간 배열 관련
    const times = Array(18)
        .fill()
        .map((_, index) => {
            const hours = Math.floor(index / 2) + 9; // 9시부터 시작
            const minutes = index % 2 === 0 ? "00" : "30";
            return `${hours}:${minutes}`;
        }); // "09:00" ~ "17:30"이 담긴 배열 생성

    const timesRows = times.reduce((acc, curr, index) => {
        const rowIndex = Math.floor(index / 9);
        if (!acc[rowIndex]) {
            acc[rowIndex] = [];
        }
        acc[rowIndex].push(curr);
        return acc;
    }, []);

    // 시작 시간과 종료 시간을 기반으로 시간 범위를 생성
    const generateTimeRange = (startTime, endTime) => {
        const start = convertTimeToIndex(startTime);
        const end = convertTimeToIndex(endTime);
        return Array.from({length: end - start + 1}, (_, index) => convertIndexToTime(start + index));

    };

// 시간을 배열의 인덱스로 변환 (예: "09:30" -> 9)
    const convertTimeToIndex = (time) => {
        const [hours, minutes] = time.split(':');
        return parseInt(hours) * 2 + (minutes === '30' ? 1 : 0);
    };

// 배열의 인덱스를 시간으로 변환 (예: 9 -> "09:00")
    const convertIndexToTime = (index) => {
        const hours = Math.floor(index / 2) + 9;
        const minutes = index % 2 === 0 ? '00' : '30';
        return `${String(hours).padStart(2, '0')}:${minutes}`;
    };


    const isTimeAlreadyReserved = (spaceName, selectedTime) => {
        // setRent에서 대관 정보를 가져오고, 해당 장소에 대한 예약된 시간을 추출
        const reservedTimes = rent
            .filter((reservation) => reservation.spaceName === spaceName)
            .map((reservation) => {
                // 대관 정보에서 'rentTime' 값을 기반으로 시작 시간과 종료 시간을 계산
                const [num, unit] = reservation.rentTime.split('/');
                const duration = parseInt(num);
                const startTime = reservation.time;
                const endTime = addTime(startTime, unit, duration);
                return generateTimeRange(startTime, endTime);
            })
            .flat();

        return reservedTimes.includes(selectedTime);
    };
    // 시간 선택 관련
    const handleSelectTime = (spaceName, time) => {
        if (!selectedDate) {
            alert('대관일자를 선택 해주세요.');
            return;
        }

        const currentDateIndex = convertTimeToIndex(currentTime);

        // Check if the selected date is the same as the current date
        const selectedDateIndex = convertTimeToIndex(selectedDate);
        if (selectedDateIndex === currentDateIndex) {
            // Check if selected time is before current time
            const currentTimeIndex = convertTimeToIndex(currentTime);
            const selectedTimeIndex = convertTimeToIndex(time);

            if (selectedTimeIndex < currentTimeIndex) {
                alert('현재 시간 이전의 시간은 선택할 수 없습니다.');
                return;
            }
        }


        // 예약된 시간인지 확인
        if (isTimeAlreadyReserved(spaceName, time)) {
            alert('이미 예약된 시간입니다. 다른 시간을 선택해주세요.');
        } else {
            const existingSelectedTimes = selectedTimes[spaceName] || [];
            let selectedTimeRange = [...existingSelectedTimes];

            // 클릭한 시간이 이미 선택된 범위에 있는지 확인
            const index = selectedTimeRange.indexOf(time);
            if (index !== -1) {
                // 시간이 이미 선택되어 있으면 제거
                selectedTimeRange.splice(index, 1);
            } else {
                // 시간이 선택되어 있지 않으면 추가
                selectedTimeRange.push(time);
            }

            // 선택된 시간을 오름차순으로 정렬
            const sortedTimeRange = selectedTimeRange.sort((a, b) => convertTimeToIndex(a) - convertTimeToIndex(b));

            // 선택된 시간이 연속적인지 확인
            if (!areTimesConsecutive(sortedTimeRange)) {
                alert('연속하여 시간을 선택하셔야 합니다.');
            } else {
                // 시작 시간과 종료 시간 추출
                const startTime = sortedTimeRange[0];
                const endTime = sortedTimeRange[sortedTimeRange.length - 1];

                // "시작 시간 ~ 종료 시간" 형식으로 표시
                // console.log(`선택한 정보: ${selectedDate}, ${spaceName}, ${startTime} ~ ${endTime}`);

                // 선택된 정보를 로그에 출력
                const selectedInfo = {
                    selectedTimeRange,
                    selectedDate,
                    spaceName,
                    rentTime: `${startTime} ~ ${endTime}`,
                    memName: member.name,
                    selectedSpace: spaces.find((space) => space.spaceName === spaceName),  // 선택한 공간 정보 추가
                };

                setSelectedInfo(selectedInfo); // 부모 컴포넌트의 상태 업데이트
                // 선택된 시간 범위를 상태로 업데이트
                setSelectedTimes((prevSelectedTimes) => {
                    const updatedTimes = {...prevSelectedTimes, [spaceName]: sortedTimeRange};
                    return updatedTimes;
                });
            }
        }
    };

// 선택된 시간이 연속적인지 확인하는 함수
    const areTimesConsecutive = (times) => {
        for (let i = 0; i < times.length - 1; i++) {
            const current = convertTimeToIndex(times[i]);
            const next = convertTimeToIndex(times[i + 1]);
            if (next - current !== 1) {
                return false;
            }
        }
        return true;
    };

// 시간에 일정 시간을 더함 (예: "09:00", "시간", 2 -> "11:00")
    const addTime = (time, unit, amount) => {
        const [hours, minutes] = time.split(':');
        const totalMinutes = parseInt(hours) * 60 + parseInt(minutes);
        const addedMinutes = unit.toLowerCase() === '시간' ? amount * 60 : amount;
        const resultMinutes = totalMinutes + addedMinutes;
        const resultHours = Math.floor(resultMinutes / 60);
        const resultMinutesInHour = resultMinutes % 60;
        return `${String(resultHours).padStart(2, '0')}:${String(resultMinutesInHour).padStart(2, '0')}`;
    };


    const redirectToURL = () => {
        if (!selectedInfo) {
            window.alert("대관 일자와 대관 장소, 대관 시간을 선택하세요.");
            return;
        }

        // useNavigate를 사용하여 '/rent/space' 경로로 이동하면서 selectedInfo를 상태로 전달
        // navigate("/rent/apply", { state: { selectedInfo } });
        setMode(true);
    };




    useEffect(() => {
        fetch(SERVER_URL + 'api/spaces')
            .then(response => response.json())
            .then(data => {
                setSpaces(data._embedded.spaces);
                setLoadingSpaces(false);
            })
            .catch(err => {
                console.error(err);
                setLoadingSpaces(false);
            });
    }, []);


    //Space 목록
    const lists = [
        {
            id: 1,
            spaceName: "공유오피스(폴짝)",
            maxPerson: "6명",
            spaceUsage: "소모임",
            rentTime: "1회/2시간",
            rentFee: "무료",
            facilities: "회의용 테이블, 의자",
            imageURL: "https://storage.googleapis.com/rainbow_like/space/1/space1.jpg",

        },
        {
            id: 2,
            spaceName: "공유오피스(반짝)",
            maxPerson: "6명",
            spaceUsage: "소모임",
            rentTime: "1회/2시간",
            rentFee: "무료",
            facilities: "회의용 테이블, 의자",
            imageURL: "https://storage.googleapis.com/rainbow_like/space/2/space2.jpg",

        },
        {
            id: 3,
            spaceName: "공유오피스(활짝)",
            maxPerson: "8명",
            spaceUsage: "개인, 단체 사무",
            rentTime: "1회/2시간",
            rentFee: "무료",
            facilities: "공용 PC 2대, 테이블, 의자, 프린터 1대",
            imageURL: "https://storage.googleapis.com/rainbow_like/space/3/space3.jpg",
            // 다른 행들...
        },
        {
            id: 4,
            spaceName: "상담실(꼼지락)",
            maxPerson: "4명",
            spaceUsage: "상담실, 소모임",
            rentTime: "1회/2시간",
            rentFee: "무료",
            facilities: "쇼파, 테이블, 의자",
            imageURL: "https://storage.googleapis.com/rainbow_like/space/4/space4.jpg",
            // 다른 행들...
        }, {
            id: 5,
            spaceName: "상담실(어슬렁)",
            maxPerson: "4명",
            spaceUsage: "상담실, 소모임",
            rentTime: "1회/2시간",
            rentFee: "무료",
            facilities: "쇼파, 테이블, 의자",
            imageURL: "https://storage.googleapis.com/rainbow_like/space/5/space5.jpg",
            // 다른 행들...
        }, {
            id: 6,
            spaceName: "강의실(혜윰)",
            maxPerson: "24명",
            spaceUsage: "강의실",
            rentTime: "1회/1시간",
            rentFee: "5,000원",
            facilities: "전자 칠판, 전자 교탁, 세미나 테이블, 의자",
            imageURL: "https://storage.googleapis.com/rainbow_like/space/6/space6.jpg",
            // 다른 행들...
        }, {
            id: 7,
            spaceName: "다목적 활동실(라온)",
            maxPerson: "20명",
            spaceUsage: "예술활동 및 운동 등",
            rentTime: "1회/1시간",
            rentFee: "5,000원",
            facilities: "빔, 스크린, 스피커, 노트북(대여), 마이크(유/무선, 핀마이크)",
            imageURL: "https://storage.googleapis.com/rainbow_like/space/7/space7.jpg",
            // 다른 행들...
        },
        {
            id: 8,
            spaceName: "멀티미디어실(하람)",
            maxPerson: "24명",
            spaceUsage: "컴퓨터 관련 강의실",
            rentTime: "1회/1시간",
            rentFee: "20,000원",
            facilities: "컴퓨터, 전자 칠판, 전자 교탁",
            imageURL: "https://storage.googleapis.com/rainbow_like/space/8/space8.jpg",
            // 다른 행들...
        },

    ];

    //칼럼
    const columns = [
        {
            field: 'spaceName',
            headerName: '공간',
            align: 'center',
            headerAlign: 'center',
            width: 350,
            renderCell: (params) => (
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: "4%"}}>
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <span style={{fontSize: "23px", fontWeight: "bold"}}>{params.row.spaceName}</span>
                        <p style={{fontSize: "15px"}}>최대인원 <span
                            style={{fontSize: "18px", fontWeight: "bold"}}>{params.row.maxPerson}</span></p>
                    </div>
                    <div>
                        <img
                            alt={params.row.spaceName}
                            src={params.row.imageURL}
                            style={{width: "350px", height: "250px", padding: "3%", marginLeft: '3%'}}
                        />

                    </div>
                    <div style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center',
                    }}>
                        <SpaceModal spaceInfo={params.row}/>
                    </div>
                </div>),

        },


        {
            field: 'time',
            headerName: '시간 선택',
            flex: 600,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params) => (
                <div style={{margin: 0, padding: 0, width: "100%"}}>
                    <div style={{margin: 0, padding: 0, width: "100%", position: "relative"}}>
                        {/* 시간 선택 버튼들을 표시 */}
                        {timesRows.map((row, rowIndex) => (
                            <div style={{margin: 0, padding: 0, width: "100%"}}
                                 key={rowIndex}>
                                {row.map((time) => (
                                    <button
                                        key={time}
                                        onClick={() => handleSelectTime(params.row.spaceName, time)}
                                        style={{
                                            position: "relative",
                                            alignItems: 'center',
                                            width: '10%',
                                            margin: '3px',
                                            padding: '10px',
                                            fontSize: '12px',
                                            border: '1px solid #cccccc',
                                            backgroundColor: selectedTimes[params.row.spaceName]?.includes(time)
                                                ? "#c9abf5"
                                                : isTimeAlreadyReserved(params.row.spaceName, time)
                                                    ? "lightgray"
                                                    : "white",
                                            cursor: isTimeAlreadyReserved(params.row.spaceName, time)
                                                ? "not-allowed"
                                                : "pointer",
                                        }}
                                        disabled={isTimeAlreadyReserved(params.row.spaceName, time)}
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>
                        ))}
                    </div>

                    <div style={{margin: 0, padding: "10px", width: "100%"}}>
                        {/* 선택된 시간을 표시 */}
                        <b style={{fontSize: "15px"}}>선택된
                            시간: {selectedTimes[params.row.spaceName]?.[0]} ~ {selectedTimes[params.row.spaceName]?.[selectedTimes[params.row.spaceName]?.length - 1]}</b>
                    </div>

                    <div style={{margin: 0, padding: 0, width: "100%"}}>
                        <Stack className="buttonWrap" spacing={2} direction="row" direction="row-reverse">
                            <Button
                                className="button"
                                onClick={redirectToURL}
                                style={{
                                    width: "100px",
                                    height: "50px",
                                    backgroundColor: "#a38ced",
                                    color: "#ffffff",
                                    borderRadius: '5px',
                                    fontSize: "20px",
                                    fontWeight: "bold",
                                    marginRight: "2%",
                                    position: "relative",
                                }}
                            >
                                신청하기
                            </Button>
                        </Stack>
                    </div>
                </div>
            ),

        }
    ]


    if(mode === true){
        return(
            <RentSpace selectedInfo = {selectedInfo} />
        )
    }
    return (

        <div>
            <RentStatus/>
            <RentCalendar onSelectDate={handleDateSelect}/>

            <div style={{marginRight: "20%", marginLeft: "20%", marginBottom: "10%", backgroundColor: 'white'}}>

                {loadingSpaces ? (
                    <p>Loading....</p>
                ) : (
                    <DataGrid className="spaceList"
                              HeadersVisibility="None"
                              columns={columns}
                              rows={lists}
                              getRowId={(params) => params.id}
                              style={{
                                  position: "relative",
                                  width: "100%",
                                  borderRadius: "5px"
                              }}


                              hideFooter={true}
                              rowHeight={400}


                    />

                )}
            </div>
        </div>
    );
}

export default SpaceApplyForm;