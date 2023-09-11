import React from "react";
import SearchBar from "../../Atom/Input/Input";
import Button from "../../Atom/Button/Button";
import useStoreRepo from "../../../utils/store";

const SearchWithButton: React.FC = () => {
  const [search, setSearch] = React.useState("");
  const store = useStoreRepo();

  return (
    <div className="py-5 flex flex-col gap-4 px-3 w-full">
      <SearchBar
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          const key: number = e.keyCode || e.which;
          if (key == 13) {
            store.searchUser(search);
          }
        }}
      />
      <Button
        label="Search"
        type="button"
        onClick={() => store.searchUser(search)}
        isLoading={store.isLoading}
        isDisable={!search}
      />
      {store.dirty && !store.isLoading && (
        <span className="text-base text-center">
          {`Showing user for "${store.search}"`}
        </span>
      )}
    </div>
  );
};
export default SearchWithButton;
