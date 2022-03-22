import * as math from "mathjs"
import { useEffect, useRef, useState, useMemo } from "react"
import functionPlot from "function-plot"
import { NEWTON_RAPHSON_NAME_ID } from "../shared/constants/newton-raphson"
import { SECANT_NAME_ID } from "../shared/constants/secant"

const MethodSolution = ({ id, name, headings, rows, equation }) => {
  const [record, setRecord] = useState()
  const plotContainer = useRef()

  const preparedRows = useMemo(
    () => rows.filter((row) => !Number.isNaN(row.nextPoint))
    , [rows])

  useEffect(() => {
    const width = plotContainer.current.offsetWidth
    const height = plotContainer.current.offsetHeight

    try {
      functionPlot({
        target: `#${id}`,
        title: name,
        height,
        width,
        yAxis: { domain: [-10, 10] },
        xAxis: { domain: [-10, 10] },
        grid: true,
        data: [
          {
            points: [
              [record?.x0, record?.fx0],
              [record?.x1, record?.fx1],
            ],
            fnType: "points",
            graphType: "scatter",
          },
          {
            fn: math.parse(equation).toString(),
            derivative: id === NEWTON_RAPHSON_NAME_ID && {
              fn: math.derivative(equation, "x").toString(),
              x0: record?.x0,
            },
            secants: id === SECANT_NAME_ID && [{
              x0: record?.x0,
              x1: record?.x1,
            }]
          }
        ]
      })
    } catch(err) {}
  }, [equation, id, headings, rows, record])

  useEffect(() => {
    const tableContainer = document.querySelector(".method-solution-table-container table")

    if (tableContainer?.scrollIntoView)
      tableContainer.scrollIntoView({ block: "start", inline: "start", behavior: "smooth" })
  }, [rows])

  useEffect(() => {
    setRecord(undefined)
  }, [equation])

  return (
    <section className="method-solution">
      <div id={id} className="method-solution-plot" ref={plotContainer} />
      <div className="method-solution-table-container">
        <table>
          <thead>
            <tr>
              {headings.map((heading) => <th>{heading}</th>)}
            </tr>
          </thead>
          <tbody>
            {preparedRows.map((row) => (
              <tr key={row.step} onClick={() => setRecord(row)}>
                {Object.values(row).map((data, index) => (
                  <td key={`${row.step}-${data}-${index}`}>{data}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default MethodSolution