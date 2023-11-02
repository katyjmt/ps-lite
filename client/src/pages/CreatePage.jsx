import { useState } from 'react';
import { SelectDayLayoutPage } from './components/SelectDayLayout';
import { MonthSelector } from './components/MonthSelector';
import { PDFDownload } from './components/PDFDownload';
import { DailyPages } from './components/DailyPages';
import { MonthlyPages } from './components/MonthlyPages';
import { redirect } from 'react-router-dom';

export function CreatePage() {

  // State for page displayed within Create container 
  const [currentPage, setCurrentPage] = useState('SelectDayLayout');

  // Helper function to update currentPage state
  const handlePageChange = (page) => setCurrentPage(page);

  // State for page types selected
  const [pageTypesSelected, setPageTypesSelected] = useState([
    { name: "daily", selected: false },
    { name: "weekly", selected: false },
    { name: "monthly", selected: false },
    { name: "annual", selected: false },
  ]);

  // Helper functiont to update page types selected by the user
  const handlePageTypesSelected = (categoryName) => {
    const updatedPageTypeState = pageTypesSelected.map(pageType => {
      if (pageType.name === categoryName) {
        return { ...pageType, selected: !pageType.selected };
      }
      return pageType; // Return the unchanged pageType for other elements
    });
    setPageTypesSelected(updatedPageTypeState);
  };

  // State for start date and end date selected by the user
  const [startDateArrIndex, setStartDateArrIndex] = useState();
  const [endDateArrIndex, setEndDateArrIndex] = useState();

  // State for page types selected
  const [pageIdsSelected, setPageIdsSelected] = useState([
    { catName: "daily", selectedId: '' },
    { catName: "weekly", selectedId: '' },
    { catName: "monthly", selectedId: '' },
    { catName: "annual", selectedId: '' },
  ]);

  // Helper function to add page Ids selected by the user
  const handlePageIdsSelected = (categoryName, pageId) => {
    const updatedPageIdsState = pageIdsSelected.map(pageCat => {
      if (pageCat.catName === categoryName) {
        return { ...pageCat, selectedId: pageId };
      }
      return pageCat; // Return the unchanged pageType for other elements
    });
    setPageIdsSelected(updatedPageIdsState);
  };



  // Method checking to see what the value of `currentPage` is. Depending on the value of currentPage, we return the corresponding component to render.
  const renderPage = () => {
    if (currentPage === 'SelectDayLayout') {
      return <SelectDayLayoutPage
        pageTypesSelected={pageTypesSelected}
        handlePageTypesSelected={handlePageTypesSelected}
        currentPage={currentPage} 
        handlePageChange={handlePageChange} 
      />
    }
    if (currentPage === 'MonthSelector') {
      return <MonthSelector 
        startDateArrIndex={startDateArrIndex}
        setStartDateArrIndex={setStartDateArrIndex}
        endDateArrIndex={endDateArrIndex}
        setEndDateArrIndex={setEndDateArrIndex}
        handlePageChange={handlePageChange}
      />;
    }
    if (currentPage === 'DailyPages') {
      return <DailyPages 
        pageIdsSelected={pageIdsSelected}
        handlePageIdsSelected={handlePageIdsSelected}
        pageTypesSelected={pageTypesSelected}
        handlePageChange={handlePageChange}
      />;
    }
    if (currentPage === 'MonthlyPages') {
      return <MonthlyPages 
        pageIdsSelected={pageIdsSelected}
        handlePageIdsSelected={handlePageIdsSelected}
        pageTypesSelected={pageTypesSelected}
        handlePageChange={handlePageChange}
      />;
    }
    if (currentPage === 'DownloadPDF') {
      return <PDFDownload />;
    }
    if (currentPage === 'Home') {
      redirect('/');
    }
  };

  return (
    <>
      {/* Here we are calling the renderPage method which will return a component  */}
      {renderPage(handlePageChange)}
    </>
  );
}
