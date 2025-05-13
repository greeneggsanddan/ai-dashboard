'use server';

import OpenAI from 'openai';

async function fetchReadme(owner: string, repo: string) {
  const url = `https://api.github.com/repos/${owner}/${repo}/readme`;
  const headers = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  };

  try {
    const response = await fetch(url, { headers });
    const data = await response.json();

    if (data.content) {
      return atob(data.content);
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching README:', error);
  }
}

export async function generateSummary(owner: string, repo: string) {
  const readme = await fetchReadme(owner, repo);
  const client = new OpenAI();

  if (readme) {
    const response = await client.responses.create({
      model: 'gpt-4.1',
      input: `
        You are tasked with summarizing a README file for an AI agent framework. This summary will help track and understand trends in the rapidly evolving AI Agent ecosystem. Here are your instructions:

        1. First, carefully read and analyze the following README text:

        <readme>
          ${readme}
        </readme>

        2. Your goal is to create a concise summary of the key points from this README, focusing on the most important aspects of the AI agent framework.

        3. Create a summary consisting of no more than 10 bullet points. Each bullet point should capture a significant feature, concept, or piece of information about the framework.

        4. When creating your bullet points:
          - Focus on the main purpose and capabilities of the framework
          - Highlight any unique or innovative features
          - Include information about the framework's architecture or components, if mentioned
          - Note any significant technical requirements or dependencies
          - Mention any key use cases or applications of the framework
          - If applicable, include information about the framework's performance or efficiency

        5. Ensure that your summary provides a clear and accurate representation of the README content, allowing someone to quickly understand the essence of this AI agent framework.

      Please provide your summarized bullet points now.
      `,
    });
    const summary = response.output_text;

    return summary;
  } else {
    return null;
  }
}
