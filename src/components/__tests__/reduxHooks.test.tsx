import { renderHook } from '@testing-library/react-hooks';
import { useDispatch as originalUseDispatch, useSelector as originalUseSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/Store';
import { useAppDispatch, useAppSelector } from '../../redux/reduxHooks';

// Mock the useDispatch hook
jest.mock('react-redux', () => ({
  ...(jest.requireActual('react-redux') as any),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('useAppDispatch', () => {
  it('should return the useDispatch function', () => {
    const mockDispatch = jest.fn() as AppDispatch;
    (originalUseDispatch as jest.Mock).mockReturnValue(mockDispatch);

    const { result } = renderHook(() => useAppDispatch());

    expect(result.current).toBe(mockDispatch);
  });
});

describe('useAppSelector', () => {
  it('should return the selected value from useSelector', () => {
    const selectedValue = 'selectedValue';
    const mockSelector = jest.fn(() => selectedValue);
    (originalUseSelector as jest.Mock).mockReturnValue(selectedValue);

    const { result } = renderHook(() => useAppSelector(mockSelector));

    expect(result.current).toBe(selectedValue);
    expect(originalUseSelector).toHaveBeenCalledWith(mockSelector);
  });
});
