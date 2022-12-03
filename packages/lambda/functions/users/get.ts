import 'source-map-support/register';
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import { prismaClient as prisma } from '$lambda/lib/prisma';

export const lambdaHandler = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  try {
    const users = await prisma.user.findMany();
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'prisma success',
        users,
      }),
    };
    return response;
  } catch (err) {
    console.log(err);
    const response = {
      statusCode: 500,
      body: JSON.stringify({
        message: 'db error',
      }),
    };
    return response;
  }
};
