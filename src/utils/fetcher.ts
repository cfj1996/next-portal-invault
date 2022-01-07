/**
 * @name: fetcher
 * @user: cfj
 * @date: 2022/1/6
 * @description:
 */

export type Key = [input: RequestInfo, init?: RequestInit];
export const fetcher = (input: RequestInfo, init?: RequestInit) =>
  fetch(`https://reqres.in${input}`, init).then((res) => res.json());
