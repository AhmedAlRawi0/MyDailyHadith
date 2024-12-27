import { useEffect } from 'react';
import moment from 'moment-timezone';

const useAutoRefresh = (timeZone, action, language) => { // Accept timeZone, action and language as parameters
    useEffect(() => {
        const now = moment.tz(timeZone); // Get current time
        const nextMidnight = moment.tz(timeZone).endOf('day').add(1, 'second'); // Calculate milliseconds until the next 12 AM
        const timeToMidnight = nextMidnight.diff(now);

        const timer = setTimeout(async () => { // Set a timeout to refresh the page at 12 AM
            try {
                const data = await action(language); // Call desired action here
                console.log('Action called successfully:', data);
                window.location.reload(); // Reload the page after calling the action
            } catch (error) {
                console.error(error.message); // Log error if fetching Hadeeth fails
            }
        }, timeToMidnight);

        return () => clearTimeout(timer);
    }, [timeZone, action, language]);
};

export default useAutoRefresh;
