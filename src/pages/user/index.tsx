/**
 * @name: index
 * @user: cfj
 * @date: 2022/1/5
 * @description:
 */
import React from 'react';
import { userLoader } from 'src/dataLoader/user';
import { useParams } from 'react-router-dom';

const [loader, useLoaderData] = userLoader();
const Index = function () {
  const params = useParams<{ id: string }>();
  const { users } = useLoaderData(params.id as string);
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
