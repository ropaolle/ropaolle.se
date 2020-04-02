import { ReactNode } from 'react';
import { Meta } from './Meta';

export const LayoutSignin = ({ children, title }: { children: ReactNode; title?: string }) => {
  return (
    <>
      <Meta title={title} />
      <div className="wrapper bg-light d-flex justify-content-center align-items-center">
        {children}
      </div>
    </>
  );
};
