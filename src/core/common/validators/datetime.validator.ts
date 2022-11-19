import { registerDecorator, ValidationOptions } from 'class-validator';
import { DateTime } from 'luxon';

export const IsDateTime =
  (validationOptions?: ValidationOptions) =>
  (object: Object, propertyName: string) => {
    registerDecorator({
      name: 'IsDateTime',
      target: object.constructor,
      propertyName,
      options: {
        ...validationOptions,
        message: '날짜 형식이 잘못되었습니다.',
      },
      validator: {
        validate(value: DateTime | null) {
          return value instanceof DateTime && value.isValid;
        },
      },
    });
  };
