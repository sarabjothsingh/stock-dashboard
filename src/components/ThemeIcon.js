import React, { useContext } from "react";

import { MoonIcon } from "@heroicons/react/solid";

const ThemeIcon = () => {
    return (
        <button
          className={`rounded-lg border-1 border-neutral-400 p-2 absolute right-8 xl:right-32 shadow-lg transition duration-300 hover:scale-125 shadow-gray-800`}
        >
          <MoonIcon
            className={`h-8 w-8 cursor-pointer stroke-1 fill-yellow-400 stroke-yellow-400 fill-none stroke-neutral-400`}
          />
        </button>
      );
};

  

export default ThemeIcon;