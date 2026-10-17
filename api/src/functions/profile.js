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
        return json(await readItem('user', user.id, `user:${user.id}`) || {
          id, type: 'user', partitionKey: `user:${user.id}`, authProviderId: user.id, name: user.name
        });
      }

      const body = await request.json();
      const item = {
        id, type: 'user', partitionKey: `user:${user.id}`, authProviderId: user.id,
        name: String(body.name || user.name || '').trim().slice(0, 120),
        updatedAt: new Date().toISOString()
      };
      return json(await writeItem(item));
    } catch (error) {
      context.error(error);
      return json({ error: error.message }, error.status || 500);
    }
  }
});
