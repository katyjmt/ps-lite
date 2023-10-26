// ***CHECK WHY REQUIRE NOT WORKING

// const dayjs = require('dayjs');
import dayjs from 'dayjs';
// const isoWeek = require('dayjs/plugin/isoWeek');
import isoWeek from 'dayjs/plugin/isoWeek';
dayjs.extend(isoWeek);

// User selection for start month - should return a date 
// for the first of that month (do I need to format this?)
// const startMonthFirstDay = document.querySelector(...)

// User selection for end month - should return a date 
// for the last day of that month
// const endMonthLastDay = document.querySelector(...)

// const startDate = dayjs(startMonthFirstDay);
// const endDate = dayjs(endMonthLastDay);
// const isoStartWeek = startDate.isoWeek();
// const isoEndWeek = endDate.isoWeek();


const startDate = dayjs('2023-01-01');
const endDate = dayjs('2023-03-31');
const isoStartWeek = startDate.isoWeek();
const isoEndWeek = endDate.isoWeek();

console.log(isoStartWeek);  // This currently gives 52 because 1/1 is a sunday, and week 1 is the first week of the year with a thursday in it
console.log(isoEndWeek);  // This currently gives 13