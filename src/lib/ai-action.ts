"use server";
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });

export async function getNeuralInsight(dataSummary: string) {
  try {
    const msg = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20240620",
      max_tokens: 300,
      system: "You are the NEURAL Health Assistant. Provide futuristic, technical medical insights.",
      messages: [{ role: "user", content: `Analyze these vitals: ${dataSummary}` }],
    });
    return msg.content[0];
  } catch (e) {
    return { text: "Neural Link Offline. Check Connection." };
  }
}
