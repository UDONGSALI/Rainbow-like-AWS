import React, {memo, useEffect, useState} from 'react';
import styles from '../../../css/component/Search/SearchContainer.module.css';
import magnifier2 from "../../../img/layout/magnifier2.png";
import {urlToNameMapping} from "../Stats/urlToNameMapping";
import {useNavigate} from "react-router-dom";
import useFetch from "../hook/useFetch";
import {SERVER_URL} from "../Common/constants";

function SearchContainer() {
    // 1. States
    const [inputValue, setInputValue] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedMenu, setSelectedMenu] = useState('통합 검색');
    const [menuResults, setMenuResults] = useState([]);
    const [eduResults, setEduResults] = useState([]);
    const [postResults, setPostResults] = useState([]);
    const [searchEduUrl, setSearchEduUrl] = useState(null);
    const [searchPostUrl, setSearchPostUrl] = useState(null);

    // 2. Hooks and effects
    const navigate = useNavigate();
    const {data: fetchedEdus, loading: edusLoading} = useFetch(searchEduUrl);
    const {data: fetchedPosts, loading: postsLoading} = useFetch(searchPostUrl);

    useEffect(() => {
        if (!edusLoading && Array.isArray(fetchedEdus)) {
            setEduResults(fetchedEdus.reverse());
        }
    }, [edusLoading, fetchedEdus]);

    useEffect(() => {
        if (!postsLoading && Array.isArray(fetchedPosts)) {
            setPostResults(fetchedPosts.reverse());
        }
    }, [postsLoading, fetchedPosts]);

    // 3. Event Handlers and helpers
    const handleSearchChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSearchSubmit = () => {
        setSearchTerm(inputValue);
        const filteredMenus = Object.entries(urlToNameMapping)
            .filter(([url, label]) => label.includes(inputValue) && !label.includes('관리자'));
        setMenuResults(filteredMenus);
        setSearchEduUrl(`${SERVER_URL}edus/search/eduName/${inputValue}`);
        setSearchPostUrl(`${SERVER_URL}post/search/title/${inputValue}`);
    };


    const handleMenuClick = (url) => {
        navigate(url);
    };

    const getSearchResultCount = () => {
        const filterPosts = (posts) => {
            return posts.filter(post => post.board.boardNum !== 7 && post.board.boardNum !== 8);
        }
        const filteredPostCount = filterPosts(postResults).length;

        switch (selectedMenu) {
            case '메뉴':
                return menuResults.length;
            case '교육':
                return eduResults.length;
            case '게시물':
                return filteredPostCount;
            default:
                return menuResults.length + eduResults.length + filteredPostCount;
        }
    }

    const highlightSearchTerm = (text, searchTerm) => {
        const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
        return <span>
            {parts.map((part, i) => part.toLowerCase() === searchTerm.toLowerCase() ?
                <span key={i} style={{color: 'red'}}>{part}</span> : part)}
        </span>;
    }

    return (
        <div className={styles.searchContainer}>
            <div className={styles.searchBox}>
                <div className={styles.inputGroup}>
                    <input
                        type="text"
                        placeholder="검색어를 입력하세요"
                        value={inputValue}   // 여기를 inputValue로 변경
                        onChange={handleSearchChange}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                handleSearchSubmit();
                            }
                        }}
                    />
                    <button onClick={handleSearchSubmit}>
                        <img src={magnifier2} alt="magnifier" className={styles.magnifier}/>
                    </button>
                </div>
                <h5>"{searchTerm}"에 대한 검색결과 {getSearchResultCount()}건</h5>
            </div>

            {/* 메뉴 부분 */}
            <div className={styles.menu}>
                <button
                    onClick={() => setSelectedMenu('통합 검색')}
                    data-selected={selectedMenu === '통합 검색'}
                >
                    통합 검색
                </button>
                <button
                    onClick={() => setSelectedMenu('메뉴')}
                    data-selected={selectedMenu === '메뉴'}
                >
                    메뉴
                </button>
                <button
                    onClick={() => setSelectedMenu('교육')}
                    data-selected={selectedMenu === '교육'}
                >
                    교육
                </button>
                <button
                    onClick={() => setSelectedMenu('게시물')}
                    data-selected={selectedMenu === '게시물'}
                >
                    게시물
                </button>
            </div>

            <div className={styles.result}>
                {/* 통합 검색 결과 */}
                {selectedMenu === '통합 검색' && (
                    <>
                        <div className={styles.title}>메뉴</div>
                        <div>
                            {menuResults.map(([url, label]) => (
                                <div key={url} style={{margin: '15px', fontSize: '16px'}}>
                            <span onClick={() => handleMenuClick(url)} style={{cursor: 'pointer'}}>
                                {highlightSearchTerm(label, searchTerm)}
                            </span>
                                </div>
                            ))}
                        </div>

                        <div className={styles.title}>교육</div>
                        <div>
                            {eduResults.map(edu => (
                                <div key={edu.eduNum} style={{margin: '15px', fontSize: '16px'}}>
                            <span
                                onClick={() => navigate(`/edu/list/detail/${edu.eduNum}`)}
                                style={{cursor: 'pointer'}}
                            >
                                {highlightSearchTerm(edu.eduName, searchTerm)}
                            </span>
                                </div>
                            ))}
                        </div>

                        <div className={styles.title}>게시물</div>
                        <div>
                            {postResults.map(post => {
                                const boardNum = post.board.boardNum;
                                const postNum = post.postNum;
                                let navigateTo;

                                if (boardNum === 7 || boardNum === 8) return null;

                                if (boardNum === 9) {
                                    navigateTo = `/clubs/${postNum}`;
                                } else if (boardNum === 6) {
                                    navigateTo = `/rent/review/post/${postNum}`;
                                } else {
                                    navigateTo = `/post/detail/${boardNum}/${postNum}`;
                                }

                                return (
                                    <div key={post.postNum} style={{margin: '15px', fontSize: '16px'}}>
                            <span onClick={() => navigate(navigateTo)} style={{cursor: 'pointer'}}>
                                {highlightSearchTerm(post.title, searchTerm)}
                            </span>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}

                {/* 메뉴 검색 결과 */}
                {selectedMenu === '메뉴' && (
                    <div>
                        {menuResults.map(([url, label]) => (
                            <div key={url} style={{margin: '15px', fontSize: '16px'}}>
                <span onClick={() => handleMenuClick(url)} style={{cursor: 'pointer'}}>
                    {highlightSearchTerm(label, searchTerm)}
                </span>
                            </div>
                        ))}
                    </div>
                )}

                {/* 게시물 중 '교육' 카테고리 목록 */}
                {selectedMenu === '교육' && (
                    <div>
                        {eduResults.map(edu => (
                            <div key={edu.eduNum} style={{margin: '15px', fontSize: '16px'}}>
                <span onClick={() => navigate(`/edu/list/detail/${edu.eduNum}`)} style={{cursor: 'pointer'}}>
                    {highlightSearchTerm(edu.eduName, searchTerm)}
                </span>
                            </div>
                        ))}
                    </div>
                )}

                {/* 게시물 중 '게시물' 카테고리 목록 */}
                {selectedMenu === '게시물' && (
                    <div>
                        {postResults.map(post => {
                            if (post.board.boardNum === 7 || post.board.boardNum === 8) return null;

                            const navigateTo = post.boardNum && post.boardNum === 9 ?
                                `/club/${post.postNum}` :
                                `/post/detail/${post.board.boardNum}/${post.postNum}`;

                            return (
                                <div key={post.postNum} style={{margin: '15px', fontSize: '16px'}}>
                        <span onClick={() => navigate(navigateTo)} style={{cursor: 'pointer'}}>
                            {highlightSearchTerm(post.title, searchTerm)}
                        </span>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

export default memo(SearchContainer);
