import { StyledPageSelector } from "./styles/PageSelector.styled";
import { PageViewer } from "./PageViewer";
import { NextBackButtons } from "./Button";
import { useQuery } from "@apollo/client";
import { QUERY_SINGLE_CATEGORY } from "../../utils/queries";

export function MonthlyPages({
  handlePageChange,
  handlePageIdsSelected,
  pageIdsSelected,
}) {
  const { loading, data } = useQuery(QUERY_SINGLE_CATEGORY, {
    variables: { categoryName: "monthly" },
  });

  const categoryData = data?.category || [];

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <StyledPageSelector>
        <PageViewer
          categoryData={categoryData}
          pgId="6541db4e2eb0022c42376f5c"
          pageIdsSelected={pageIdsSelected}
          handlePageIdsSelected={handlePageIdsSelected}
        />
      </StyledPageSelector>
      <NextBackButtons
        previousPage="DailyPages"
        nextPage="DownloadPDF"
        handlePageChange={handlePageChange}
      />
    </>
  );
}
