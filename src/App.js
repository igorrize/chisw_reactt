import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import EmployeeDetails from "./components/EmployeeDetails";
import Employees from "./components/Employees";

function App() {
  return (
    <Router>
      <div>
        <Route path="/" exact component={Employees} />
        <Route path="/employee/:id" component={EmployeeDetails} />
      </div>
    </Router>
  );
}

export default App;
