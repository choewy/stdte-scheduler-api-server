import { FC, PropsWithChildren } from 'react';
import { FormAttributeProps } from './interfaces';

export const CustomForm: FC<FormAttributeProps & PropsWithChildren> = ({
  onSubmit,
  children,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      style={{
        width: '300px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {children}
    </form>
  );
};
