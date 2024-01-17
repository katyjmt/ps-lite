export default function PriceBlock() {
  return (
    <>
      <div className="price-block">
        {/* TO DO: Update price dynamically. If page count 0-200, $75, else 200+ $80*/}
        <h2>{price}</h2>
        <p>(+$5 for 200+ pages)</p>
      </div>
    </>
  )
}