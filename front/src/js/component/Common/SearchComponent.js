import React, { useState } from 'react';
import styles from '../../../css/component/Common/SearchComponent.module.css';

// 상수 정의
const SEARCH_PLACEHOLDER = "선택";

function SearchComponent({
                             searchTerm,
                             setSearchTerm,
                             totalCount,
                             currentPage,
                             totalPages,
                             onSearch,
                             searchOptions
                         }) {
    // 검색어 변경
    const handleSearchTermChange = (e) => {
        const inputTerm = e.target.value;
        // 검색어 상태만 업데이트하고 실제 검색은 수행하지 않습니다.
        setSearchTerm({ ...searchTerm, term: inputTerm });
    };

    const handleSearchOptionChange = (e) => {
        setSearchTerm({ term: '', value: e.target.value });
    };

    const handleEnterKey = (event) => {
        if (event.key === 'Enter' || event.type === 'click') {
            if (searchTerm.value === '') {  // 검색 옵션이 '선택'인지 확인
                alert('검색 옵션을 선택하세요!');
            } else if (searchTerm.term.trim() === '') {
                alert('검색어를 입력하세요!');
            } else {
                onSearch();
            }
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <span>전체 {totalCount}건</span>
                <span> | </span>
                <span>현재 페이지 {currentPage}/{totalPages} </span>
            </div>
            <div className={styles.right}>
                <select value={searchTerm.value} onChange={handleSearchOptionChange}>
                    <option value="">{SEARCH_PLACEHOLDER}</option>
                    {searchOptions.map((option, index) => (
                        <option key={index} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                {searchOptions.find(option => option.value === searchTerm.value)?.options ? (
                    <select value={searchTerm.term} onChange={handleSearchTermChange}>
                        <option value="">{SEARCH_PLACEHOLDER}</option> {/* 기본값 추가 */}
                        {searchOptions.find(option => option.value === searchTerm.value).options.map((subOption, index) => (
                            <option key={index} value={subOption.value || subOption}>
                                {subOption.label || subOption}
                            </option>
                        ))}
                    </select>
                ) : (
                    <input
                        type="text"
                        placeholder={SEARCH_PLACEHOLDER}
                        value={searchTerm.term}
                        onChange={handleSearchTermChange}
                        onKeyDown={handleEnterKey}
                    />
                )}

                <button onClick={handleEnterKey} onKeyDown={handleEnterKey}>검색</button>
            </div>
        </div>
    );
}

export default SearchComponent;
