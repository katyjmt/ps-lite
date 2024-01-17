import { useState, useEffect } from 'react';
import { QUERY_CATEGORIES_BY_TYPE } from "../utils/queries";
import { useQuery } from "@apollo/client";
import { SelectDayLayoutPage } from '../components/SelectDayLayout';
import { MonthSelector } from '../components/MonthSelector';
import { PDFDownload } from '../components/PDFDownload';
import { DailyPages } from '../components/DailyPages';
import { MonthlyPages } from '../components/MonthlyPages';
import { WeeklyPages } from '../components/WeeklyPages';
import { redirect } from 'react-router-dom';
import { startDateValues } from '../utils/startDateValues';
import { endDateValues } from '../utils/endDateValues';

export function CreatePage() { 

  const { loading: catLoading , data: catData } = useQuery(QUERY_CATEGORIES_BY_TYPE,
    {variables: { type: "dateView" }});

  const categories = catData?.categoriesByType || [];

// ----------------------------------------------

  // Array of category objects selected by the user (obj. properties incl. _id, category_name, app_order, type)
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Helper function to add / remove category objects to selectedCategories when user clicks on them
  const handleSelectedCategories = (category) => {
    let updatedCategories;
  
    if (selectedCategories.includes(category)) {
      // Remove the category if it's already selected
      updatedCategories = selectedCategories.filter((cat) => cat !== category);
    } else {
      // Add the new category and then sort the array
      updatedCategories = [...selectedCategories, category];
      updatedCategories.sort((a, b) => a.app_order - b.app_order);
    }
    setSelectedCategories(updatedCategories);
  };

// ----------------------------------------------

  // Array of pages selected by the user
  const [selectedPages, setSelectedPages] = useState([]);

  // Helper function to add / remove page objects to selectedPages
  const handleSelectedPages = (page) => {
    let updatedPages;
  
    if (selectedPages.includes(page)) {
      // Remove the page if it's already selected
      updatedPages = selectedPages.filter((pg) => pg !== page);
    } else {
      // Add the new page
      updatedPages = [...selectedPages, page];
    }
    setSelectedPages(updatedPages);
  };

// ----------------------------------------------
  
  // Define pages associated with category objects
  const categoryToPageComponentMap = {
    daily: "DailyPages",
    weekly: "WeeklyPages",
    monthly: "MonthlyPages",
    // annual: "AnnualPages",
  };

  // State for page displayed within Create container 
  const [currentPage, setCurrentPage] = useState('SelectDayLayout');

  const [pageHistory, setPageHistory] = useState(['SelectDayLayout']); // Initialize with the starting page
  
  const handlePageChange = () => {
    let nextPage;
  
    if (currentPage === 'SelectDayLayout') {
      nextPage = 'MonthSelector';
    } else if (currentPage === 'MonthSelector') {
      if (selectedCategories.length > 0) {
        nextPage = categoryToPageComponentMap[selectedCategories[0].category_name];
      } else {
        nextPage = 'DownloadPDF';
      }
    } else {
      const currentCategoryIndex = selectedCategories.findIndex(cat => 
        categoryToPageComponentMap[cat.category_name] === currentPage
      );
  
      if (currentCategoryIndex >= 0 && currentCategoryIndex < selectedCategories.length - 1) {
        nextPage = categoryToPageComponentMap[selectedCategories[currentCategoryIndex + 1].category_name];
      } else {
        nextPage = 'DownloadPDF';
      }
    }
  
    // Update history before navigating forward
    setPageHistory(history => [...history, nextPage]);
  
    setCurrentPage(nextPage);
  };
  
  const handleBack = () => {
    setPageHistory(history => {
      if (history.length > 1) {
        const newHistory = history.slice(0, -1);
        setCurrentPage(newHistory[newHistory.length - 1]);
        return newHistory;
      }
      return history;
    });
  };
  
// ----------------------------------------------

  // State for start date and end date selected by the user
  const [startYearMonthDay, setStartYearMonthDay] = useState();
  const [startisoYearWeek, setStartIsoYearWeek] = useState();
  const [endYearMonthDay, setEndYearMonthDay] = useState();
  const [endisoYearWeek, setEndIsoYearWeek] = useState();

// ----------------------------------------------
  
const findStartIsoWeekValue = (startYearMonthDay) => {
  const dateObj = startDateValues.find(obj => obj.startYearMonthDay === startYearMonthDay);
  return dateObj ? dateObj.startIsoYearWeek : null;
};

const findEndIsoWeekValue = (endYearMonthDay) => {
  const dateObj = endDateValues.find(obj => obj.endYearMonthDay === endYearMonthDay);
  return dateObj ? dateObj.endIsoYearWeek : null;
};

useEffect(() => {
  // console.log({selectedCategories});
  // console.log({selectedPages});
  // console.log(currentPage);
  // console.log(pageHistory);
  // console.log(`StartYearMonthDay is: ${startYearMonthDay}`);
  // console.log(typeof startYearMonthDay); // Should match the type in your array
  // console.log(`EndYearMonthDay is: ${endYearMonthDay}`);
  setStartIsoYearWeek(findStartIsoWeekValue(startYearMonthDay));
  setEndIsoYearWeek(findEndIsoWeekValue(endYearMonthDay));
  // console.log(`Start isoYearWeek is ${startisoYearWeek}`);
  // console.log(`End isoYearWeek is ${endisoYearWeek}`);
}, [startYearMonthDay, endYearMonthDay]);

  // Method checking to see what the value of `currentPage` is. Depending on the value of currentPage, we return the corresponding component to render.
  const renderPage = () => {
    if (currentPage === 'SelectDayLayout') {
      return <SelectDayLayoutPage
        selectedCategories={selectedCategories}
        handleSelectedCategories={handleSelectedCategories}
        currentPage={currentPage} 
        handlePageChange={handlePageChange} 
        categories={categories}
        catLoading={catLoading}
      />
    }
    if (currentPage === 'MonthSelector') {
      return <MonthSelector 
        startYearMonthDay={startYearMonthDay}
        setStartYearMonthDay={setStartYearMonthDay}
        endYearMonthDay={endYearMonthDay}
        setEndYearMonthDay={setEndYearMonthDay}
        handlePageChange={handlePageChange}
        handleBack={handleBack}
      />;
    }
    if (currentPage === 'MonthlyPages') {
      return <MonthlyPages 
        handlePageChange={handlePageChange}
        handleBack={handleBack}
        startYearMonthDay={startYearMonthDay}
        selectedPages={selectedPages}
        handleSelectedPages={handleSelectedPages}
      />;
    }
    if (currentPage === 'WeeklyPages') {
      return <WeeklyPages 
        handlePageChange={handlePageChange}
        handleBack={handleBack}
        startIsoYearWeek={startisoYearWeek}
        selectedPages={selectedPages}
        handleSelectedPages={handleSelectedPages}
      />;
    }
    if (currentPage === 'DailyPages') {
      return <DailyPages 
        handlePageChange={handlePageChange}
        handleBack={handleBack}
        startYearMonthDay={startYearMonthDay}
        selectedPages={selectedPages}
        handleSelectedPages={handleSelectedPages}
      />;
    }
    if (currentPage === 'DownloadPDF') {
      return <PDFDownload 
        selectedPages={selectedPages}
        startYearMonthDay={startYearMonthDay}
        startIsoYearWeek={startisoYearWeek}
        endYearMonthDay={endYearMonthDay}
        endIsoYearWeek={endisoYearWeek}
        handleBack={handleBack}
      />;
    }
    if (currentPage === 'Home') {
      redirect('/');
    }
  };

  return (
    <>
      {/* Here we are calling the renderPage method which will return a component  */}
      {renderPage()}
    </>
  );
}
