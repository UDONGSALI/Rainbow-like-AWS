import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
function useSearch(apiBaseUrl, setData, initialValue = { term: '', value: '' }, memId = null, resetPageOnSearch = true) {
    const [searchTerm, setSearchTerm] = useState(initialValue);
    const navigate = useNavigate();
    const location = useLocation();

    const handleSearch = () => {
        const apiUrl = memId
            ? `${apiBaseUrl}/search/${searchTerm.value}/${searchTerm.term}/${memId}`
            : `${apiBaseUrl}/search/${searchTerm.value}/${searchTerm.term}`;

        return fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const formattedData = data.map((item, index) => ({ id: index + 1, ...item }));
                setData(formattedData.reverse());

                if (resetPageOnSearch) {
                    navigate(`${location.pathname}?page=1`);
                }

                return formattedData;
            })
            .catch(error => {
                alert("검색 조건을 확인해주세요!");  // 여기서 알림을 표시합니다.
            });
    };


    return {
        searchTerm,
        setSearchTerm,
        handleSearch
    };
}

export default useSearch;
