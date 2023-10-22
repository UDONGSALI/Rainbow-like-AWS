import { useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { SERVER_URL } from "../Common/constants";

export function useTracking(memId) {
    const location = useLocation();

    const saveEventLogToServer = async (logData) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(logData),
        };
        const response = await fetch(`${SERVER_URL}log`, requestOptions);
        return response.json();
    };

    const logEvent = async (eventName, data = {}) => {
        const logData = {
            ...data,
            type: eventName,
            memId,
        };
        await saveEventLogToServer(logData);
    };

    const trackButtonClick = useCallback((event) => {
        if (event.target.tagName === 'BUTTON') {
            const eventData = {
                label: event.target.innerText,
                url: location.pathname
            };
            logEvent("ButtonClick", eventData);
        }
    }, [location]);

    const trackPageView = useCallback(() => {
        const eventData = {
            url: location.pathname
        };
        logEvent("PageView", eventData);
    }, [location]);

    return {
        trackButtonClick,
        trackPageView
    };
}