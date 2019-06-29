// @flow

/* eslint-disable no-console */

const ZoomRoomsControlSystem = require('../src');
// const expect = require('expect');

const { HOSTNAME, PASSWORD } = process.env;

if (!HOSTNAME) {
  throw new Error('Missing required environment variable HOSTNAME');
}

if (!PASSWORD) {
  throw new Error('Missing required environment variable PASSWORD');
}

jest.setTimeout(20000);

describe('SSH Connection', () => {
  test('Should connect', async () => {
    const zoom = new ZoomRoomsControlSystem(HOSTNAME, PASSWORD);
    await zoom.connect();
    const result = await zoom.zstatus.audio.input.line();
    console.log(result);
    await zoom.disconnect();
  });
});
