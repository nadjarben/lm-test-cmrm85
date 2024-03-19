import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Checkbox } from './Checkbox';

describe('Checkbox Component', () => {
  test('renders childdren', () => {
    render(
      <Checkbox checked={false} onChange={() => {}}>
        Label
      </Checkbox>
    );
    expect(screen.getByText('Label')).toBeInTheDocument();
  });

  test('toggles checkbox on click', () => {
    const handleChange = jest.fn();
    render(
      <Checkbox checked={false} onChange={handleChange}>
        Click Me
      </Checkbox>
    );

    fireEvent.click(screen.getByLabelText('Click Me'));
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
