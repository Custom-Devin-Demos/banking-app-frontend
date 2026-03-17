import * as Sentry from '@sentry/react';

export type AuditOutcome = 'success' | 'failure';

export interface AuditEvent {
  timestamp: string;
  actor: string;
  action: string;
  resource: string;
  outcome: AuditOutcome;
  metadata?: Record<string, unknown>;
}

/**
 * Logs an audit event to the console and adds a Sentry breadcrumb.
 * Used to track security-relevant and business-critical actions.
 */
export const logAuditEvent = (
  actor: string,
  action: string,
  resource: string,
  outcome: AuditOutcome,
  metadata?: Record<string, unknown>
): void => {
  const event: AuditEvent = {
    timestamp: new Date().toISOString(),
    actor,
    action,
    resource,
    outcome,
    metadata: metadata || {},
  };

  // eslint-disable-next-line no-console
  console.info('[AUDIT]', JSON.stringify(event));

  Sentry.addBreadcrumb({
    category: 'audit',
    message: action,
    level: outcome === 'success' ? 'info' : 'warning',
    data: event,
  });
};
