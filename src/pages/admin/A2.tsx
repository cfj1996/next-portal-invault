/**
 * @name: A1
 * @user: cfj
 * @date: 2022/1/5
 * @description:
 */
import React from 'react';
import { useResolvedPath } from 'react-router-dom';

const A2 = function () {
  const data = useResolvedPath('./A2');
  console.log('data', data);
  return <div>A2 页面</div>;
};
export default A2;
