/**
 * @name: index
 * @user: cfj
 * @date: 2022/1/7
 * @description:
 */
import type { LoaderParams } from 'src/routes/routerTree';

export type DataLoader<U, T> = [(a: LoaderParams) => void, (a: U) => T];
