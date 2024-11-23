import { Link } from "react-router-dom";
import '../css/bootstrap.min.css'

const Navbar = () => {
  return (
    // <nav className="navbar navbar-expand-lg bg-body-tertiary">
    //   <Link to="/" className="nav-link">home</Link>
    //   <input type="text" placeholder="Search..." className="nav-input" />
    //   <Link to="/problems" className="nav-link">problems</Link>
      
    //   <Link to="/exams" className="nav-link">exams</Link>
    //   <Link to="/courses" className="nav-link">courses</Link>
    //   <Link to="/login" className="nav-link">login</Link>
    // </nav>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
    <div className="container-fluid">
      <a className="navbar-brand" href="#">Navbar</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor04" aria-controls="navbarColor04" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarColor04">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <Link to="/" className="nav-link active">
              Home
              <span className="visually-hidden">(current)</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/problems" className="nav-link active">
              Problem
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/exams" className="nav-link active">
              Exam
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/courses" className="nav-link active">
              Course
            </Link>         
          </li>
          <li className="nav-item">
            <Link to="/Login" className="nav-link active">
              Login
            </Link>         
          </li>
          {/* <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Dropdown</a>
            <div className="dropdown-menu">
              <a className="dropdown-item" href="#">Action</a>
              <a className="dropdown-item" href="#">Another action</a>
              <a className="dropdown-item" href="#">Something else here</a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="#">Separated link</a>
            </div>
          </li> */}
        </ul>
        <form className="d-flex">
          <input className="form-control me-sm-2" type="text" placeholder="Search..." />
          <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</ button>
        </form>
      </div>
    </div>
  </nav>
  );
};

export default Navbar;