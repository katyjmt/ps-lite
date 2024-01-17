import { StyledPageSelector } from "./styles/PageSelector.styled";
import { PageViewer } from "./PageViewer";
import { Button } from "./Button";
import { useQuery } from "@apollo/client";
import { QUERY_WEEKLY_CATEGORY_PAGES_IMAGES } from "../utils/queries";
import { useEffect, useState } from "react";
import { ButtonBack } from "./ButtonBack";

export function WeeklyPages({
  handlePageChange,
  handleBack,
  startIsoYearWeek,
  selectedPages,
  handleSelectedPages
}) {

  const { loading, data } = useQuery(QUERY_WEEKLY_CATEGORY_PAGES_IMAGES, {
    // skip: !startYearMonthDay,
    variables: { categoryName: "weekly", isoYearWeek: startIsoYearWeek },
  });
  
  const pageData = data?.weeklyCategoryPagesAndImages || [];

  useEffect(() => {
    console.log(data);
  }, [data]);

  

// ----------------------------------------------

  // Active page layout state
  const [activeIndex, setActiveIndex] = useState(0);

  // Helper function
  const handleActiveLayout = (index) => {
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
          handleActiveLayout={handleActiveLayout}
          selectedPages={selectedPages}
          handleSelectedPages={handleSelectedPages}
          category="Weekly"
        />}
      </StyledPageSelector>
      <div className="btn-align">
        <ButtonBack btnLabel="back" handleBack={handleBack} />
        <Button btnLabel="next" handlePageChange={handlePageChange} />
      </div>
    </>
  );
}
