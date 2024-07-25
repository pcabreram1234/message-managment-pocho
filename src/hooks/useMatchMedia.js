import { useMediaQuery } from "react-responsive";

const useMatchMedia = (query) => {
  useMediaQuery({ query: query }) ? true : false;
};

export { useMatchMedia };
