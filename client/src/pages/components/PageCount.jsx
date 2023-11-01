import { useState } from "react"

import { PageCountStyled } from "./styles/PageCount.styled";

export function PageCount() {

  const [count, setCount] = useState(0);

  // TO DO: Add function to count pages based on session storage

  return (
    <PageCountStyled>
      <h2><span>100</span> / 250</h2>
      <p>pages used.</p>
    </PageCountStyled>
  )
}