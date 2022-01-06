/**
 * @name: index
 * @user: cfj
 * @date: 2022/1/5
 * @description:
 */
import React from 'react';
import useSWR, { mutate } from 'swr';
import { fetcher } from 'src/utils/fetcher';

const Index = function () {
  const { users } = useLoaderData();
  return (
    <div>
      <p>user 多个用户的请求</p>

      <ul style={{ display: 'flex', flexDirection: 'column' }}>
        {users.data.data.map((item: any) => {
          return <li key={item.id}>用户名 {item.first_name}</li>;
        })}
      </ul>
    </div>
  );
};
export const useLoaderData = function () {
  const users = useSWR(['/api/users?page=1', { method: 'GET' }], fetcher, {
    suspense: true,
  });
  return {
    users,
  };
};
export default Index;
Index.preFetchData = function () {
  mutate(['/api/users?page=1', { method: 'GET' }], fetcher('/api/users?page=1', { method: 'GET' }));
};
