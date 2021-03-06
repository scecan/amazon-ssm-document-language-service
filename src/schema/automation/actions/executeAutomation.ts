/*!
 * Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import { JsonLS } from "../../../ssmLanguageService";
import { SnippetDefinition } from "../../interfaces";

export const executeAutomationInputs: JsonLS.JSONSchema = {
    description:
        "Runs a secondary Automation workflow by calling a secondary Automation document. With this action, you can create Automation documents for your most common workflows, and reference those documents during an Automation execution. This action can simplify your Automation documents by removing the need to duplicate steps across similar documents.\n\nThe secondary Automation runs in the context of the user who initiated the primary Automation. This means that the secondary Automation uses the same IAM role or user account as the user who started the first Automation.",
    properties: {
        inputs: {
            properties: {
                DocumentName: {
                    description:
                        "The name of the secondary Automation document to run during the step. The document must belong to the same AWS account as the primary Automation document.",
                    type: "string",
                },
                DocumentVersion: {
                    description:
                        "The version of the secondary Automation document to run. If not specified, Automation runs the default document version.",
                    type: "string",
                },
                RuntimeParameters: {
                    description:
                        'Required parameters for the secondary document execution. The mapping uses the following format: {"parameter1" : ["value1"], "parameter2" : ["value2"] }',
                    type: ["string", "object"],
                },
            },
            required: ["DocumentName"],
        },
    },
};

export const executeAutomationSnippet: SnippetDefinition = {
    label: "Snippet: aws:executeAutomation",
    description:
        "Runs a secondary Automation workflow by calling a secondary Automation document. With this action, you can create Automation documents for your most common workflows, and reference those documents during an Automation execution. This action can simplify your Automation documents by removing the need to duplicate steps across similar documents.\n\nThe secondary Automation runs in the context of the user who initiated the primary Automation. This means that the secondary Automation uses the same IAM role or user account as the user who started the first Automation.",
    body: {
        name: "${1:executeAutomation}",
        action: "aws:executeAutomation",
        maxAttempts: 3,
        timeoutSeconds: 3600,
        onFailure: "Abort",
        inputs: {
            DocumentName: "secondaryWorkflow",
            RuntimeParameters: {
                instanceIds: ["i-1234567890abcdef0"],
            },
        },
    },
};
