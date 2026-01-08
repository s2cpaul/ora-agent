/**
 * Admin Permissions and Content Push Authorization
 * 
 * This file defines which email addresses are authorized to push new content to AI agents.
 * Authorized users can:
 * - Update agent training data
 * - Push new content and responses
 * - Modify agent behavior and configurations
 * - Access admin-level features
 */

/**
 * List of email addresses authorized to push content to agents
 * These emails have full admin privileges for content management
 */
export const AUTHORIZED_CONTENT_PUSH_EMAILS = [
  'carapaulson1@gmail.com',
  'carapauslon1@gmail.com', // Alternative spelling
  'cara@oratf.info',
] as const;

/**
 * Check if an email address is authorized to push content to agents
 * @param email - Email address to check
 * @returns true if the email is authorized, false otherwise
 */
export function isAuthorizedForContentPush(email: string | null | undefined): boolean {
  if (!email) return false;
  
  const normalizedEmail = email.toLowerCase().trim();
  return AUTHORIZED_CONTENT_PUSH_EMAILS.some(
    authorizedEmail => authorizedEmail.toLowerCase() === normalizedEmail
  );
}

/**
 * Check if the current user (from localStorage) is authorized for content push
 * @returns true if the current user is authorized, false otherwise
 */
export function isCurrentUserAuthorizedForContentPush(): boolean {
  const userEmail = localStorage.getItem('userEmail');
  return isAuthorizedForContentPush(userEmail);
}

/**
 * Get the current user's email from localStorage
 * @returns User email or null if not found
 */
export function getCurrentUserEmail(): string | null {
  return localStorage.getItem('userEmail');
}

/**
 * Check if user has admin privileges
 * Admins are users who can push content to agents
 * @param email - Optional email to check, defaults to current user
 * @returns true if user has admin privileges
 */
export function hasAdminPrivileges(email?: string): boolean {
  const emailToCheck = email || getCurrentUserEmail();
  return isAuthorizedForContentPush(emailToCheck);
}

/**
 * Validate content push permission and throw error if unauthorized
 * @param email - Optional email to check, defaults to current user
 * @throws Error if user is not authorized
 */
export function requireContentPushPermission(email?: string): void {
  if (!hasAdminPrivileges(email)) {
    const userEmail = email || getCurrentUserEmail() || 'Unknown user';
    throw new Error(
      `Unauthorized: ${userEmail} does not have permission to push content to agents. ` +
      `Contact an administrator for access.`
    );
  }
}

/**
 * Example usage for content push operations:
 * 
 * ```typescript
 * import { requireContentPushPermission, isCurrentUserAuthorizedForContentPush } from './utils/adminPermissions';
 * 
 * // Check if current user can push content
 * if (isCurrentUserAuthorizedForContentPush()) {
 *   // Show content push UI
 * }
 * 
 * // Validate before performing content push operation
 * function pushNewContent(content: any) {
 *   try {
 *     requireContentPushPermission();
 *     // Proceed with content push
 *   } catch (error) {
 *     console.error(error.message);
 *     alert('You do not have permission to push content.');
 *   }
 * }
 * ```
 */
