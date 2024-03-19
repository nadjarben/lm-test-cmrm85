import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from './Input';

describe('Input Component', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    render(<Input id="test-input" value="test" onChange={mockOnChange} color="blue" placeholder="Test Input" />);
  });

  test('renders with placeholder', () => {
    expect(screen.getByPlaceholderText('Test Input')).toBeInTheDocument();
  });

  test('renders with correct value', () => {
    expect(screen.getByDisplayValue('test')).toBeInTheDocument();
  });

  test('calls onChange handler when edited', () => {
    const input = screen.getByPlaceholderText('Test Input');
    fireEvent.change(input, { target: { value: 'new value' } });

    expect(mockOnChange).toHaveBeenCalled();
  });

  test('updates visual style based on color prop', () => {
    const input = screen.getByPlaceholderText('Test Input');
    expect(input).toHaveClass('focus:border-blue-500');
  });
});
