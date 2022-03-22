import * as math from "mathjs"
import { useState } from "react"
import UniversityHeader from "./components/UniversityHeader"
import QuestionInput from "./components/QuestionInput"
import MethodSolution from "./components/MethodSolution"
import RootFinding from "./functions/rootFinding"
import { BISECTION_NAME_ID, BISECTION_TABLE_COLUMNS } from "./shared/constants/bisection"
import { useEffect } from "react"
import { NEWTON_RAPHSON_NAME_ID, NEWTON_RAPHSON_TABLE_COLUMNS } from "./shared/constants/newton-raphson"
import { SECANT_NAME_ID, SECANT_TABLE_COLUMNS } from "./shared/constants/secant"

const App = () => {
  const [solutionsData, setSolutionData] = useState()
  const [rootFinding, setRootFinding] = useState()
  const [equation, setEquation] = useState()
  
  const setSolutionDataHandler = (questionInput) => {
    setSolutionData(() => ({
      x0: Number(questionInput.x0),
      x1: Number(questionInput.x1),
      eps: questionInput?.eps && Number(questionInput?.eps),
      i: questionInput?.i && Number(questionInput?.i),
      f: (x) => {
        const parser = math.parser()
        parser.set("x", x)
        try {
          return parser.evaluate(questionInput.f)
        } catch (err) {console.error(`evalate Error: ${err}`)}
      },
      df: (x) => {
        try {
          return math.derivative(questionInput.f, "x").evaluate({x: x})
        } catch (err) {console.error(`derivative Error: ${err}`)}
      },
    }))
    setEquation(questionInput.f)
  }

  useEffect(() => {
    if (solutionsData)
      setRootFinding(new RootFinding(solutionsData))
  }, [solutionsData])
  
  return (
    <div className="home-page">
      <UniversityHeader />
      <h1 className="home-page__heading">
        Bisection Method , Fixed Point Method and Newton - Raphson Method
      </h1>
      <QuestionInput setInformations={setSolutionDataHandler} />
      {solutionsData && rootFinding && (
        <>
          <MethodSolution
            id={BISECTION_NAME_ID}
            name="Bisection Method"
            headings={BISECTION_TABLE_COLUMNS}
            rows={rootFinding.bisection().results}
            equation={equation}
          />
          <MethodSolution
            id={NEWTON_RAPHSON_NAME_ID}
            name="Newton-Raphson Method"
            headings={NEWTON_RAPHSON_TABLE_COLUMNS}
            rows={rootFinding.newtonRaphson().results}
            equation={equation}
          />
          <MethodSolution
            id={SECANT_NAME_ID}
            name="Secant Method"
            headings={SECANT_TABLE_COLUMNS}
            rows={rootFinding.secant().results}
            equation={equation}
          />
        </>
      )}
    </div>
  );
}

export default App;
