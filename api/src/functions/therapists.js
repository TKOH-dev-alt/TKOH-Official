'use strict';

const { app } = require('@azure/functions');
const { json } = require('../shared/auth');
const { queryItems } = require('../shared/cosmos');

app.http('therapists', {
  methods: ['GET'],
  authLevel: 'anonymous',
  route: 'therapists',
  handler: async (_request, context) => {
    try {
      return json(await queryItems(
        'SELECT * FROM c WHERE c.type = @type AND c.approved = true',
        [{ name: '@type', value: 'therapist' }]
      ));
    } catch (error) {
      context.error(error);
      return json({ error: error.message }, 500);
    }
  }
});
