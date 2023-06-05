type SuccessResult<T> = {
  success: true;
  data: T;
};

type ErrorResult<E> = {
  success: false;
  error: E;
};

export type Result<T, E> = SuccessResult<T> | ErrorResult<E>;

export const success = <T>(data: T): SuccessResult<T> => {
  return {
    success: true,
    data,
  };
};

export const error = <E>(error: E): ErrorResult<E> => {
  return {
    success: false,
    error,
  };
};
