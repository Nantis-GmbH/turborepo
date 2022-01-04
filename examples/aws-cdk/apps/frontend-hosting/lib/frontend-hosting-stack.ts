import { Stack, StackProps, RemovalPolicy, CfnOutput } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as S3 from "aws-cdk-lib/aws-s3";
import * as S3Deploy from "aws-cdk-lib/aws-s3-deployment";
import { IBucket } from "aws-cdk-lib/aws-s3";
import { join } from "path";

export class FrontendHostingStack extends Stack {
  public readonly bucket: IBucket;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    this.bucket = new S3.Bucket(this, "Bucket", {
      removalPolicy: RemovalPolicy.DESTROY,
      // Delete all objects on destroy so that the bucket can be destroyed
      autoDeleteObjects: true,
      publicReadAccess: true,
      cors: [
        {
          allowedHeaders: ["*"],
          allowedMethods: [S3.HttpMethods.GET],
          allowedOrigins: ["*"],
          exposedHeaders: ["Date"],
          maxAge: 3600,
        },
      ],
      websiteIndexDocument: "index.html",
      websiteErrorDocument: "index.html",
    });

    new S3Deploy.BucketDeployment(this, "DeployWebsite", {
      sources: [
        S3Deploy.Source.asset(join(__dirname, "..", "..", "frontend", "dist")),
      ],
      destinationBucket: this.bucket,
    });

    new CfnOutput(this, "BucketUrl", {
      value: this.bucket.bucketWebsiteUrl,
      exportName: "FrontendBucketUrl",
    });
  }
}
