import 'source-map-support/register';

import { PrismaClient } from '@prisma/client';
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export const lambdaHandler = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  });
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
