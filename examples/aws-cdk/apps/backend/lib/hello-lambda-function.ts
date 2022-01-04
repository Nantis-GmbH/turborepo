import { APIGatewayProxyHandler } from "aws-lambda";

export const handler: APIGatewayProxyHandler = async (event) => {
  const name = event.queryStringParameters?.name || "world";

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Hello ${name}`,
    }),
  };
};
