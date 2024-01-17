  import { StyledSelectDayLayout } from "./styles/SelectDayLayout.styled";
  import { Button } from "./Button";
  import { ButtonRoute } from "./ButtonRoute";

  export function SelectDayLayoutPage({ selectedCategories, handleSelectedCategories, handlePageChange, categories, catLoading }) {

    // Function to check if category has been added to selectedCategories array
    const isCategorySelected = (category) => selectedCategories.includes(category);

    return (
      <>
        <h2>Step 1: Select page types</h2>
        <div>I'd like my planner to include the following page types (select all that apply):</div>
        <StyledSelectDayLayout>
          {catLoading ? (
            <div>Loading...</div>
          ) : (
            categories &&
              categories.map((category) => (
                <div
                  key={category._id}
                  onClick={() => handleSelectedCategories(category)}
                  className={isCategorySelected(category) ? 'selected' : ''}
                >
                  {category.category_name}
                </div>
              ))
          )}
        </StyledSelectDayLayout>
        <div className="btn-align">
          <ButtonRoute route="/" btnLabel="back"/>
          <Button btnLabel="next" handlePageChange={handlePageChange} />
        </div>
      </>
    )
  }