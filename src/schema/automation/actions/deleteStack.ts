/*!
 * Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import { JsonLS } from "../../../ssmLanguageService";
import { SnippetDefinition } from "../../interfaces";

export const deleteStackInputs: JsonLS.JSONSchema = {
    description: "Deletes an AWS CloudFormation stack.",
    properties: {
        inputs: {
            properties: {
                ClientRequestToken: {
                    description:
                        "A unique identifier for this DeleteStack request. Specify this token if you plan to retry requests so that AWS CloudFormation knows that you're not attempting to delete a stack with the same name. You can retry DeleteStack requests to verify that AWS CloudFormation received them.",
                    type: "string",
                    oneOf: [
                        {
                            pattern: "[a-zA-Z][-a-zA-Z0-9]*",
                            maxLength: 128,
                            minLength: 1,
                        },
                        {
                            pattern: "^{{[ ]{0,1}[a-zA-Z_.]+[ ]{0,1}}}$",
                        },
                    ],
                },
                StackName: {
                    description: "The name or the unique stack ID that is associated with the stack.",
                    type: "string",
                },
                RoleARN: {
                    description:
                        "The Amazon Resource Name (ARN) of an IAM role that AWS CloudFormation assumes to create the stack. AWS CloudFormation uses the role's credentials to make calls on your behalf. AWS CloudFormation always uses this role for all future operations on the stack. As long as users have permission to operate on the stack, AWS CloudFormation uses this role even if the users don't have permission to pass it. Ensure that the role grants the least amount of privileges.\n\nIf you don't specify a value, AWS CloudFormation uses the role that was previously associated with the stack. If no role is available, AWS CloudFormation uses a temporary session that is generated from your user credentials.",
                    type: "string",
                    maxLength: 2048,
                    minLength: 20,
                },
                "RetainResources.member.N": {
                    description:
                        "This input applies only to stacks that are in a DELETE_FAILED state. A list of logical resource IDs for the resources you want to retain. During deletion, AWS CloudFormation deletes the stack, but does not delete the retained resources.\n\nRetaining resources is useful when you can't delete a resource, such as a non-empty S3 bucket, but you want to delete the stack.",
                    type: ["string", "array"],
                },
            },
            required: ["StackName"],
        },
    },
};

export const deleteStackSnippet: SnippetDefinition = {
    label: "Snippet: aws:deleteStack",
    description: "Deletes an AWS CloudFormation stack.",
    body: {
        name: "${1:deleteStack}",
        action: "aws:deleteStack",
        maxAttempts: 1,
        onFailure: "Abort",
        inputs: {
            StackName: "{{stackName}}",
        },
    },
};
