import { Sentry } from '../sentry';

interface AuditEvent {
  timestamp: string;
  actor: string;
  action: string;
  resource: string;
  outcome: 'success' | 'failure';
  metadata?: Record<string, unknown>;
}

/**
 * Logs an audit event for security-relevant and business-critical actions.
 * Events are logged to console and added as Sentry breadcrumbs for traceability.
 *
 * @param actor - The user or system performing the action.
 * @param action - Descriptive action verb (e.g., USER_LOGIN_SUCCESS).
 * @param resource - The resource affected (e.g., "auth:signin").
 * @param outcome - Whether the action succeeded or failed.
 * @param metadata - Optional additional context (must not contain sensitive data).
 */
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
    level: outcome === 'success' ? 'info' : 'warning',
  });
};
