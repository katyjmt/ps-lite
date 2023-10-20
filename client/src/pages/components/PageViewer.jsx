
function PageOptionCard({ page }) {
  return (
    <>
      <div className="page-option-card">
        <h3 className="page-title">{page.title}</h3>
        <p className="page-description">{page.desc}</p>
        {/* TO DO: Add section button - when clicked, page is added to array of pages and style is updated */}
      </div>
    </>
  )
}

function PageDisplay({ page }) {
  return (
    <>
    {/* If user clicks on a given PageOptionCard, page jpg is rendered here */}
    </>
  )
}

function PageOptionsContainer({ pages }) {
  const cards = projects.map((page) => (
    <PageOptionCard key={page.title} page={page} />
  ));

  return <div className="page-options">{cards}</div>;
}

export default function PageViewer() {
  return (
    <>
      <div className="page-selection-container">
        <div className="page-view">

        </div>
        {/* TO DO: Import pageData from db */}
        <PageOptionsContainer pages={pageData}/>
      </div>
    </>
  )
}