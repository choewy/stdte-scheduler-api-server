import { FC, useCallback } from 'react';
import { Progress, UncontrolledAlert } from 'reactstrap';
import { userErrorTImeout } from './error.hook';
import { ErrorState } from './error.state';

export const ErrorAlert: FC = () => {
  const { error, setError } = userErrorTImeout();

  const onToggle = useCallback(() => {
    setError(new ErrorState());
  }, [setError]);

  return (
    <UncontrolledAlert
      color="danger"
      toggle={onToggle}
      isOpen={!!error.message}
      className="alert-dismissible fade show position-fixed display-flex"
      role="alert"
      style={{
        width: '340px',
        right: '4%',
        top: '4%',
        zIndex: 99999,
      }}
    >
      <i className="mdi mdi-block-helper me-2">
        {error.message ? error.message : 'Server Error'}
        <div className="animated-progress-mt-2">
          <Progress value={100} color="danger" />
        </div>
      </i>
    </UncontrolledAlert>
  );
};
