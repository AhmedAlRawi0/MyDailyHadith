import React from 'react';
import '../styling/Header.css';
import momentHijri from 'moment-hijri';
import 'moment-timezone';

const Header = ({ language }) => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString(language === 'French' ? 'fr-FR' : 'en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const capitalizeAndFormatFrenchDate = (str) => {
        if (language === 'French') {
            const parts = str.split(' ');

            const capitalizedParts = parts.map((word, index) =>
                index === 0 // Capitalize only the first letter of the first word (weekday)
                    ? word.charAt(0).toUpperCase() + word.slice(1).toLocaleLowerCase('fr-FR')
                    : word.charAt(0).toUpperCase() + word.slice(1).toLocaleLowerCase('fr-FR')
            );

            const [weekday, day, month, year] = capitalizedParts; // Add commas to separate the parts
            return `${weekday}, ${day} ${month}, ${year}`;
        }
    };
    const capitalizedFormattedFrenchDate = capitalizeAndFormatFrenchDate(formattedDate);
    
    const hijriDate = momentHijri().format('iYYYY/iMMMM/iD'); // Hijri date

    return (
        <header>
            <h1>{language === 'English' ? 'Hadith of the Day' : 'Hadith du Jour'}</h1>
            <h2>
                {language === 'English' ? formattedDate : capitalizedFormattedFrenchDate} | {hijriDate}
            </h2>
        </header>
    );
};

export default Header;