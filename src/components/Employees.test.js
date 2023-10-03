import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Employees from './Employees';

test('renders employee list', async () => {

  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: () => Promise.resolve([{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }]),
  });

  render(
    <MemoryRouter>
      <Employees />
    </MemoryRouter>
  );

  await waitFor(() => {
    const employeeList = screen.getAllByRole('listitem');
    expect(employeeList).toHaveLength(2);

    const showDetailsButtons = screen.getAllByText('Show Details');
    expect(showDetailsButtons).toHaveLength(2);
  });
});

