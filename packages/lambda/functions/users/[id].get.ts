import 'source-map-support/register';
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import { prismaClient as prisma } from '$lambda/lib/prisma';

export const lambdaHandler = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { id: _id } = event.pathParameters as any; // TMP
    if (typeof _id !== 'string') {
      throw new Error('id is wrong');
    }
    const id = Number(_id);

    const user =
      await prisma.$queryRaw`SELECT id, name, rank FROM "public"."User" WHERE id = ${id}`;
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'prisma success',
        user,
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
