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
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getDate() <= 15 ? currentDate.getMonth() : currentDate.getMonth() + 1;
const daysInCurrentMonth = daysInMonth(currentYear, currentDate.getMonth());
let stringToCopy = '';

for (let day = 0; day < daysInCurrentMonth; day++) {
    const stringedDate = `${currentYear}-${zeroBeforeDate(currentMonth)}-${zeroBeforeDate(day + 1)}`;

    if (isHoliday(stringedDate) || day % 7 === 6 || day % 7 === 5) {
        stringToCopy = stringToCopy.concat((`${day + 1}.${zeroBeforeDate(currentMonth)} 0 \n`));
    }

    else {
        stringToCopy = stringToCopy.concat((`${day + 1}.${zeroBeforeDate(currentMonth)} 8 \n`));
    }
}

clipboardy.writeSync(stringToCopy);
clipboardy.readSync();
