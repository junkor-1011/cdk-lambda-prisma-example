import {
  // Aws,
  // Duration,
  Stack,
  StackProps,
  aws_apigateway as apigateway,
  aws_lambda as lambda,
} from 'aws-cdk-lib';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';

const environmentForPrisma = {
  DATABASE_URL: 'postgres://dummy:5443/mydb',
};
const commandHooksForPrisma = {
  beforeInstall(inputDir: string, outputDir: string): string[] {
    return [``];
  },
  beforeBundling(inputDir: string, outputDir: string): string[] {
    return [``];
  },
  afterBundling(inputDir: string, outputDir: string): string[] {
    return [
      `cp ${inputDir}/node_modules/.pnpm/prisma@4.7.1/node_modules/prisma/libquery_engine-rhel-openssl-1.0.x.so.node ${outputDir}`,
      `cp ${inputDir}/packages/lambda/prisma/schema.prisma ${outputDir}`,
    ];
  },
};

export class PrismaLambdaAppStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const helloLambda = new NodejsFunction(this, 'HelloLambda', {
      entry: 'packages/lambda/functions/hello/get.ts',
      handler: 'lambdaHandler',
      runtime: lambda.Runtime.NODEJS_18_X,
      bundling: {
        sourceMap: true,
        minify: true,
      },
    });

    const getUsersLambda = new NodejsFunction(this, 'GetUsersLambda', {
      entry: 'packages/lambda/functions/users/get.ts',
      handler: 'lambdaHandler',
      runtime: lambda.Runtime.NODEJS_18_X,
      bundling: {
        sourceMap: true,
        minify: true,
        commandHooks: commandHooksForPrisma,
      },
      environment: {
        ...environmentForPrisma,
      },
    });

    const getUserByIdLambda = new NodejsFunction(this, 'GetUserByIdLambda', {
      entry: 'packages/lambda/functions/users/[id].get.ts',
      handler: 'lambdaHandler',
      runtime: lambda.Runtime.NODEJS_18_X,
      bundling: {
        sourceMap: true,
        minify: true,
        commandHooks: commandHooksForPrisma,
      },
      environment: {
        ...environmentForPrisma,
      },
    });

    const putUserByIdLambda = new NodejsFunction(this, 'PutUserByIdLambda', {
      entry: 'packages/lambda/functions/users/[id].put.ts',
      handler: 'lambdaHandler',
      runtime: lambda.Runtime.NODEJS_18_X,
      bundling: {
        sourceMap: true,
        minify: true,
        commandHooks: commandHooksForPrisma,
      },
      environment: {
        ...environmentForPrisma,
      },
    });

    const api = new apigateway.RestApi(this, 'exampleApiGateway', {
      restApiName: `testapp-apigateway`,
    });
    api.root.addMethod('GET', new apigateway.LambdaIntegration(helloLambda));

    const users = api.root.addResource('users');
    users.addMethod('GET', new apigateway.LambdaIntegration(getUsersLambda));

    const idOfUser = users.addResource('{id}');
    idOfUser.addMethod('GET', new apigateway.LambdaIntegration(getUserByIdLambda));
    idOfUser.addMethod('PUT', new apigateway.LambdaIntegration(putUserByIdLambda));
  }
}
