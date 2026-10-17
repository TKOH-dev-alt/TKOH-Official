'use strict';

const { app } = require('@azure/functions');
const { randomUUID } = require('node:crypto');
const { requireUser, json } = require('../shared/auth');
const { writeItem, queryItems } = require('../shared/cosmos');

app.http('moods', {
  methods: ['GET', 'POST'],
  authLevel: 'anonymous',
  route: 'moods',
  handler: async (request, context) => {
    try {
      const user = requireUser(request);
      const partitionKey = `user:${user.id}`;
      if (request.method === 'GET') {
        return json(await queryItems(
          'SELECT * FROM c WHERE c.type = @type AND c.partitionKey = @partitionKey ORDER BY c.recordedAt DESC',
          [{ name: '@type', value: 'mood' }, { name: '@partitionKey', value: partitionKey }]
        ));
      }

      const body = await request.json();
      const mood = String(body.mood || '').trim();
      if (!mood || mood.length > 40) return json({ error: 'A valid mood is required' }, 400);
      return json(await writeItem({
        id: `mood:${randomUUID()}`, type: 'mood', partitionKey,
        userId: user.id, mood, recordedAt: new Date().toISOString()
      }), 201);
    } catch (error) {
      context.error(error);
      return json({ error: error.message }, error.status || 500);
    }
  }
});
