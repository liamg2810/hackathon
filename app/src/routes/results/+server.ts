// src/routes/api/endpoint/+server.ts
import type { RequestHandler } from './$types';
import { AzureOpenAI } from "openai";
import { PUBLIC_API_KEY, PUBLIC_ENDPOINT } from '$env/static/public'

// You will need to set these environment variables or edit the following values
const apiVersion = "2024-08-01-preview";
const deployment = "gpt-4o"; //This must match your deployment name.

const prompt = `
You are an AI assistant analyzing responses to a personality test and a diagnostic quiz. Use these responses to evaluate the user’s personality traits and learning style. Then, based on the analysis, create a tailored learning plan for English literature.

Instructions:

Personality Test Analysis: Each personality question will appear in the format "Word: <word> Answer: <response>". The user’s response options might include "Not me at all", "Not really me", "Kinda me", "Mostly me", and "Totally me". Based on these responses, assess the user's personality and summarize the primary personality traits observed.

Diagnostic Quiz Analysis: Each diagnostic question will appear in the format "Phrase: <phrase> Answer: <response>". Based on the answers, determine the user’s learning style for English literature. Types may include visual, auditory, kinesthetic, analytical, creative, etc.

Learning Plan Creation: Using the personality traits and learning style, develop a personalized English literature learning plan. Include recommended study techniques, types of exercises, suggested literature topics, and engagement strategies suited to the user's profile.

Example Layout of Responses:

Personality Test:
Word: ambitious Answer: Mostly me
Word: reflective Answer: Totally me

Diagnostic Quiz:
Phrase: I prefer to visualize scenes in my head while reading Answer: Yes
Phrase: I understand better when I discuss literature in groups Answer: No

Deliverables: A Personality Summary based on test responses, a Learning Style Assessment based on diagnostic answers, and a Learning Plan that incorporates these insights, with recommendations on study methods, types of texts to focus on.

Provide response as pure HTML text ignoring <html> and <body>.

Do not do any engagement strategies.
`;

async function CallChat(formattedPersonalityAnswers: string, formattedDiagnosticAnswers: string) {
  const client = new AzureOpenAI({ endpoint: PUBLIC_ENDPOINT, apiKey: PUBLIC_API_KEY, apiVersion, deployment });
  const result = await client.chat.completions.create({
    messages: [
    { role: "system", content: prompt },
    { role: "user", content: "Personality Answers\n" + formattedPersonalityAnswers },
    { role: "user", content: "Diagnostic Answers\n" + formattedDiagnosticAnswers },
    ],
    model: "",
  });

  for (const choice of result.choices) {
    console.log(choice.message);
  }

    return result.choices[0].message.content;
}


export const POST: RequestHandler = async ({ request }) => {
    const data = await request.json();  // Extract data sent from client
    const { $formattedPersonalityAnswers, $formattedDiagnosticAnswers } = data;

    const result = await CallChat($formattedPersonalityAnswers, $formattedDiagnosticAnswers);

    return new Response(JSON.stringify({ message: result }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
};
