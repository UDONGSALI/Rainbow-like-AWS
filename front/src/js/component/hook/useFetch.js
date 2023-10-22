import { useState, useEffect } from "react";

function useFetch(url, initialData = []) {
    const [data, setData] = useState(initialData);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!url) {
            setLoading(false);
            return;
        }
        fetch(url)
            .then(response => response.json())
            .then(fetchedData => {
                setData(fetchedData);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });
    }, [url]);

    return {
        data,
        loading
    };
}

export default useFetch;