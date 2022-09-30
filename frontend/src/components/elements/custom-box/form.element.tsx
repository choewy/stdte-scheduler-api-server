import { Box } from '@mui/material';
import {
  FC,
  PropsWithChildren,
  DetailedHTMLProps,
  FormHTMLAttributes,
} from 'react';

export interface FormAttributeProps
  extends DetailedHTMLProps<
    FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  > {}

export const CustomForm: FC<FormAttributeProps & PropsWithChildren> = ({
  onSubmit,
  children,
}) => {
  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'cetner',
      }}
    >
      <Box
        component="form"
        autoComplete="off"
        onSubmit={onSubmit}
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
