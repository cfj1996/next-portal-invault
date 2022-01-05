/**
 * @name: index
 * @user: cfj
 * @date: 2022/1/5
 * @description:
 */
import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Index = function () {
  return (
    <div>
      <div>admin 页面</div>
      <ul>
        <li>
          <Link to={'A1'}>A1</Link>
        </li>
        <li>
          <Link to={'A2'}>A2</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};
export default Index;
