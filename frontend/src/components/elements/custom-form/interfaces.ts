import { DetailedHTMLProps, FormHTMLAttributes } from 'react';

export interface FormAttributeProps
  extends DetailedHTMLProps<
    FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  > {}
