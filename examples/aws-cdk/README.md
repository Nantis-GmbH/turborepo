# Turborepo AWS-CDK starter

This is an unofficial aws-cdk starter turborepo.

## Prerequisites

### AWS Costs

**Be aware there are costs involved**

_Most likely the costs will be covered by the AWS free tier tough_

### Install dependencies

This project uses npm workspaces, so run `npm install` in the root folder only. Dependencies will be symbolically linked if possible.

### AWS Configuration and AWS-CDK Bootstrap

Before you can deploy resources to an aws account you need to set up an AWS Account and [configure aws cli](https://docs.aws.amazon.com/cli/latest/reference/configure/) by running:

`aws configure`

If you want to deploy to a certain aws region make sure to set `CDK_DEFAULT_ACCOUNT` and `CDK_DEFAULT_REGION`

Bootstrap the CDK Stack by running

`npm run bootstrap`

## Apps and Packages

- `backend`: an [AWS-CDK](https://aws.amazon.com/de/cdk/) version 2 Stack
- `frontend-hosting`: an [AWS-CDK](https://aws.amazon.com/de/cdk/) version 2 Stack
- `frontend`: a [Vite](https://vitejs.dev/) app

- `configuration`: A common configuration folder for `typescript`, `eslint` and `vite`

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
npm run build
```

### Develop

To develop for the frontend run the following command:

```
cd my-turborepo
npm run dev
```

### Deploy

To deploy the application to AWS run the following command:

```
npm run deploy
```

_This will deploy first the backend, copy over its outputs (e.g. API endpoint), build the frontend and then deploy the frontend on frontend-hosting_

### Destroy

If you are done run `npm run destroy` to remove all AWS resources.

## Useful Links

Learn more about the resources used in this app:

- [AWS CDK Overview](https://aws.amazon.com/de/cdk/)
- [AWS CDK V2 Docs and API](https://docs.aws.amazon.com/cdk/api/v2/)
- [AWS CDK Amplify Construct](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-amplify-alpha-readme.html)
