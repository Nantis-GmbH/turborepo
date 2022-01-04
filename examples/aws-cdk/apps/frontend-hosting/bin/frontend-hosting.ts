#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { FrontendHostingStack } from "../lib/frontend-hosting-stack";

const app = new cdk.App();
new FrontendHostingStack(app, "FrontendHostingStack", {});
