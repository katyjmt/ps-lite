import { useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_CATEGORIES } from "../../utils/queries";
import { StyledSelectDayLayout } from "./styles/SelectDayLayout.styled";
import { NextBackButtons } from "./Button";

export function SelectDayLayoutPage({ pageTypesSelected, handlePageTypesSelected, handlePageChange }) {
  
  const { loading , data } = useQuery(QUERY_CATEGORIES);

  const categories = data?.categories || [];

  return (
    <>
      <div>My ideal planner includes the following sections to help me track my appointments and plan my days (select all that apply):</div>
      <StyledSelectDayLayout>
        {loading ? (
          <div>Loading...</div>
        ) : (
          categories &&
            categories.map((category) => (
              <div
                key={category._id}
                onClick={() => handlePageTypesSelected(category.category_name)}
              >
                {category.category_name}
              </div>
            ))
        )}
      </StyledSelectDayLayout>
      <NextBackButtons previousPage="" nextPage="MonthSelector" handlePageChange={handlePageChange} />
      <div>
        <h2>Selected Page Types:</h2>
        <ul>
          {pageTypesSelected.map((pageType) => (
            <li key={pageType.name}>
              {pageType.name}: {pageType.selected ? 'Selected' : 'Not Selected'}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}