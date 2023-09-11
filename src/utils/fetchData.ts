/* eslint-disable @typescript-eslint/no-explicit-any */
import { octokit } from "./octokit";

export const getGithubUser: any = async (
  str: string,
  signal?: AbortController
) => {
  try {
    const response = await octokit.request("GET /search/users", {
      q: str as string,
      per_page: 5,
      request: { signal: signal?.signal },
    });
    return response.data.items;
  } catch (error) {
    return [];
  }
};

export const getGithubRepo: any = async (
  repoURI: string,
  signal?: AbortController
) => {
  try {
    const response = await octokit.request(`GET ${repoURI}`, {
      request: { signal: signal?.signal },
    });
    return response;
  } catch (error) {
    return { data: [], url: repoURI };
  }
};
