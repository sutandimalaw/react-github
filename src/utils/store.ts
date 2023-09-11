import { create } from "zustand";
import { Endpoints } from "@octokit/types";
import { getGithubRepo, getGithubUser } from "./fetchData";

export interface IRepoDetail {
  username?: string;
  title?: string;
  desc?: string;
  rate?: number;
}

export type IResponApi =
  Endpoints["GET /search/users"]["response"]["data"]["items"][0];

export type IDataUser =
  Endpoints["GET /users/{username}/repos"]["response"]["data"][0];

type StoreRepo = {
  isLoading?: boolean;
  dirty?: boolean;
  search?: string;
  dataUser: IDataUser[];
  dataRepo: { [key: string]: IResponApi[] };
  searchUser: (str: string) => void;
  searchRepo: (val: IResponApi[]) => void;

  signal?: AbortController;
  cancelLastReuqest: () => void;
};

const useStoreRepo = create<StoreRepo>((set, get) => ({
  dataUser: [],
  dataRepo: {},
  isLoading: false,
  dirty: false,
  search: "",

  cancelLastReuqest: () => {
    const { signal } = get();
    signal?.abort();
  },

  async searchUser(search: string) {
    const { cancelLastReuqest, searchRepo } = get();

    // for cancel last request
    cancelLastReuqest();
    const signal = new AbortController();

    set((state) => ({
      ...state,
      signal,
      search,
      isLoading: true,
      dirty: true,
      dataUser: [],
      dataRepo: {},
    }));
    const dataUser = await getGithubUser(search, signal);
    set((state) => ({ ...state, dataUser, isLoading: false }));
    searchRepo(dataUser);
  },

  async searchRepo(data: IResponApi[]) {
    const { signal } = get();

    const dataRepo: { [key: string]: IResponApi[] } = {};
    const payload = await Promise.all(
      data.map((item) => getGithubRepo(item.repos_url, signal))
    );

    for (let i = 0; i < payload.length; i++) {
      const { data, url } = payload[i];
      dataRepo[url] = data;
    }

    set((state) => ({ ...state, dataRepo }));
  },
}));

useStoreRepo.subscribe((state) => console.log("store:", state));

export default useStoreRepo;
