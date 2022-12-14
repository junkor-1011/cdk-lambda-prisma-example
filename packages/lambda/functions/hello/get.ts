import 'source-map-support/register';

import axios, { AxiosResponse } from 'axios';
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

const url = 'http://checkip.amazonaws.com';

export const lambdaHandler = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  let response: APIGatewayProxyResult;

  try {
    /* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */
    const myUrlData: AxiosResponse<string> = await axios(url);
    const myUrl = myUrlData.data.trim();
    response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'hello world',
        url: myUrl,
        queryParams: {
          ...event.queryStringParameters,
        },
      }),
    };
  } catch (err) {
    console.log(err);
    response = {
      statusCode: 500,
      body: JSON.stringify({
        message: 'some error happened',
      }),
    };
  }

  return response;
};
