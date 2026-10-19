'use strict';

function getAuthenticatedUser(request) {
  const encoded = request.headers.get('x-ms-client-principal');
  if (!encoded) return null;

  try {
    const principal = JSON.parse(Buffer.from(encoded, 'base64').toString('utf8'));
    const claims = principal.claims || [];
    const claim = (...types) => claims.find(c => types.includes(c.typ))?.val || '';
    const userId = principal.userId || claim(
      'http://schemas.microsoft.com/identity/claims/objectidentifier',
      'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
    );
    const name = principal.userDetails || claim('name', 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name') || '';
    const email = claim('emails', 'email', 'preferred_username', 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress') || principal.userDetails || '';
    if (!userId) return null;
    return { id: userId, name, email, roles: principal.userRoles || [] };
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
