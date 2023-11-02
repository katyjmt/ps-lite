import { StyledPageSelector } from "./styles/PageSelector.styled";
import { PageViewer } from "./PageViewer";
import { NextBackButtons } from "./Button";
import { useQuery } from "@apollo/client";
import { QUERY_SINGLE_CATEGORY } from "../../utils/queries";

export function DailyPages({
  handlePageChange,
  handlePageIdsSelected,
  pageIdsSelected,
}) {
  const { loading, data } = useQuery(QUERY_SINGLE_CATEGORY, {
    variables: { categoryName: "daily" },
  });

  const categoryData = data?.category || [];

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <StyledPageSelector>
      <h2>Step 3: Select page layouts</h2>
      <div>Select your preferred daily layout from the options below.</div>
        <PageViewer
          categoryData={categoryData}
          pgId="6541db4e2eb0022c42376f58"
          pageIdsSelected={pageIdsSelected}
          handlePageIdsSelected={handlePageIdsSelected}
        />
      </StyledPageSelector>
      <NextBackButtons
        previousPage="MonthSelector"
        nextPage="MonthlyPages"
        handlePageChange={handlePageChange}
      />
    </>
  );
}
