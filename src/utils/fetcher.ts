/**
 * @name: fetcher
 * @user: cfj
 * @date: 2022/1/6
 * @description:
 */
export const fetcher = (input: RequestInfo, init?: RequestInit) =>
  fetch(`https://reqres.in${input}`, init).then((res) => res.json());
