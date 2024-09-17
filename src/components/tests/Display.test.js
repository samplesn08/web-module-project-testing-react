import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fetchShow from '../../api/fetchShow';
import Display from '../Display';

jest.mock('../../api/fetchShow');

test('component renders without any props', () => {
    render(<Display />);
});

test('displays Show component after fetch button is pressed', async () => {
    render(<Display />);
    const mockFetchShow = fetchShow
    mockFetchShow.mockResolvedValueOnce({
        name: 'Stranger Things', image: 'image.url', summary: 'This is a Stranger Things sumary', seasons: [{}, {}]
    })
    const button = screen.getByRole('button');
    userEvent.click(button);
    await waitFor(() => {
        const h1 = screen.getByText('Stranger Things');
        expect(h1).toBeInTheDocument();
    })
});

test('after fetch, the number of select options is equal to the number of seasons in data', async () => {
    render(<Display />);
    const mockFetchShow = fetchShow;
    mockFetchShow.mockResolvedValueOnce({
        name: 'Stranger Things', image: 'image.url', summary: 'This is a Stranger Things sumary', seasons: [{}, {}]
    })
    const button = screen.getByRole('button');
    userEvent.click(button);
    await waitFor(() => {
        const options = screen.getAllByTestId('season-option');
        expect(options).toHaveLength(2)
    })
});

test('correct function is called when fetch button is clicked', async () => {
    const mockDisplayFunc = jest.fn();
    render(<Display displayFunc={mockDisplayFunc}/>);
    const mockFetchShow = fetchShow
    mockFetchShow.mockResolvedValueOnce({
        name: 'Stranger Things', image: 'image.url', summary: 'This is a Stranger Things sumary', seasons: [{}, {}]
    })
    
    const button = screen.getByRole('button');
    userEvent.click(button);
    await waitFor(() => {
        expect(mockDisplayFunc).toHaveBeenCalled() 
    })
});




///Tasks:
//1. Add in nessisary imports and values to establish the testing suite.
//2. Test that the Display component renders without any passed in props.
//3. Rebuild or copy a show test data element as used in the previous set of tests.
//4. Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
//5. Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
//6. Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.