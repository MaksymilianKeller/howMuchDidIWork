import { isHoliday } from 'poland-public-holidays';
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

let currentMonth = currentDate.getMonth() + 1;
const currentYear = currentDate.getFullYear();

if (currentDate.getDate() <= 15) {
    currentMonth -= 1;
}

const daysInCurrentMonth = daysInMonth(currentYear, currentDate.getMonth());
let stringToCopy = '';

for (let i = 0; i < daysInCurrentMonth; i++) {
    let stringedDate = `${currentYear}-${zeroBeforeDate(currentMonth)}-${zeroBeforeDate(i + 1)}`;

    if (isHoliday(stringedDate) || i % 7 === 6 || i % 7 === 5) {
        stringToCopy = stringToCopy.concat((`${i + 1}.${zeroBeforeDate(currentMonth)} 0 \n`));
    }

    else {
        stringToCopy = stringToCopy.concat((`${i + 1}.${zeroBeforeDate(currentMonth)} 8 \n`));
    }
}

clipboardy.writeSync(stringToCopy);
clipboardy.readSync();
