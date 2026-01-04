import { isWeekendOrHoliday } from 'poland-public-holidays';
import clipboardy from 'clipboardy';

function daysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
}

function zeroBeforeDate(date) {
    if (date.toString().length < 2) {
        return `0${date}`;
    }
    return `${date}`;
}

const currentDate = new Date();
let currentYear = currentDate.getFullYear();
let currentMonth = currentDate.getDate() <= 15 ? currentDate.getMonth() : currentDate.getMonth() + 1;

if (currentMonth === 0) {
    currentMonth = 12;
    currentYear -= 1;
}

const daysInCurrentMonth = daysInMonth(currentYear, currentMonth);
let stringToCopy = '';

for (let day = 1; day <= daysInCurrentMonth; day++) {
    const stringedDate = `${currentYear}-${zeroBeforeDate(currentMonth)}-${zeroBeforeDate(day)}`;

    if (isWeekendOrHoliday(new Date(stringedDate))) {
        stringToCopy = stringToCopy.concat(`${day}.${zeroBeforeDate(currentMonth)} 0 \n`);
    }

    else {
        stringToCopy = stringToCopy.concat(`${day}.${zeroBeforeDate(currentMonth)} 8 \n`);
    }
}

clipboardy.writeSync(stringToCopy);
clipboardy.readSync();
