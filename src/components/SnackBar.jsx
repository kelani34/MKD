import React, { useEffect, useState } from "react";
import { AuthContext } from "../authContext";
const SnackBar = () => {
  const { state, dispatch } = React.useContext(AuthContext);
  const [show, setShow] = useState(false);
  useEffect(() => {
    state.globalMessage && setShow(true);
  }, [state.globalMessage]);

  return show ? (
    <div
      id="mkd-toast"
      className="absolute top-5 right-5 flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400"
      role="alert"
    >
      <div className="text-sm font-normal">{state.globalMessage}</div>
      <div className="flex items-center ml-auto space-x-2">
        <button
          type="button"
          className="bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white  dark:hover:bg-gray-700"
          aria-label="Close"
          onClick={() => {
            setShow(false);
            dispatch({ type: "SNACKBAR", payload: { message: "" } });
          }}
        >
          <span className="sr-only">Close</span>
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  ) : null;
};

export default SnackBar;
