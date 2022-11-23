# Example of Lambda with Prisma

## Execution

```sh
# example
sam local start-api -t cdk.out/PrismaLambdaAppStack.template.json --env-vars ./env.json --docker-network cdk-lambda-prisma-example_db_network
```

## Refs

Prisma:

- [Prisma - Deploying to AWS Lambda](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-aws-lambda)
- [Prisma - Connection management](https://www.prisma.io/docs/guides/performance-and-optimization/connection-management#serverless-environments-faas)
- [Lambda 関数で Prisma を利用するときの Tips](https://kiririmode.hatenablog.jp/entry/20220619/1655622443)
- [DevelopersIO - AWS CDK の NodejsFunction で Prisma をバンドルして Lambda へデプロイする](https://dev.classmethod.jp/articles/aws-cdk-nodejsfunction-prisma-deploy/)

AWS SAM:

- [AWS Documentation - sam local start-api](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-cli-command-reference-sam-local-start-api.html)
  - `--env-vars`について、任意の環境変数を注入出来る訳ではなく、予めテンプレート(cdk)で該当する環境変数を作っておく必要があることに注意

CDK Snapshot Test:

- [DevelopersIO - AWS CDK v2 のスナップショットテストでアセットを無視する方法](https://dev.classmethod.jp/articles/aws-cdk-v2-unit-test-ignore-assets/)
