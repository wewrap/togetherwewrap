import axios from 'axios'
import type React from 'react'

export const sendRequestThenSetState = async (
  reactStateSetter: React.SetStateAction<any>,
  abortController: AbortController,
  httpMethod: string,
  resource: string
) => {
  try {
    const response = await axios({
      method: httpMethod,
      url: resource,
      withCredentials: true,
      signal: abortController.signal
    });
    reactStateSetter(response.data);
  } catch (error) {
    console.log(error)
    return error
  }
};
