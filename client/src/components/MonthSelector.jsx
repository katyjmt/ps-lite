// import dayjs from "dayjs";
// import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
// dayjs.extend(isSameOrBefore);
import { StyledMonthSelector } from "./styles/MonthSelector.styled";
import { Button } from "./Button";
import { ButtonBack } from "./ButtonBack";
import { startDateValues } from "../utils/startDateValues";
import { endDateValues } from "../utils/endDateValues";


// // Set range of months available to the user for selection
// const START_DATE = dayjs("2023-01-01");
// const END_DATE = dayjs("2025-12-31");

// // Create start date dropdown values for available date range
// const getStartDateArr = (fromDate, toDate) => {
//   // Create a copy of the fromDate variable
//   let curr = fromDate.clone();
//   // Array to add dates to
//   const result = [];
//   do {
//     // Push current date into array
//     result.push(curr.clone());
//     // Add a month to the current date
//     curr = curr.add(1, "M");
//     // Repeat while fromDate is less than toDate
//   } while (curr.isSameOrBefore(toDate));

//   return result;
// };
// const startDateArr = getStartDateArr(START_DATE, END_DATE);
// console.log(`Start Date Array: ${startDateArr}`);

// // Create end date dropdown values for available date range
// const getEndDateArr = (fromDate, toDate) => {
//   // Create a copy of the fromDate variable
//   let curr = fromDate.clone();
//   // Array to add dates to
//   const result = [];
//   do {
//     // Push current date into array
//     result.push(curr.endOf('month'));
//     // Add a month to the current date
//     curr = curr.add(1, "M");
//     // Repeat while fromDate is less than toDate
//   } while (curr.isSameOrBefore(toDate));

//   return result;
// };
// const endDateArr = getEndDateArr(START_DATE, END_DATE);
// console.log(endDateArr);

export function MonthSelector({
  startYearMonthDay,
  setStartYearMonthDay,
  endYearMonthDay,
  setEndYearMonthDay,
  handlePageChange,
  handleBack
}) {
  return (
    <>
      <h2>Step 2: Select date range</h2>
      <div>Please choose a start and end month for your planner.</div>
      <StyledMonthSelector>
        <select
          id="start-month-dropdown"
          value={startYearMonthDay}
          onChange={(e) => setStartYearMonthDay(Number(e.target.value))}
        >
          <option value="" disabled selected>
            Start Month
          </option>
          {startDateValues.map((date) => (
            <option key={date.startYearMonthDay} value={date.startYearMonthDay}>
              {date.dropdownValue}
            </option>
          ))}
        </select>
        <select
          id="end-month-dropdown"
          value={endYearMonthDay}
          onChange={(e) => setEndYearMonthDay(Number(e.target.value))}
        >
          <option value="" disabled selected>
            End Month
          </option>
          {endDateValues.map((date) => (
            <option key={date.endYearMonthDay} value={date.endYearMonthDay}>
              {date.dropdownValue}
            </option>
          ))}
        </select>
      </StyledMonthSelector>
      <div className="btn-align">
        <ButtonBack btnLabel="back" handleBack={handleBack} />
        <Button btnLabel="next" handlePageChange={handlePageChange} />
      </div>
      {/* <div>
        <h2>Selected Months:</h2>
        <ul>
          <li key={startDate.startIsoYearWeek}>{startDate}</li>
          <li key={endDate.endIsoYearWeek}>{endDate}</li>
        </ul>
      </div> */}
    </>
  );
}

// https://day.js.org/docs/en/display/difference -- Find difference in months between start month
// and end month selected by user to get length of iteration for page query data
// For example, if user selects page A, use QUERY_SINGLE_PAGE data starting from start month index
// and loop through for difference in month to return PDF files and add them to an array
// then use 'pdf-lib' pdfDoc.getPageCount() to loop through that array and add page count
