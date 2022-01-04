import { CfnOutput, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import {
  HttpApi,
  HttpMethod,
  CorsHttpMethod,
} from "@aws-cdk/aws-apigatewayv2-alpha";
import { HttpLambdaIntegration } from "@aws-cdk/aws-apigatewayv2-integrations-alpha";
import { join } from "path";

export class BackendStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const httpApi = new HttpApi(this, "HttpApi", {
      createDefaultStage: false,
      corsPreflight: {
        allowHeaders: ["*"],
        allowMethods: [CorsHttpMethod.OPTIONS, CorsHttpMethod.GET],
        allowOrigins: ["*"],
      },
    });

    const helloLambdaFunction = new NodejsFunction(this, "HelloFunction", {
      entry: join(__dirname, "hello-lambda-function.ts"),
    });

    const helloLambdaIntegration = new HttpLambdaIntegration(
      "HelloIntegration",
      helloLambdaFunction
    );

    httpApi.addRoutes({
      path: "/hello",
      methods: [HttpMethod.GET],
      integration: helloLambdaIntegration,
    });

    const apiStage = httpApi.addStage("default", {
      autoDeploy: true,
    });

    new CfnOutput(this, "HttpApiUrl", {
      value: apiStage.url,
      exportName: "HttpApiUrl",
    });
  }
}
