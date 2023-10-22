import React from "react";

export function renderStatusCell(params) {
    const currentDate = new Date();
    const recuStdt = new Date(params.recuStdt);
    const recuEddt = new Date(params.recuEddt);
    const eduStdt = new Date(params.eduStdt);
    const eduEddt = new Date(params.eduEddt);
    const recuPerson = params.recuPerson;
    const capacity = params.capacity;

    let statusText = "기타 상태";
    let statusClass = "statusCell";

    if (currentDate < recuStdt) {
        statusText = '접수 대기';
        statusClass += ' WAITING';
    } else if (currentDate >= recuStdt && currentDate <= recuEddt) {
        if (recuPerson >= capacity) {
            statusText = '접수 마감';
            statusClass += ' REGISTRATION_CLOSED';
        } else {
            statusText = '접수 중';
            statusClass += ' REGISTRATION_OPEN';
        }
    } else if (currentDate >= eduStdt && currentDate <= eduEddt) {
        statusText = params.type === 'BUSINESS' ? '사업 중' : '교육 중';
        statusClass += ' PROCESSING';
    } else if (currentDate > recuEddt && currentDate < eduEddt) {
        statusText = params.type === 'BUSINESS' ? '사업 대기' : '교육 대기';
        statusClass += ' WAITING';
    } else if (currentDate >= eduEddt) {
        statusText = params.type === 'BUSINESS' ? '사업 종료' : '교육 종료';
        statusClass += ' ENDED';  // 변경된 부분
    }

    return (
        <div className={statusClass}>
            {statusText}
        </div>
    );
}