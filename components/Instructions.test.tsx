// Instructions.test.tsx
import { render, screen } from '@testing-library/react';
import { Instructions } from './Instructions';

describe('Instructions', () => {
  it('renders the Instructions component with all categories and general instructions', () => {
    render(<Instructions />);
    expect(screen.getByText('Instructions:')).toBeInTheDocument();
    expect(screen.getByText('General')).toBeInTheDocument();
    expect(screen.getByText('Checkbox')).toBeInTheDocument();
    expect(screen.getByText('Input')).toBeInTheDocument();
    expect(screen.getByText('Implement react hook form')).toBeInTheDocument();
    expect(screen.getByText('API')).toBeInTheDocument();
    expect(screen.getByText('FuseJS')).toBeInTheDocument();
    expect(screen.getByText('This assignment should take upto but not limited to 4 hours')).toBeInTheDocument();
  });
});
