import * as Sentry from '@sentry/react';
import React from 'react';
import { logAuditEvent } from '../../services/auditLogger';

interface ErrorFallbackProps {
  error: unknown;
  resetError: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetError }) => {
  const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
  return (
    <div role='alert' style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Something went wrong</h2>
      <p>{errorMessage}</p>
      <button onClick={resetError} style={{ padding: '10px 20px', cursor: 'pointer' }}>
        Try again
      </button>
    </div>
  );
};

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

const handleError = (error: unknown, componentStack: string): void => {
  const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
  logAuditEvent('system', 'ERROR_BOUNDARY_TRIGGERED', 'app:error-boundary', 'failure', {
    errorMessage,
    componentStack,
  });
};

export const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => (
  <Sentry.ErrorBoundary
    onError={handleError}
    fallback={({ error, resetError }) => <ErrorFallback error={error} resetError={resetError} />}
  >
    {children}
  </Sentry.ErrorBoundary>
);

export default ErrorBoundary;
