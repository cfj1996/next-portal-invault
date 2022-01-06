/**
 * @name: index
 * @user: cfj
 * @date: 2022/1/5
 * @description:
 */
import useSWR from 'swr';

export interface IAccessMap {
  admin: boolean;
  user: boolean;
}
export const fallback = function (): Promise<{ auto: 'admin' | 'user' }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        auto: 'user',
      });
    }, 1500);
  });
};
const useAccess = function (): IAccessMap {
  const { data } = useSWR('/auto', fallback, { suspense: true });
  return {
    admin: data?.auto === 'admin',
    user: data?.auto === 'user',
  };
};
export default useAccess;
