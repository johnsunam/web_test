import React from 'react';
import { useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import ManageCategories from "./components/ManageCategories";
import ManageItem from "./components/ManageItem";
import {ICategory} from "./types";

function App() {
  const categories = useSelector((state: any) => state.categories.data);
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">Navbar</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/">All</Link>
                </li>
                {categories.map((category: ICategory) => <li className="nav-item">
                  <Link className="nav-link" to={`/categories/${category.id}`}>{category.title}</Link>
                </li>)}
                <li className="nav-item">
                    <Link className="nav-link" to="/manage-categories">Manage Categories</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <Routes>
            <Route path="/" element={<ManageItem categories={categories}/>} />
            {categories.map((category: ICategory) => <Route path={`/categories/${category.id}`} element={<ManageItem categories={[category]}/>} />)}
            <Route path="/manage-categories" element={< ManageCategories/>} />
          </Routes>
      </div>

    </Router>
  );
}

export default App;
