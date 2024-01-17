import { StyledPageSelector } from "./styles/PageSelector.styled";
import { PageViewer } from "./PageViewer";
import { Button } from "./Button";
import { useQuery } from "@apollo/client";
import { QUERY_CATEGORY_PAGES_IMAGES } from "../utils/queries";
import { useEffect, useState } from "react";
import { ButtonBack } from "./ButtonBack";

export function DailyPages({
  handlePageChange,
  handleBack,
  startYearMonthDay,
  selectedPages,
  handleSelectedPages
}) {

  const { loading, data } = useQuery(QUERY_CATEGORY_PAGES_IMAGES, {
    // skip: !startYearMonthDay,
    variables: { categoryName: "daily", yearMonthDay: startYearMonthDay },
  });
  
  const pageData = data?.categoryPagesAndImages || [];

  useEffect(() => {
    console.log(data);
  }, [data]);

  

// ----------------------------------------------

  // Active page layout state
  const [activeIndex, setActiveIndex] = useState(0);

  // Helper function
  const handleActiveIndex = (index) => {
    setActiveIndex(index);
  };

// ----------------------------------------------

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <StyledPageSelector>
        {pageData[activeIndex] && <PageViewer
          pageData={pageData}
          activeLayout={pageData[activeIndex]}
          handleActiveLayout={handleActiveIndex}
          category="Daily"
          selectedPages={selectedPages}
          handleSelectedPages={handleSelectedPages}
        />}
      </StyledPageSelector>
      <div className="btn-align">
        <ButtonBack btnLabel="back" handleBack={handleBack} />
        <Button btnLabel="next" handlePageChange={handlePageChange} />
      </div>
    </>
  );
}
