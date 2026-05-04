"use server";

import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export async function fetchNeuralInsight(medicalSummary: string) {
  try {
    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20240620",
      max_tokens: 500,
      system: "You are the NEURAL Health Engine. Provide concise, futuristic, and medically accurate biometric insights.",
      messages: [{ role: "user", content: `Analyze: ${medicalSummary}` }],
    });
    return response.content[0];
  } catch (error) {
    throw new Error("Neural Link Failed");
  }
}
