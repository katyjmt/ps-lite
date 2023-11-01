import { PageCards, Viewer, PageContainer } from "./styles/PageViewer.styled"

import { useQuery } from "@apollo/client";

import { QUERY_SINGLE_PAGE } from '../../utils/queries';

// Cards for each page option
function PageOptionCards({ categoryData, pageIdsSelected, handlePageIdsSelected }) {

  const pages = categoryData.pages;
  const category = categoryData.category_name;

  return (
    <>
      <PageCards>
      <h3>{category} Layouts</h3>
        {pages &&
          pages.map((page) => (
            <div 
            key={page.name} 
            onClick={
              () => handlePageIdsSelected(category, page._id)}
            >
              <p>{page.name}</p>
              {/* TO DO: Add section button - when clicked, page is added to array of pages and style is updated */}
            </div>
          ))
        }
      </PageCards>
    </>
  )
}

// Section to view page jpgs
function PageDisplay({ images }) {

  return (
    <>
      <Viewer>
        <div>
          <img src={images[0]} alt="examplePage" />
        </div>
        <div>
          <img src={images[1]} alt="examplePage2" />
        </div>
      </Viewer>
    </>
  )
}

export function PageViewer({handlePageIdsSelected, pageIdsSelected, categoryData}) {

  const catName = categoryData.category_name;
  const pageImageObject = pageIdsSelected.find(object => object.catName === catName);
  const pgId = pageImageObject.selectedId;

  const { loading, data } = useQuery(QUERY_SINGLE_PAGE,
    {variables: { id: pgId }});

  const pageImages = data?.page.files[0].jpg || [];

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <PageContainer>
        <PageDisplay images={pageImages}/>
        <PageOptionCards categoryData={categoryData} pageIdsSelected={pageIdsSelected} handlePageIdsSelected={handlePageIdsSelected}/>
      </PageContainer>
      <button>Select Layout</button>
      {/* <div>
        <h2>Selected Page Type:</h2>
        <ul>
          {pageIdsSelected.map((pageId) => (
            <li key={pageId.catName}>
              CatName: {pageId.catName}, Id:{pageId.selectedId}
            </li>
          ))}
        </ul>
      </div> */}
    </>
  )
}