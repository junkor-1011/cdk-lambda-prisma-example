import {
  Aws,
  Duration,
  Stack,
  StackProps,
  aws_apigateway as apigateway,
  aws_lambda as lambda,
} from 'aws-cdk-lib';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class PrismaLambdaAppStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const helloLambda = new NodejsFunction(this, 'HelloLambda', {
      entry: 'packages/lambda/functions/hello/get.ts',
      handler: 'lambdaHandler',
      runtime: lambda.Runtime.NODEJS_16_X,
      bundling: {
        sourceMap: true,
        minify: true,
      },
    })

    const api = new apigateway.RestApi(this, 'exampleApiGateway', {
      restApiName: `testapp-apigateway`,
    });
    api.root.addMethod('GET', new apigateway.LambdaIntegration(helloLambda))
  }
}
