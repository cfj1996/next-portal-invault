import type { DataLoader } from 'src/dataLoader/index';
import type { Key } from 'src/utils/fetcher';
import { fetcher } from 'src/utils/fetcher';
import type { LoaderParams } from 'src/routes/routerTree';
import type { User } from 'src/dataLoader/user';
import type { SWRResponse } from 'swr';
import useSWR, { mutate } from 'swr';

/**
 * @name: home
 * @user: cfj
 * @date: 2022/1/7
 * @description:
 */

interface ResolveList {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User['data'][];
}

export const homeLoader = function (): DataLoader<
  { page: number; per_page: number },
  { userList: SWRResponse<ResolveList> }
> {
  const KEY = (page: number, per_page: number) =>
    [`/api/users?page=${page}&per_page=${per_page}`] as Key;
  const useLoaderData = function (params: { page: number; per_page: number }) {
    const userList = useSWR<ResolveList>(KEY(params.page, params.per_page), fetcher);
    return {
      userList,
    };
  };
  const loader = function (params: LoaderParams) {
    const page = params.searchParams.get('page') || '1';
    const per_page = params.searchParams.get('per_page') || '5';
    mutate(
      KEY(Number(page), Number(per_page)),
      fetcher(...KEY(Number(page), Number(per_page))),
    ).then((res) => res);
  };
  return [loader, useLoaderData];
};
