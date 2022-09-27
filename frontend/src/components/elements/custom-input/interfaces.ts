import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

export interface InputAttributeProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}
