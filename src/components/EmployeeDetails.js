import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

function EmployeeDetails({match}) {
  const {id} = match.params;
  const [employee, setEmployee] = useState({});
  const [assignments, setAssignments] = useState([]);
  const [totalAssignments, setTotalAssignments] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/employees/${id}`)
      .then((response) => response.json())
      .then((data) => setEmployee(data))
      .catch((error) => console.error('Error fetching employee details:', error));

    fetch(`http://localhost:3000/api/v1/employees/${id}/assignments`)
      .then((response) => response.json())
      .then((data) => setAssignments(data))
      .catch((error) => console.error('Error fetching assignments:', error));

    const calculatedTotal = assignments.reduce(
      (total, assignment) => total + parseFloat(assignment.amount),
      0
    );
    setTotalAssignments(calculatedTotal);
  }, [id, assignments]);

  const handleAssignmentChange = (event, assignmentId) => {
    const updatedAssignments = assignments.map((assignment) => {
      if (assignment.id === assignmentId) {
        return {
          ...assignment,
          amount: parseFloat(event.target.value),
        };
      }
      return assigment;
    });
    setAssignments(updatedAssignments);
  };

  const handleSubmit = (assignmentId, updatedAmount) => {
    fetch(`http://localhost:3000/api/v1/assignment/${assignmentId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({amount: updatedAmount}),
    })
      .then((response) => response.json())
      .then((data) => {

        const {assignment, total_assignment} = data;

        setTotalAssignment(total_assignment);
      })
      .catch((error) => console.error('Error updating assigments:', error));
  };

  return (
    <div>
      <h1>Employee Details</h1>
      <p>Employee ID: {id}</p>
      <p>Employee Name: {employee.name}</p>
      <h3>Total Assignments: {totalAssignments}</h3>

      <h2>Assignments</h2>
      <ul>
        {assignments.map((assignment) => (
          <li key={assignment.id}>
            <input
              type="number"
              value={assignment.amount}
              onChange={handleAssignmentChange}
            />
            <button onClick={handleSubmit}>Update</button>
          </li>
        ))}
      </ul>

      <Link to="/">Back to Home</Link>
    </div>
  );
}

export default EmployeeDetails;
