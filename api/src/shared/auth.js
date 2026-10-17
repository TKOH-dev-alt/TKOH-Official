'use strict';

function getAuthenticatedUser(request) {
  const encoded = request.headers.get('x-ms-client-principal');
  if (!encoded) return null;

  try {
    const principal = JSON.parse(Buffer.from(encoded, 'base64').toString('utf8'));
    const userId = principal.userId || principal.claims?.find(c => c.typ === 'http://schemas.microsoft.com/identity/claims/objectidentifier')?.val;
    const name = principal.userDetails || principal.claims?.find(c => c.typ === 'name')?.val || '';
    if (!userId) return null;
    return { id: userId, name, roles: principal.userRoles || [] };
  } catch {
    return null;
  }
}

function requireUser(request) {
  const user = getAuthenticatedUser(request);
  if (!user) {
    const error = new Error('Authentication required');
    error.status = 401;
    throw error;
  }
  return user;
}

function json(body, status = 200) {
  return {
    status,
    headers: { 'content-type': 'application/json' },
    jsonBody: body
  };
}

module.exports = { getAuthenticatedUser, requireUser, json };
