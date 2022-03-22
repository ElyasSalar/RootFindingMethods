import { useState } from "react"

const QuestionInput = ({ setInformations }) => {
  const [info, setInfo] = useState({})

  const handleInputChange = (e) => {
    setInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }
  
  const submitHandler = (e) => {
    e.preventDefault()

    setInformations(info)
  }

  return (
    <form className="question-information" onSubmit={submitHandler}>
      <div className="question-information__one-column">
        <label htmlFor="equation">Enter Equation:</label>
        <input
          name="f"
          type="text"
          id="equation"
          placeholder="Equation"
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="first-point">Enter First Point:</label>
        <input
          name="x0"
          type="number"
          id="first-point"
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="epsilon">Enter Epsilon:</label>
        <input
          name="eps"
          type="number"
          step="0.0000000000000001"
          id="epsilon"
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="second-point">Enter Second Point:</label>
        <input
          name="x1"
          type="number"
          id="second-point"
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="iterations">Enter Iterations:</label>
        <input
          name="i"
          type="number"
          id="iterations"
          onChange={handleInputChange}
        />
      </div>
      <button className="question-information__one-column question-information__submit-button" type="submit">Solve</button>
    </form>
  )
}

export default QuestionInput