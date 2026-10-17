'use strict';

const { CosmosClient } = require('@azure/cosmos');

let containerPromise;

function getContainer() {
  if (!containerPromise) {
    const endpoint = process.env.COSMOS_ENDPOINT;
    const key = process.env.COSMOS_KEY;
    const databaseId = process.env.COSMOS_DATABASE || 'tkho';
    const containerId = process.env.COSMOS_CONTAINER || 'app';
    if (!endpoint || !key) throw new Error('Cosmos DB configuration is missing');

    const client = new CosmosClient({ endpoint, key });
    containerPromise = client.databases.createIfNotExists({ id: databaseId })
      .then(({ database }) => database.containers.createIfNotExists({ id: containerId, partitionKey: { paths: ['/partitionKey'] } }))
      .then(({ container }) => container);
  }
  return containerPromise;
}

async function readItem(type, id, partitionKey) {
  const container = await getContainer();
  try {
    const { resource } = await container.item(`${type}:${id}`, partitionKey).read();
    return resource || null;
  } catch (error) {
    if (error.code === 404) return null;
    throw error;
  }
}

async function writeItem(item) {
  const container = await getContainer();
  const { resource } = await container.items.upsert(item);
  return resource;
}

async function queryItems(query, parameters = []) {
  const container = await getContainer();
  const { resources } = await container.items.query({ query, parameters }).fetchAll();
  return resources;
}

module.exports = { readItem, writeItem, queryItems };
