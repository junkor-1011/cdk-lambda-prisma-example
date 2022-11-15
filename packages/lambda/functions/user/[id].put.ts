import 'source-map-support/register';

import { z } from 'zod';
import { PrismaClient } from '@prisma/client';
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

const requestBodySchema = z.object({
  name: z.string(),
  rank: z.number(),
});

export const lambdaHandler = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  });
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { id: _id } = event.pathParameters as any; // TMP
    if (typeof _id !== 'string') {
      throw new Error('id is wrong');
    }
    const id = Number(_id);

    const requestBody = requestBodySchema.parse(JSON.parse(event.body ?? ''));

    const user = await prisma.user.upsert({
      where: {
        id,
      },
      update: {
        ...requestBody,
      },
      create: {
        id,
        ...requestBody,
      },
    });
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
