'use strict';

const { app } = require('@azure/functions');
const { randomUUID } = require('node:crypto');
const { requireUser, json } = require('../shared/auth');
const { writeItem, queryItems } = require('../shared/cosmos');

app.http('bookings', {
  methods: ['GET', 'POST'],
  authLevel: 'anonymous',
  route: 'bookings',
  handler: async (request, context) => {
    try {
      const user = requireUser(request);
      const partitionKey = `user:${user.id}`;
      if (request.method === 'GET') {
        return json(await queryItems(
          'SELECT * FROM c WHERE c.type = @type AND c.patientId = @patientId ORDER BY c.startTime DESC',
          [{ name: '@type', value: 'booking' }, { name: '@patientId', value: user.id }]
        ));
      }

      const body = await request.json();
      const therapistId = String(body.therapistId || '').trim();
      const startTime = String(body.startTime || '').trim();
      if (!therapistId || !startTime) return json({ error: 'therapistId and startTime are required' }, 400);
      return json(await writeItem({
        id: `booking:${randomUUID()}`, type: 'booking', partitionKey,
        patientId: user.id, therapistId, startTime, status: 'requested',
        createdAt: new Date().toISOString()
      }), 201);
    } catch (error) {
      context.error(error);
      return json({ error: error.message }, error.status || 500);
    }
  }
});
