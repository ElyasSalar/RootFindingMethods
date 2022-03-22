import { ReactComponent as EPULogoIcon } from "../assets/svgs/EPU-logo.svg"

const UniversityHeader = () => {
  return (
    <header className="university-header">
      <div className="university-header__description">
        <h1 className="university-header__description-header">
          Engineering Analysis’s Project
        </h1>
        <p className="university-header__description-body">
          This Project is about Finding Root of a Given 
          Equation Using Three Different Methods ,Finally 
          to Show The Results of Using Each one and Representing Their Graphs.
        </p>
      </div>
      <div className="university-header__blue-seprator" />
      <div className="university-header__white-seprator" />
      <div className="university-header__logo">
        <EPULogoIcon />
        <p className="university-header__logo-body">Erbil Polytechnic University</p>
        <p className="university-header__logo-body">2021-2022</p>
      </div>
    </header>
  )
}


export default UniversityHeader