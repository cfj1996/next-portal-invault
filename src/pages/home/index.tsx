/**
 * @name: index
 * @user: cfj
 * @date: 2022/1/5
 * @description:
 */
import React from 'react';
import { homeLoader } from 'src/dataLoader/home';

const [loader, useLoaderData] = homeLoader();
const Home = function () {
  const { userList } = useLoaderData({ page: 1, per_page: 5 });
  console.log('userList', userList);
  return (
    <div>
      Home 首页 单个 用户 的请求
      <div>
        <div>
          {userList.data?.data.map((item) => (
            <div key={item.id}>
              <p>user 请求id 为{item.id}的用户</p>
              <p>
                姓名: {item.first_name}
                {item.last_name}
              </p>
              <p>email: {item.email}</p>
              <hr />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
Home.loader = loader;
export default Home;
