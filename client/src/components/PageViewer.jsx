import { PageCards, Viewer, PageContainer, ViewerContainer } from "./styles/PageViewer.styled"
import { useEffect } from "react"

// Cards for each page option
function PageList({ pageData, activeLayout, handleActiveLayout, category, selectedPages }) {

  useEffect(() => {
    console.log({activeLayout});
  }, [activeLayout]);

  return (
    <>
      <PageCards>
        {/* <h3>{category} Page Layouts</h3> */}
        {pageData &&
          pageData.map((pg, index) => {
            // Determine the classes to be applied
            let classes = "";
            if (selectedPages.includes(pg.page)) {
              classes += "added ";
            }
            if (activeLayout === pg) {
              classes += "selected";
            }

            return (
              <div 
                key={pg.page._id} 
                onClick={() => handleActiveLayout(index)}
                className={classes.trim()}
              >
                <p>{pg.page.name}</p>
              </div>
            );
          })
        }
      </PageCards>
    </>
  )
}

// Section to view page jpgs
function PageImages({ activeLayout, handleSelectedPages }) {

  return (
    <ViewerContainer>
      
      <Viewer>
        <div>
          <img src={activeLayout.files[0].jpg[0]} alt={activeLayout.page.name} />
        </div>
        <div>
        <img src={activeLayout.files[0].jpg[1]} alt={activeLayout.page.name} />
        </div>
        <button
        className="select-btn"
        onClick={() => handleSelectedPages(activeLayout.page)}
      >Select this layout</button>
      </Viewer>
      {/* <p>{activeLayout.page.name}</p> */}
      
    </ViewerContainer>
  )
}

export function PageViewer({ pageData, activeLayout, handleActiveLayout, category, selectedPages, handleSelectedPages }) {

  return (
    <>
      <PageContainer>
        <PageImages activeLayout={activeLayout} handleSelectedPages={handleSelectedPages}/>
        <PageList pageData = {pageData} activeLayout={activeLayout} handleActiveLayout={handleActiveLayout} category={category} selectedPages={selectedPages}/>
      </PageContainer>
    </>
  )  
}


// export function PageViewer({handlePageIdsSelected, pageIdsSelected, categoryData}) {

//   const catName = categoryData.category_name;
//   const pageImageObject = pageIdsSelected.find(object => object.catName === catName);
//   const pgId = pageImageObject.selectedId;

//   const { loading, data } = useQuery(QUERY_SINGLE_PAGE,
//     {variables: { id: pgId }});

//   // **** Can I set the base state as an array of default images, then replace with clicked option?
//   // **** First page option should also be default selected
//   const [pageImages, setPageImages] = useState(data?.page.files[0].jpg || []);

//   // const pageImages = data?.page.files[0].jpg || [];

//   useEffect(() => {
//     if (!loading) {
//       setPageImages(data?.page.files[0].jpg || []);
//     }
//   }, [data, loading]);

//   if (loading) {
//     return <div>Loading...</div>
//   }

//   return (
//     <>
//       <PageContainer>
//         <PageDisplay images={pageImages}/>
//         <PageOptionCards categoryData={categoryData} pageIdsSelected={pageIdsSelected} handlePageIdsSelected={handlePageIdsSelected} updatePageImages={(newImages) => setPageImages(newImages)}/>
//       </PageContainer>
//     </>
//   )
// }