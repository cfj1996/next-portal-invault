/**
 * @name: index
 * @user: cfj
 * @date: 2022/1/5
 * @description:
 */
import React, { useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { prefetch } from 'src/routes';

const Index = function () {
  useEffect(() => {
    console.log('admin 挂载了');
  }, []);
  return (
    <div>
      <div>admin 页面</div>
      <ul>
        <li>
          <Link to={'A1/100'}>A1</Link>
        </li>
        <li>
          <Link to={'A2'}>A2</Link>
        </li>
      </ul>
      <button
        onClick={() => {
          prefetch('A1/100');
        }}
      >
        A1/100
      </button>
      <button
        onClick={() => {
          prefetch('/admin/A2');
        }}
      >
        /admin/A2
      </button>
      <button
        onClick={() => {
          prefetch('A2');
        }}
      >
        A2
      </button>
      <Outlet />
    </div>
  );
};
export default Index;
