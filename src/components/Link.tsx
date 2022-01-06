/**
 * @name: Link
 * @user: cfj
 * @date: 2022/1/6
 * @description:
 */
import type { Ref } from 'react';
import React, { forwardRef } from 'react';
import type { LinkProps } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { prefetch } from 'src/routes';

const Link = forwardRef(function Link(
  props: LinkProps & { prefetch?: boolean },
  ref: Ref<HTMLAnchorElement>,
) {
  const { prefetch: p, ...other } = props;
  return (
    <RouterLink
      ref={ref}
      {...other}
      onMouseOver={() => {
        p && prefetch(props.to);
      }}
    />
  );
});
export default Link;
