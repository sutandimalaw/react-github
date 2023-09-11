/* eslint-disable @typescript-eslint/no-explicit-any */
import Accordion from "./Components/Atom/Accordion";
import CardDetail from "./Components/Atom/Card/RepoDetail";
import FlexCenter from "./Components/Atom/Layout/FlexCenter";
import SearchWithButton from "./Components/Molecule/SearchWithButton/SearchWithButton";
import React from "react";
import useStoreRepo, { IDataUser, IResponApi } from "./utils/store";

function App() {
  const store = useStoreRepo();

  return (
    <div className="container content-center mx-auto px-2 border-2 max-w-lg bg-gray-100">
      <FlexCenter>
        <SearchWithButton />
      </FlexCenter>
      <FlexCenter>
        <div className="flex flex-col gap-3 w-full overflow-auto h-screen">
          {store?.isLoading ? (
            <div className="flex justify-center">
              <span className="loading loading-infinity loading-lg"></span>
            </div>
          ) : store.dataUser?.length ? (
            store.dataUser?.map((item) => {
              return <Repository {...(item as IDataUser & IResponApi)} />;
            })
          ) : (
            store.dirty &&
            !store.isLoading && (
              <span className="text-center">
                Upps.. sorry! user <b className="font-bold">{store.search}</b>{" "}
                not found
              </span>
            )
          )}
        </div>
      </FlexCenter>
    </div>
  );
}

const Repository: React.FC<IDataUser & IResponApi> = (props) => {
  const store = useStoreRepo();
  const id = props.repos_url;
  const repo = store.dataRepo[id];
  const loading = repo === undefined;

  return (
    <Accordion title={props.login || "-"}>
      {loading
        ? "loading..."
        : !repo?.length
        ? "No repository found"
        : repo.map((item: any) => (
            <CardDetail
              title={item.full_name}
              desc={item.description}
              rate={item.stargazers_count}
            />
          ))}
    </Accordion>
  );
};

export default App;
