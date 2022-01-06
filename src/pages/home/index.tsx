/**
 * @name: index
 * @user: cfj
 * @date: 2022/1/5
 * @description:
 */
import React from 'react';
import useSWR, { mutate } from 'swr';
import { fetcher } from 'src/utils/fetcher';

const Home = function () {
  const { userData } = useLoaderData();
  console.log('userData', userData);
  return (
    <div>
      Home 首页 单个 用户 的请求
      <div>
        <p>用户名 {userData.data.data.first_name}</p>
      </div>
    </div>
  );
};
export const useLoaderData = function () {
  const userData = useSWR(['/api/users/1', { method: 'GET' }], fetcher, { suspense: true });
  return { userData };
};
export default Home;
Home.preFetchData = function () {
  mutate(['/api/users/1', { method: 'GET' }], fetcher('/api/users/1', { method: 'GET' }));
};
