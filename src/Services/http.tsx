const BASE_URL = 'https://www.io.pixelsoftwares.com/';

const defaultHeaders = {
  apikey: 'pixel',
};

export const HttpRequest = async (
  endpoint: string,
  method: string = 'GET',
  body?: any
) => {

  try {

    let headers: any = { ...defaultHeaders };
    let requestBody: any = undefined;

    if (method === 'POST' && body) {

      headers['Content-Type'] =
        'application/x-www-form-urlencoded';

      requestBody = Object.keys(body)
        .map(
          key =>
            encodeURIComponent(key) +
            '=' +
            encodeURIComponent(body[key])
        )
        .join('&');

    }

    const response = await fetch(
      BASE_URL + endpoint,
      {
        method,
        headers,
        body: requestBody,
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data?.message || 'API Error'
      );
    }

    return data;

  } catch (error: any) {
    throw error;

  }

};
