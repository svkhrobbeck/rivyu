import { useSearchParams } from "react-router-dom";
type searchParamsType = ReturnType<typeof useSearchParams>;

const useParams = (searchParams: searchParamsType[0], key: string, value: string | number, ...keys: string[]) => {
  searchParams.set(key, value.toString());
  keys.forEach(key => searchParams.delete(key));

  return searchParams;
};

export default useParams;
