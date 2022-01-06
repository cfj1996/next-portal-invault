/**
 * @name: A1
 * @user: cfj
 * @date: 2022/1/5
 * @description:
 */
import React from 'react';
import { matchPath, useParams } from 'react-router-dom';

const A1 = function () {
  const data = matchPath('admin/A1/:id', location.pathname);
  console.log('data', data);
  const params = useParams<{ id: string }>();
  return <div>A1 页面 {params.id}</div>;
};
export default A1;
