import axios, { AxiosResponse } from 'axios';
import { GET_FETCH_URL } from '../../utils/constant';

export async function genericApiCall<T>(): Promise<T> {
  try {
    const apiUrl = `${GET_FETCH_URL}`;
    const response: AxiosResponse<T> = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
}

