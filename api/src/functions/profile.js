'use strict';

const { app } = require('@azure/functions');
const { requireUser, json } = require('../shared/auth');
const { readItem, writeItem } = require('../shared/cosmos');

app.http('profile', {
  methods: ['GET', 'PUT'],
  authLevel: 'anonymous',
  route: 'profile',
  handler: async (request, context) => {
    try {
      const user = requireUser(request);
      const id = `user:${user.id}`;
      if (request.method === 'GET') {
        const existing = await readItem('user', user.id, `user:${user.id}`);
        return json(existing || {
          id, type: 'user', partitionKey: `user:${user.id}`, authProviderId: user.id,
          email: user.email, name: user.name, role: 'patient',
          createdAt: new Date().toISOString()
        });
      }

      const body = await request.json();
      const existing = await readItem('user', user.id, `user:${user.id}`);
      const item = {
        id, type: 'user', partitionKey: `user:${user.id}`, authProviderId: user.id,
        email: existing?.email || user.email,
        name: String(body.name || existing?.name || user.name || '').trim().slice(0, 120),
        role: existing?.role || 'patient',
        preferences: body.preferences && typeof body.preferences === 'object'
          ? body.preferences
          : (existing?.preferences || {}),
        createdAt: existing?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      return json(await writeItem(item));
    } catch (error) {
      context.error(error);
      return json({ error: error.message }, error.status || 500);
    }
  }
});
