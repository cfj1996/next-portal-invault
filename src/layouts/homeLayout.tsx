/**
 * @name: homeLayout
 * @user: cfj
 * @date: 2022/1/5
 * @description:
 */
import React from 'react';
import { Outlet } from 'react-router-dom';
import Link from 'src/components/Link';

const HomeLayout = function () {
  return (
    <div>
      {/*<p>普通加载</p>*/}
      <p>hover 预加载</p>
      <div>
        <ul style={{ display: 'flex' }}>
          <li>
            <Link to={'/'} prefetch>
              home
            </Link>
          </li>
          <li>
            <Link to={'/user'} prefetch>
              user
            </Link>
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
