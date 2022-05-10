import {render, screen } from '@testing-library/react';
import ChartList from './ChartList';

test('Testing Failure Message without Data', () => {
    render(<ChartList dataAPI={{}} chart={0} average={{results: []}} />);
    const NoDataFound = screen.getByText(/No Data found./i);
    expect(NoDataFound).toBeInTheDocument();
  });
  
  test('Testing Failure Message with Data', () => {
    render(<ChartList dataAPI={[{parameters: [{parameter: "pm25"}]}]} chart={0} average={{results: [{parameter: "pm25"}]}} />);
    const NoDataFound = screen.queryByText(/No Data found./i);
    expect(NoDataFound).not.toBeInTheDocument();
  });
  
  