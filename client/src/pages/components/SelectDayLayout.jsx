  import { useState } from "react";
  import { useQuery } from "@apollo/client";
  import { QUERY_CATEGORIES } from "../../utils/queries";
  import { StyledSelectDayLayout } from "./styles/SelectDayLayout.styled";
  import { NextBackButtons } from "./Button";
  import './styles/styles.css'

  export function SelectDayLayoutPage({ pageTypesSelected, handlePageTypesSelected, handlePageChange }) {
    
    const { loading , data } = useQuery(QUERY_CATEGORIES);

    const categories = data?.categories || [];

    const [selectedCategories, setSelectedCategories] = useState([]);

    const handleCategoryClick = (category) => {
      if (selectedCategories.includes(category.category_name)) {
        setSelectedCategories(selectedCategories.filter((name) => name !== category.category_name));
      } else {
        setSelectedCategories([...selectedCategories, category.category_name]);
      }

      handlePageTypesSelected(category.category_name); // Keep the existing event
    };

    const isCategorySelected = (category) => selectedCategories.includes(category.category_name);

    return (
      <>
        <h2>Step 1: Select page types</h2>
        <div>My ideal planner includes the following sections to help me track my appointments and plan my days (select all that apply):</div>
        <StyledSelectDayLayout>
          {loading ? (
            <div>Loading...</div>
          ) : (
            categories &&
              categories.map((category) => (
                <div
                  key={category._id}
                  onClick={() => handleCategoryClick(category)}
                  className={isCategorySelected(category) ? 'selected' : ''}
                >
                  {category.category_name}
                </div>
              ))
          )}
        </StyledSelectDayLayout>
        <NextBackButtons previousPage="Home" nextPage="MonthSelector" handlePageChange={handlePageChange} />
        {/* <div>
          <h2>Selected Page Types:</h2>
          <ul>
            {pageTypesSelected.map((pageType) => (
              <li key={pageType.name}>
                {pageType.name}: {pageType.selected ? 'Selected' : 'Not Selected'}
              </li>
            ))}
          </ul>
        </div> */}
      </>
    )
  }