import { StyledPDFDownload } from "./styles/PDFDownload.styled"
import { useState, useEffect } from "react";
import { ButtonBack } from "./ButtonBack";

// Import DB Queries
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_FILES, QUERY_WEEKLY_FILES, QUERY_FILES_BY_INTERNAL_ID } from "../utils/queries";
import { CREATE_PDF } from "../utils/mutations";

import { generatePdfFilePaths } from "../utils/pdfGeneratorLogic";



export function PDFDownload({
  selectedPages,
  startYearMonthDay,
  startIsoYearWeek,
  endYearMonthDay,
  endIsoYearWeek,
  handleBack,
}) {

  const [isDataReady, setIsDataReady] = useState(false);

  const [createPDF, { data: pdfData, loading: pdfLoading, error: pdfError }] = useMutation(CREATE_PDF);

  // Function to loop through selectedPages and add non-weekly ids to an array
  function getNonWeeklyIds(data) {
    const nonWeeklyItems = data.filter(item => item.category !== 'weekly');
    const nonWeeklyIds = nonWeeklyItems.map(item => item._id);
    return nonWeeklyIds;
  }
  
  // Function to get only weekly id
  function getWeeklyId(data) {
    const weeklyItem = data.filter(item => item.category === 'weekly');
    const weeklyId = weeklyItem.map(item => item._id);
    return weeklyId;
  }
  
  const nonWeeklyIds = getNonWeeklyIds(selectedPages);
  const weeklyId = getWeeklyId(selectedPages);
  console.log(nonWeeklyIds, weeklyId);

  // Fetch Non-Weekly Page Data
  const { loading: nonWeeklyLoading, data: nonWeekly } = useQuery(QUERY_FILES, {
    variables: {
      pageIds: nonWeeklyIds,
      startYearMonthDay: startYearMonthDay,
      endYearMonthDay: endYearMonthDay,
    },
  });

  // Fetch Weekly Page Data
  const { loading: weeklyLoading, data: weekly } = useQuery(QUERY_WEEKLY_FILES, {
    variables: {
      pageIds: weeklyId,
      startIsoYearWeek: startIsoYearWeek, 
      endIsoYearWeek: endIsoYearWeek
    },
  });

  // Fetch Right-Hand Lined Page Data
  const { loading: linedLoading, data: lined } = useQuery(
    QUERY_FILES_BY_INTERNAL_ID,
    { variables: { internalId: "00032" } }
  );

  const nonWeeklyData = nonWeekly?.fileData || [];
  const weeklyData = weekly?.fileData || [];
  const linedPageData = lined?.fetchFilesByInternalId || [];
  
  // TO DO: Call createPDF function when pdfFilePaths updates
  useEffect(() => {
    console.log({selectedPages});
    console.log({nonWeeklyData});
    console.log({weeklyData});
    console.log({linedPageData});
    console.log({pdfData});
    console.log({isDataReady})
    // console.log({pdfFilePaths});

  }, [nonWeekly, weekly, lined, pdfData, isDataReady]);

  useEffect(() => {
    // Check if all data is available
    if (nonWeekly) {
      setIsDataReady(true);
    }
  }, [nonWeekly, weekly, lined]);

  const handlePDFCreation = async () => {
    try {
      const pdfArray = await generatePdfFilePaths(
        nonWeeklyData,
        weeklyData,
        linedPageData,
        selectedPages
      ); // Assuming this returns the array
      if (pdfArray) {
        createPDF({ variables: { pdfArray } });
      }
    } catch (err) {
      console.error("Error in generatePDFFilePaths: ", err);
    }
  };
  


  useEffect(() => {
    if (isDataReady) {
      handlePDFCreation();
    }
  }, [isDataReady]);



  // // Generate PDF
  // generatePDFDoc(pdfFilePaths);

  return (
    <>
      <StyledPDFDownload>
        <div>
          {nonWeeklyLoading || weeklyLoading || linedLoading || pdfLoading ? (
            <p>Generating your PDF...</p>
          ) : (
            <div>
              <a href="./pdfs/generatedPDF.pdf" target="_blank">
                Download Your Planner PDF
              </a>
              {/* <ButtonBack btnLabel="back" handleBack={handleBack} /> */}
            </div>
            
          )}
        </div>
      </StyledPDFDownload>
    </>
  );
}