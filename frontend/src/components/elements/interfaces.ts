import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

export interface InputAttributeProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

export interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  value: string | number | readonly string[] | undefined;
}
