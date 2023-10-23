import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Holidays from "date-holidays";
import { SERVER_URL } from "../../Common/constants";

const localizer = momentLocalizer(moment);

export default function RentCalendar ({ onSelectDate }) {
    const [events, setEvents] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        fetchRentHist();
    }, []);

    const fetchRentHist = async () => {
        try {
            const response = await fetch(SERVER_URL + "rent");
            const data = await response.json();

            const hd = new Holidays();
            hd.init("KR");
            const holidays = hd.getHolidays(new Date().getFullYear());

            const formattedRent = data.map((rent) => ({
                id: rent._links?.self?.href?.split("/").pop() || "",
                ...rent,
            }));

            const spaceNameMappings = {
                "공유오피스(폴짝)": "폴짝",
                "공유오피스(반짝)": "반짝",
                "공유오피스(활짝)": "활짝",
                "상담실(꼼지락)": "꼼지락",
                "상담실(어슬렁)": "어슬렁",
                "강의실(혜윰)": "혜윰",
                "다목적 활동실(라온)": "라온",
                "멀티미디어실(하람)": "하람",
            };

            const calendarEvents = formattedRent.map((rentHist) => {
                const modifiedSpaceName =
                    spaceNameMappings[rentHist.space.spaceName] ||
                    rentHist.space.spaceName;

                return {
                    title: modifiedSpaceName,
                    start: new Date(rentHist.rentStdt),
                    end: new Date(rentHist.rentEddt),
                    allDay:
                        rentHist.rentStdt.split("T")[0] === rentHist.rentEddt.split("T")[0],
                    rentHistNum: parseInt(rentHist.id),
                    spaceName: modifiedSpaceName,
                };
            });

            setEvents((prevEvents) => [
                ...prevEvents,
                ...calendarEvents,
                ...formatHolidaysToEvents(holidays),
            ]);
        } catch (error) {
            alert("대관 장소 정보를 찾을 수 없습니다!");
            console.error(error);
        }
    };

    const formatHolidaysToEvents = (holidays) => {
        const events = [];
        holidays.forEach((holiday) => {
            const startDate = new Date(holiday.date);
            const endDate = holiday.end ? new Date(holiday.end) : startDate;

            events.push({
                title: holiday.name,
                start: startDate,
                end: endDate,
                allDay: true,
                isHoliday: true,
            });
        });
        return events;
    };

    const eventStyleGetter = (event) => {
        const spaceColors = {
            폴짝: "#ff0000",
            반짝: "#ff4900",
            활짝: "#e7db47",
            꼼지락: "#2dff00",
            어슬렁: "#3355ff",
            혜윰: "#00077c",
            라온: "#9b4cf3",
            하람: "#49464b",
        };

        if (event.isHoliday) {
            return {
                style: {
                    backgroundColor: "transparent",
                    color: "red",
                    background: "rgba(255,130,130,0.6)",
                    borderRadius: "5px",
                    height: "30px",
                },
            };
        } else {
            const spaceColor = spaceColors[event.title];
            return {
                style: {
                    background: spaceColor,
                    color: "white",
                    height: "30px",
                    overflow: "visible",
                },
                content: (
                    <div>
                        <div>{event.title}</div>
                        {!event.isHoliday && (
                            <div style={{ fontSize: "10px", color: "white", marginTop: "3px" }}>
                                {moment(event.start).format("HH:mm")} -{" "}
                                {moment(event.end).format("HH:mm")}
                            </div>
                        )}
                    </div>
                ),
            };
        }
    };

    const CustomToolbar = (toolbar) => {
        const goToBack = () => {
            toolbar.onNavigate("PREV");
        };

        const goToNext = () => {
            toolbar.onNavigate("NEXT");
        };

        const goToToday = () => {
            toolbar.onNavigate("TODAY");
        };

        const label = () => {
            const date = moment(toolbar.date);
            return (
                <div style={{ textAlign: "center", fontSize: "20px", fontWeight: "bold" }}>
                    <span style={{ fontSize: "35px", fontWeight: "bold" }}>{date.format("YYYY")}.</span>{" "}
                    <span style={{ fontSize: "35px", fontWeight: "bold", marginRight: "15%" }}>{date.locale("ko").format("MM")}</span>
                </div>
            );
        };

        return (
            <div className="rbc-toolbar">
                <span className="rbc-btn-group">
                    <button type="button" onClick={goToBack}>
                        이전
                    </button>
                </span>
                <span className="rbc-btn-group">
                    <button type="button" onClick={goToToday}>
                        오늘
                    </button>
                </span>
                <span className="rbc-btn-group">
                    <button type="button" onClick={goToNext}>
                        다음
                    </button>
                </span>
                <span className="rbc-toolbar-label">{label()}</span>
            </div>
        );
    };

    const handleEventClick = (event) => {
        if (event.isHoliday) return;
        // 이벤트 클릭 시 원하는 작업 수행
    };

    const handleNavigate = (date, view, action) => {
        const today = moment().startOf('day');

        setSelectedDate(date);
        const isHoliday = events.some(
            (event) => event.isHoliday && moment(event.start).isSame(date, "day")
        );

        if (moment(date).isSameOrBefore(today)) {
            alert("대관 예약이 불가합니다.");
            setSelectedDate(null);
            return;
        } else if (isHoliday) {
            alert("이 날은 공휴일입니다. 대관 예약이 불가합니다.");
            setSelectedDate(null);
        } else {
            onSelectDate(moment(date).format("YYYY-MM-DD"));
        }
    };




    return (
        <div>
            <div style={{ width: "100%", display: "flex", justifyContent: "center", marginBottom: "2%" }}>
                <Calendar
                    localizer={localizer}
                    events={events}
                    titleAccessor={(event) => `${event.title} (${moment(event.start).format("HH:mm")} - ${moment(event.end).format("HH:mm")})`}
                    tooltipAccessor={(event) => `${event.title} (${moment(event.start).format("HH:mm")} - ${moment(event.end).format("HH:mm")})`}
                    style={{ height: 800, width: "60%", backgroundColor: 'white' }}
                    eventPropGetter={eventStyleGetter}
                    views={["month"]}
                    onNavigate={handleNavigate}
                    onSelectEvent={handleEventClick}
                    components={{
                        toolbar: CustomToolbar,
                    }}
                />
            </div>
            <div className="rentDate" style={{ display: "flex", marginLeft: "20%", marginRight: "20%", marginBottom: "1%", backgroundColor: 'white' }}>
                <h2>대관일자 <b>ㅣ</b></h2>
                {selectedDate ? (
                    <h4 style={{ textAlign: "center", marginLeft: "1%", marginTop: "2px" }}>{moment(selectedDate).format("YYYY-MM-DD")}</h4>
                ) : (
                    <h4 style={{ color: "#939393", textAlign: "center", marginLeft: "1%", marginTop: "4px" }}>캘린더에서 날짜를 선택하세요.</h4>
                )}
            </div>
        </div>
    );
};