export default function MonthSelector () {
  return (
    <>
      <form action="#">
        <input className="date-selector" type="date" name="start-month" id="start-month" />
        <input className="date-selector" type="date" name="end-month" id="end-month" />
      </form>
    </>
  )
}