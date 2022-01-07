import type { SWRResponse } from 'swr';
import useSWR, { mutate } from 'swr';
import type { Key } from 'src/utils/fetcher';
import { fetcher } from 'src/utils/fetcher';
import type { DataLoader } from 'src/dataLoader/index';
import type { LoaderParams } from 'src/routes/routerTree';

/**
 * @name: use-user
 * @user: cfj
 * @date: 2022/1/7
 * @description:
 */
export interface User {
  data: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
  };
}
export const userLoader = function (): DataLoader<string, { users: SWRResponse<User> }> {
  const KEY = (id: string) => [`/api/users/${id}`] as Key;
  const useLoaderData = function (id: string) {
    const users = useSWR<User>(KEY(id), fetcher);
    return {
      users,
    };
  };
  const loader = function (params: LoaderParams) {
    const id = params.searchParams.get('id') || '1';
    mutate(KEY(id), fetcher(...KEY(id))).then((res) => res);
  };
  return [loader, useLoaderData];
};
