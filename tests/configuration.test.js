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

describe('zConfiguration', () => {
  const zoom = new ZoomRoomsControlSystem(HOSTNAME, PASSWORD);

  beforeAll(async () => {
    await zoom.connect();
    await zoom.zcommand.dial.startPMI({ duration: 10 });
  });

  afterAll(async () => {
    await zoom.zcommand.call.leave();
    await zoom.disconnect();
  });

  test('zconfiguration.call.sharing.optimize_video_sharing', async () => {
    let result = await zoom.zconfiguration.call.sharing.optimize_video_sharing();
    console.log('zconfiguration.call.sharing.optimize_video_sharing');
    console.log(JSON.stringify(result, null, 2));
    result = await zoom.zconfiguration.call.sharing({ optimize_video_sharing: 'on' });
    console.log('zconfiguration.call.sharing (ON)');
    console.log(JSON.stringify(result, null, 2));
    result = await zoom.zconfiguration.call.sharing({ optimize_video_sharing: 'off' });
    console.log('zconfiguration.call.sharing (OFF)');
    console.log(JSON.stringify(result, null, 2));
  });

  test('zconfiguration.call.microphone.mute', async () => {
    let result = await zoom.zconfiguration.call.microphone.mute();
    console.log('zconfiguration.call.microphone.mute');
    console.log(JSON.stringify(result, null, 2));
    result = await zoom.zconfiguration.call.microphone({ mute: 'on' });
    console.log('zconfiguration.call.microphone (ON)');
    console.log(JSON.stringify(result, null, 2));
    result = await zoom.zconfiguration.call.microphone({ mute: 'off' });
    console.log('zconfiguration.call.microphone (OFF)');
    console.log(JSON.stringify(result, null, 2));
  });
});

