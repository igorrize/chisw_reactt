import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom";

function Employees() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch("localhost:3000/api/v1/employees")
      .then((response) => response.json())
      .then((data) => setEmployees(data))
      .catch((error) => console.error('Error fetching employees:', error));
  }, []);

  return (
    <div>
      <h1>Employee List</h1>
      <ul>
        {employees.map((employee) => (
          <li key={employee.id}>
            {employee.name}
            <Link to={`/employee/${employee.id}`}>
              <button>Show Details</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Employees;
