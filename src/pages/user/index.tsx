/**
 * @name: index
 * @user: cfj
 * @date: 2022/1/5
 * @description:
 */
import React from 'react';
import { userLoader } from 'src/dataLoader/user';

const [loader, useLoaderData] = userLoader();
const Index = function () {
  const { users } = useLoaderData('1');
  return (
    <div>
      <p>user 请求id 为{users.data?.data.id}的用户</p>
      <p>
        姓名: {users.data?.data.first_name}
        {users.data?.data.last_name}
      </p>
      <p>email: {users.data?.data.email}</p>
      {/*<img src={users.data?.data.avatar} alt="" />*/}
    </div>
  );
};
Index.loader = loader;
export default Index;
