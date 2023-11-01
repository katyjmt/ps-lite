import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
dayjs.extend(isSameOrBefore);
import { StyledMonthSelector } from "./styles/MonthSelector.styled";
import { NextBackButtons } from "./Button";

const START_DATE = dayjs("2023-01-01");
const END_DATE = dayjs("2023-12-31");

const getDateArr = (from, to) => {
  // Create a copy of the from variable
  let curr = from.clone();
  // Array to add dates to
  const result = [];
  do {
    // Push current date into array
    result.push(curr.clone());
    // Add a month to the current date
    curr = curr.add(1, "M");
    // Repeat while from is less than to
  } while (curr.isSameOrBefore(to));

  return result;
};
const dateArr = getDateArr(START_DATE, END_DATE);

export function MonthSelector({
  startDateArrIndex,
  setStartDateArrIndex,
  endDateArrIndex,
  setEndDateArrIndex,
  handlePageChange
}) {
  return (
    <>
      <StyledMonthSelector>
        <select
          id="start-month-dropdown"
          value={startDateArrIndex}
          onChange={(e) => setStartDateArrIndex(parseInt(e.target.value))}
        >
          <option value="" disabled selected>
            Start Month
          </option>
          {dateArr.map((date, i) => (
            <option key={i} value={i}>
              {date.format("MMMM, YYYY")}
            </option>
          ))}
        </select>
        <select
          id="end-month-dropdown"
          value={endDateArrIndex}
          onChange={(e) => setEndDateArrIndex(parseInt(e.target.value))}
        >
          <option value="" disabled selected>
            End Month
          </option>
          {dateArr.map((date, i) => (
            <option key={i} value={i}>
              {date.format("MMMM, YYYY")}
            </option>
          ))}
        </select>
      </StyledMonthSelector>
      <NextBackButtons previousPage="SelectDayLayout" nextPage="DailyPages" handlePageChange={handlePageChange}/>
      <div>
        <h2>Selected Months:</h2>
        <ul>
          <li key={startDateArrIndex}>{startDateArrIndex}</li>
          <li key={endDateArrIndex}>{endDateArrIndex}</li>
        </ul>
      </div>
    </>
  );
}

// https://day.js.org/docs/en/display/difference -- Find difference in months between start month
// and end month selected by user to get length of iteration for page query data
// For example, if user selects page A, use QUERY_SINGLE_PAGE data starting from start month index
// and loop through for difference in month to return PDF files and add them to an array
// then use 'pdf-lib' pdfDoc.getPageCount() to loop through that array and add page count
