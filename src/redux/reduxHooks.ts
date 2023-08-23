import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../utils/types';
import { AppDispatch } from './Store';

export const useAppDispatch = () => useDispatch<AppDispatch>();

export function useAppSelector<T>(selector: (state: RootState) => T) {
  return useSelector(selector);
}
