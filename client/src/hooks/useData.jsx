import Cookies from "js-cookie";
import _ from "lodash";
import useSWR from "swr";

import { GET_TYPE } from "src/utils/constant";
import request from "src/utils/request";

const fetcher = async (url) => {
  let headers = {};
  if (Cookies.get("__LARCHIVEUM__COOKIES")) {
    headers.Authorization = `Bearer ${Cookies.get("__LARCHIVEUM__COOKIES")}`;
  }
  return request
    .get(url, { headers })
    .then((res) => {
      if (res.status === 200) return res.data.data;
    })
    .catch((error) => {
      return error;
    });
};

const useData = (url, type = GET_TYPE.MULTIPLE) => {
  const { data, error, isLoading, isValidating, mutate } = useSWR(url, fetcher);

  const result = {
    error,
    isLoading,
    isValidating,
    mutate,
  };

  if (type === GET_TYPE.MULTIPLE) {
    const { items } = _.pick(data, ["items"]);
    const pagination = _.omit(data, ["items"]);

    result.items = items;
    result.pagination = pagination;
  }

  if (type === GET_TYPE.SINGLE || type === GET_TYPE.COUNT) {
    result.data = data;
  }

  return result;
};

export default useData;
