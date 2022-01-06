/**
 * @name: index
 * @user: cfj
 * @date: 2022/1/5
 * @description:
 */

const pages = {
  home: () => import('./home'),
  user: () => import('./user'),
  admin: () => import('./admin'),
  A1: () => import('./admin/A1'),
  A2: () => import('./admin/A2'),
};
export type Pages = typeof pages;
export default pages as Pages;
