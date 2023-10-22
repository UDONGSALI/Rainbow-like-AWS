import {useEffect, useState} from "react";
import { useLocation } from "react-router-dom";

function usePagination(initialPage) {
    const [activePage, setActivePage] = useState(initialPage);
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const pageFromUrl = parseInt(params.get('page'), 10);
        if (!isNaN(pageFromUrl)) {
            setActivePage(pageFromUrl);
        }
    }, [location.search]);

    return {
        activePage,
        setActivePage
    };
}

export default usePagination;