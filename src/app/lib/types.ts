export interface Repo {
  id: number;
  name: string;
  full_name: string;
  owner: Owner;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string;
  topics: string[];
  created_at: string;
  updated_at: string;
  forks_count: number;
  open_issues_count: number;
}

interface Owner {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
}

export type TimeRange = 'all-time' | 'year' | 'month';