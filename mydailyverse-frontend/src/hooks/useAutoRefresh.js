import { useEffect } from 'react';
import moment from 'moment-timezone';

const useAutoRefresh = (timeZone) => {  // Auto-refresh at 12 AM EST time to refresh the hadeeth + 12 AM Sydney time to send the email at 8 AM EST (12 AM Sydney = 8 AM EST). Both Funct. happen through refreshing
    useEffect(() => {
        const now = moment.tz(timeZone); // Get current time
        const nextMidnight = moment.tz(timeZone).endOf('day').add(1, 'second'); // Calculate milliseconds until the next 12 AM EST, End of today + 1 second
        const timeToMidnight = nextMidnight.diff(now);

        const timer = setTimeout(() => { // Set a timeout to refresh the page at 12 AM
            window.location.reload(); // Reload the page to refresh all state, hitting the backend API
        }, timeToMidnight);

        return () => clearTimeout(timer);
    }, [timeZone]);
};

export default useAutoRefresh;
