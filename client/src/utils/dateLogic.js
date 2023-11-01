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
const isoStartDay = startDate.isoWeekday();
const isoStartYear = startDate.isoWeekYear();
const isoEndWeek = endDate.isoWeek();
const isoEndYear = endDate.isoWeekYear();

console.log(isoStartWeek);  // This currently gives 52 because 1/1 is a sunday, and week 1 is the first week of the year with a thursday in it
console.log(isoStartDay);
console.log(isoStartYear); 
console.log(isoEndWeek);  // This currently gives 13
console.log(isoEndYear); 

// Function to generate an array of days within user date selection
function getDateArray(startDate, endDate) {
  const days = [];
  let currentDate = dayjs(startDate); // Convert the start date to a Day.js object

  while (currentDate.isBefore(endDate) || currentDate.isSame(endDate, 'day')) {
    days.push(currentDate); // Add the current date to the array
    currentDate = currentDate.add(1, 'day'); // Increment the current date by 1 day
  }

  return days;
}

const dateArray = getDateArray(startDate, endDate);

console.log(dateArray);

// Function to get array of unique isoYearWeek values to use when querying
// which weekly layout pdf files to get from db (files with matching isoYearWeek values)
function getUniqueIsoYearWeekValues (dateArray) {
  const uniqueIsoYearWeek = [];

  for (let i = 0; i < dateArray.length; i++) {
    // Convert each to string for later concatenation
    const isoWeek = dateArray[i].isoWeek().toString();
    const isoYear = dateArray[i].isoWeekYear().toString();
    // Concatenate strings, then convert back to number to match db
    const isoYearWeek = Number(isoYear + isoWeek);
    // Push unique isoYearWeek values into array
    if (!uniqueIsoYearWeek.includes(isoYearWeek)) {
     uniqueIsoYearWeek.push(isoYearWeek); 
    }
  }

  return uniqueIsoYearWeek;
}

console.log(getUniqueIsoYearWeekValues(dateArray));