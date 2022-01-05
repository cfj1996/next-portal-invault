/**
 * @name: homeLayout
 * @user: cfj
 * @date: 2022/1/5
 * @description:
 */
import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const HomeLayout = function () {
  return (
    <div>
      <div>
        <ul style={{ display: 'flex' }}>
          <li>
            <Link to={'/'}>home</Link>
          </li>
          <li>
            <Link to={'/user'}>user</Link>
          </li>
          <li>
            <Link to={'/admin'}>admin</Link>
          </li>
        </ul>
      </div>
      <main>
        <Outlet />
      </main>
    </div>
  );
};
export default HomeLayout;
