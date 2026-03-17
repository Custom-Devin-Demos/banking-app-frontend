import { Sentry } from '../sentry';

interface AuditEvent {
  timestamp: string;
  actor: string;
  action: string;
  resource: string;
  outcome: 'success' | 'failure';
  metadata?: Record<string, unknown>;
}

export const logAuditEvent = (
  actor: string,
  action: string,
  resource: string,
  outcome: 'success' | 'failure',
  metadata?: Record<string, unknown>
): void => {
  const event: AuditEvent = {
    timestamp: new Date().toISOString(),
    actor,
    action,
    resource,
    outcome,
    metadata,
  };
  console.info('[AUDIT]', JSON.stringify(event));
  Sentry.addBreadcrumb({
    category: 'audit',
    message: action,
    data: event,
    level: 'info',
  });
};
