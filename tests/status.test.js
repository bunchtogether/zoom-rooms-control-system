// @flow

/* eslint-disable no-console */

const ZoomRoomsControlSystem = require('../src');

const { HOSTNAME, PASSWORD } = process.env;

if (!HOSTNAME) {
  throw new Error('Missing required environment variable HOSTNAME');
}

if (!PASSWORD) {
  throw new Error('Missing required environment variable PASSWORD');
}

jest.setTimeout(20000);

describe('zStatus', () => {
  const zoom = new ZoomRoomsControlSystem(HOSTNAME, PASSWORD);

  beforeAll(async () => {
    await zoom.connect();
  });

  afterAll(async () => {
    await zoom.disconnect();
  });

  test('zstatus.call.status', async () => {
    const result = await zoom.zstatus.call.status();
    console.log('zstatus.call.status');
    console.log(JSON.stringify(result, null, 2));
  });

  test('zstatus.audio.input.line', async () => {
    const result = await zoom.zstatus.audio.input.line();
    console.log('zstatus.audio.input.line');
    console.log(JSON.stringify(result, null, 2));
  });

  test('zstatus.audio.output.line', async () => {
    const result = await zoom.zstatus.audio.output.line();
    console.log('zstatus.audio.output.line');
    console.log(JSON.stringify(result, null, 2));
  });

  test('zstatus.video.camera.line', async () => {
    const result = await zoom.zstatus.video.camera.line();
    console.log('zstatus.video.camera.line');
    console.log(JSON.stringify(result, null, 2));
  });

  test('zstatus.video.optimizable', async () => {
    const result = await zoom.zstatus.video.optimizable();
    console.log('zstatus.video.optimizable');
    console.log(JSON.stringify(result, null, 2));
  });

  test('zstatus.systemUnit', async () => {
    const result = await zoom.zstatus.systemUnit();
    console.log('zstatus.systemUnit');
    console.log(JSON.stringify(result, null, 2));
  });

  test('zstatus.capabilities', async () => {
    const result = await zoom.zstatus.capabilities();
    console.log('zstatus.capabilities');
    console.log(JSON.stringify(result, null, 2));
  });

  test('zstatus.sharing', async () => {
    const result = await zoom.zstatus.sharing();
    console.log('zstatus.sharing');
    console.log(JSON.stringify(result, null, 2));
  });

  test('zstatus.cameraShare', async () => {
    const result = await zoom.zstatus.cameraShare();
    console.log('zstatus.cameraShare');
    console.log(JSON.stringify(result, null, 2));
  });

  test('zstatus.call.layout', async () => {
    const result = await zoom.zstatus.call.layout();
    console.log('zstatus.call.layout');
    console.log(JSON.stringify(result, null, 2));
  });

  test('zstatus.call.closedCaption.available', async () => {
    const result = await zoom.zstatus.call.closedCaption.available();
    console.log('zstatus.call.closedCaption.available');
    console.log(JSON.stringify(result, null, 2));
  });

  test('zstatus.numberOfScreens', async () => {
    const result = await zoom.zstatus.numberOfScreens();
    console.log('zstatus.numberOfScreens');
    console.log(JSON.stringify(result, null, 2));
  });
});

