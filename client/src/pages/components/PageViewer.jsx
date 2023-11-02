import { PageCards, Viewer, PageContainer } from "./styles/PageViewer.styled"

import { useQuery } from "@apollo/client";

import { QUERY_SINGLE_PAGE } from '../../utils/queries';

import { useState, useEffect } from 'react';


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

  const [pageImages, setPageImages] = useState(data?.page.files[0].jpg || []);

  // const pageImages = data?.page.files[0].jpg || [];

  useEffect(() => {
    if (!loading) {
      setPageImages(data?.page.files[0].jpg || []);
    }
  }, [data, loading]);

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <PageContainer>
        <PageDisplay images={pageImages}/>
        <PageOptionCards categoryData={categoryData} pageIdsSelected={pageIdsSelected} handlePageIdsSelected={handlePageIdsSelected} updatePageImages={(newImages) => setPageImages(newImages)}/>
      </PageContainer>
    </>
  )
}