'use strict';

const crypto = require('crypto');
const { app } = require('@azure/functions');
const { json } = require('../shared/auth');
const { writeItem } = require('../shared/cosmos');

app.http('therapistApplications', {
  methods: ['POST'],
  authLevel: 'anonymous',
  route: 'therapist-applications',
  handler: async (request, context) => {
    try {
      const body = await request.json();
      const name = String(body.name || '').trim().slice(0, 120);
      const email = String(body.email || '').trim().toLowerCase().slice(0, 160);
      const specialty = String(body.specialty || '').trim().slice(0, 100);
      const resumeName = String(body.resumeName || '').trim().slice(0, 180);
      const resumeSize = Number(body.resumeSize || 0);
      if (!name || !email.includes('@') || !specialty || !resumeName.toLowerCase().endsWith('.pdf') || resumeSize <= 0 || resumeSize > 5 * 1024 * 1024) {
        return json({ error: 'A valid name, email, specialty, and PDF resume under 5 MB are required.' }, 400);
      }
      const item = {
        id: crypto.randomUUID(),
        type: 'therapistApplication',
        partitionKey: 'therapistApplications',
        name, email, specialty, resumeName, resumeSize,
        status: 'under_review',
        submittedAt: new Date().toISOString()
      };
      return json(await writeItem(item), 201);
    } catch (error) {
      context.error(error);
      return json({ error: 'Unable to submit therapist application.' }, 500);
    }
  }
});
