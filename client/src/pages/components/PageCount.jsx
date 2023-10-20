import { useState } from "react"

export default function PageCount() {

  const [count, setCount] = useState(0);

  // TO DO: Add function to count pages based on session storage

  return (
    <>
      <div className="page-count-container">
        <p className="med-text"><span className="page-count">{___}</span> / 250</p>
        <p>pages used.</p>
      </div>
    </>
  )
}