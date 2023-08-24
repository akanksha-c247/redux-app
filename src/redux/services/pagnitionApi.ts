import axios, { AxiosResponse } from "axios";
import { GET_FETCH_URL} from "../../utils/constant";

export async function genericApiCall<T>(url:string): Promise<T> {
  try {
    const url = `${GET_FETCH_URL}`
    const response: AxiosResponse<T> = await axios.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
}
