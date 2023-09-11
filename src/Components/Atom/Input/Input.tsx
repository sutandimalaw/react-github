import React  from 'react'

type MyInputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const SearchBar = React.forwardRef<HTMLInputElement, MyInputProps>(function (
    { ...props },
    ref
  ) {
    return <input ref={ref} {...props} 
    placeholder="Enter Username" 
            className="input input-bordered input-md w-full bg-gray-300 text-slate-900
            text-base border-gray-300 border-2 rounded-lg"
    />;
  });

  export default SearchBar;
