import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { genericApiCall } from '../../redux/services/pagnitionApi';

describe('genericApiCall', () => {
  let mockAxios: MockAdapter;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('should return the response data from a successful API call', async () => {
    const responseData = { key: 'value' };
    mockAxios.onGet().reply(200, responseData);

    const result = await genericApiCall<any>();

    expect(result).toEqual(responseData);
  });

  it('should throw an error for a failed API call', async () => {
    const errorMessage = 'Failed to fetch data';
    mockAxios.onGet().reply(500, { message: errorMessage });

    await expect(genericApiCall<any>()).rejects.toThrowError(errorMessage);
  });
});
