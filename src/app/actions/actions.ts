'use server';

import OpenAI from "openai";

async function fetchReadme(owner: string, repo: string) {
  const url = `https://api.github.com/repos/${owner}/${repo}/readme`;
  const headers = {
    'Accept': 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };

  try {
    const response = await fetch(url, { headers });
    if (!response.ok) {
      throw new Error('GitHub API request failed');
    }
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
      input: `Make a brief summary of the following README file in plaintext. Please tell me why I would be interested in this repository:\n\n${readme}`,
    });
    const summary = response.output_text;
    
    return summary;
  } else {
    return null;
  }
}