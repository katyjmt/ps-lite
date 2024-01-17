// ***CHECK WHY REQUIRE NOT WORKING

// const dayjs = require('dayjs');
import dayjs from 'dayjs';
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
dayjs.extend(isSameOrBefore);
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

// console.log(isoStartWeek);  // This currently gives 52 because 1/1 is a sunday, and week 1 is the first week of the year with a thursday in it
// console.log(isoStartDay); // This gives 7 as Jan 1st is on a sunday
// console.log(isoStartYear); // this gives 2022
// console.log(isoEndWeek);  // This currently gives 13 
// console.log(isoEndYear); 

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

// console.log(dateArray);

// Function to get array of unique isoYearWeek values to use when querying
// which weekly layout pdf files to get from db (files with matching isoYearWeek values)
function getUniqueIsoYearWeekValues (dateArray) {
  const uniqueIsoYearWeeks = [];

  for (let i = 0; i < dateArray.length; i++) {
    // Convert each to string for later concatenation
    const isoWeek = dateArray[i].isoWeek().toString().padStart(2, '0');
    const isoYear = dateArray[i].isoWeekYear().toString();
    // Concatenate strings, then convert back to number to match db
    const isoYearWeek = Number(isoYear + isoWeek);
    // Push unique isoYearWeek values into array
    if (!uniqueIsoYearWeeks.includes(isoYearWeek)) {
     uniqueIsoYearWeeks.push(isoYearWeek); 
    }
  }

  return uniqueIsoYearWeeks;
}

// Create an array of unique month values, based on user-selected start and end dates
function getUniqueMonthValues(startDate, endDate) {
  const uniqueMonths = [];
  let currentMonth = dayjs(startDate);

  while (currentMonth.isSameOrBefore(endDate, 'month')) {
    uniqueMonths.push(currentMonth.format('M'));
    currentMonth = currentMonth.add(1, "month");
  }

  return uniqueMonths;
}

// Create an array of two year values - one for the start month year, and the second for the following year
function getYearValues(startDate) {
  const years = [];
  let currentDate = dayjs(startDate);

  years.push(currentDate.format('YYYY'));
  currentDate = currentDate.add(1, "year");
  years.push(currentDate.format('YYYY'));

  return years;
}


// console.log(getUniqueIsoYearWeekValues(dateArray));

// console.log(getUniqueMonthValues(startDate, endDate));

// console.log(getYearValues(startDate));