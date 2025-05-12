export interface Repo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string;
  owner: string;
  topics: string[];
  created_at: string;
  updated_at: string;
  forks_count: number;
  open_issues_count: number;
}

export type TimeRange = 'all-time' | 'year' | 'month';