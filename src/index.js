// @flow
/* eslint-disable camelcase */

const { EventEmitter } = require('events');
const { Client } = require('ssh2');
const { SSH2Stream } = require('ssh2-streams');
const makeLogger = require('./logger');

type Logger = {
  debug: (string) => void,
  info: (string) => void,
  warn: (string) => void,
  error: (string) => void,
  errorStack: (Error) => void
};

/**
 * Class representing a Zoom Rooms Control System
 */
class ZoomRoomsControlSystem extends EventEmitter {
  declare host: string;
  declare password: string;
  declare connection: Client;
  declare stream: SSH2Stream;
  declare zcommand: Object;
  declare zconfiguration: Object;
  declare zstatus: Object;
  declare logger: Logger;
  declare enableFuzzing: boolean;
  declare fuzzingTimeout: TimeoutID | void;
  declare fuzzingInterval: IntervalID | void;

  constructor(host:string, password:string, logger?:Logger = makeLogger('ZR-CSAPI')) {
    super();
    this.host = host;
    this.password = password;
    this.logger = logger;
    this.enableFuzzing = false;
    const zcommand:Object = {
      dial: {},
      call: {},
      bookings: {},
      phonebook: {},
      phonecall: {},
      test: {},
      schedule: {},
    };
    this.zcommand = zcommand;

    const zconfiguration:Object = {
      call: {},
      audio: {},
      video: {},
      client: {},
    };
    this.zconfiguration = zconfiguration;

    const zstatus:Object = {
      call: {},
      audio: {},
      video: {},
    };

    this.zstatus = zstatus;

    zcommand.dial.start = (parameters:{meetingNumber: string}) => {
      this.command('zcommand dial start', parameters);
      return this.waitForCommand();
    };

    zcommand.dial.startPMI = (parameters:{duration: number}) => {
      this.command('zcommand dial startpmi', parameters);
      return this.waitForCommand('InfoResult');
    };

    zcommand.dial.join = (parameters:{meetingNumber: string, password?: string}) => {
      this.command('zcommand dial join', parameters);
      return this.waitForCommand();
    };

    zcommand.call.disconnect = () => {
      this.command('zcommand call disconnect');
      return this.waitForCommand('CallDisconnectResult');
    };

    zcommand.call.info = () => {
      this.command('zcommand call info');
      return this.waitForCommand();
    };

    zcommand.call.muteAll = (parameters:{mute: 'on' | 'off'}) => {
      this.command('zcommand call muteall', parameters);
      return this.waitForCommand();
    };

    zcommand.call.muteParticipant = (parameters:{mute: 'on' | 'off', id: number}) => {
      this.command('zcommand call muteparticipant', parameters);
      return this.waitForCommand();
    };

    zcommand.call.listParticipants = () => {
      this.command('zcommand call listparticipants');
      return this.waitForCommand();
    };

    zcommand.call.accept = (parameters:{callerJID: string}) => {
      this.command('zcommand call accept', parameters);
      return this.waitForCommand();
    };

    zcommand.call.reject = (parameters:{callerJID: string}) => {
      this.command('zcommand call reject', parameters);
      return this.waitForCommand();
    };

    zcommand.invite = (parameters:{duration: number, users: Array<string>}) => {
      this.command('zcommand invite', parameters);
      return this.waitForCommand();
    };

    zcommand.phonebook.list = (parameters?:{offset?: number, limit?: number}) => {
      this.command('zcommand phonebook list', parameters);
      return this.waitForCommand();
    };

    zcommand.run = (parameters:{file: string}) => {
      this.command('zcommand run', parameters);
      return this.waitForCommand();
    };

    zcommand.comment = (parameters:{text: string}) => {
      this.command('zcommand comment', parameters);
      return this.waitForCommand();
    };

    zcommand.wait = (parameters:{sec: number}) => {
      this.command('zcommand wait', parameters);
      return this.waitForCommand();
    };

    zcommand.call.leave = () => {
      this.command('zcommand call leave');
      return this.waitForCommand('CallDisconnectResult');
    };

    zcommand.call.invite = (parameters:{user: string, users: Array<string>}) => {
      this.command('zcommand call invite', parameters);
      return this.waitForCommand();
    };

    zcommand.call.inviteH323Room = (parameters:{address: string, cancel: 'on' | 'off'}) => {
      this.command('zcommand call inviteh323room', parameters);
      return this.waitForCommand();
    };

    zcommand.call.inviteSIPRoom = (parameters:{address: string, cancel: 'on' | 'off'}) => {
      this.command('zcommand call invitesiproom', parameters);
      return this.waitForCommand();
    };

    zcommand.call.muteParticipantVideo = (parameters:{mute: boolean, id: number}) => {
      this.command('zcommand call muteparticipantvideo', parameters);
      return this.waitForCommand();
    };

    zcommand.bookings.update = () => {
      this.command('zcommand bookings update');
      return this.waitForCommand();
    };

    zcommand.dial.sharing = (parameters:{duration: number, displayState: 'None' | 'Laptop' | 'IOS', password: string}) => {
      this.command('zcommand dial sharing', parameters);
      return this.waitForCommand();
    };

    zcommand.call.shareCamera = (parameters:{id: string, status: 'on' | 'off'}) => {
      this.command('zcommand call sharecamera', parameters);
      return this.waitForCommand();
    };

    zcommand.call.setInstructions = (parameters:{show: 'on' | 'off', type: 'Laptop' | 'IOS' | 'None'}) => {
      this.command('zcommand call setinstructions', parameters);
      return this.waitForCommand();
    };

    zcommand.call.sharing = {};

    zcommand.call.sharing.toNormal = () => {
      this.command('zcommand call sharing tonormal');
      return this.waitForCommand();
    };

    zcommand.call.sharing.disconnect = () => {
      this.command('zcommand call sharing disconnect');
      return this.waitForCommand();
    };

    zcommand.call.sharing.hdmi = {};

    zcommand.call.sharing.hdmi.start = () => {
      this.command('zcommand call sharing hdmi.start');
      return this.waitForCommand();
    };

    zcommand.call.sharing.hdmi.stop = () => {
      this.command('zcommand call sharing hdmi.stop');
      return this.waitForCommand();
    };

    zcommand.call.layout = {};

    zcommand.call.layout.turnPage = (parameters:{forward: boolean}) => {
      this.command('zcommand call layout turnpage', parameters);
      return this.waitForCommand();
    };

    zcommand.call.expel = (parameters:{id: number}) => {
      this.command('zcommand call expel', parameters);
      return this.waitForCommand();
    };

    zcommand.test.microphone = {};

    zcommand.test.microphone.start = (parameters:{id: string}) => {
      this.command('zcommand test microphone start', parameters);
      return this.waitForCommand();
    };

    zcommand.test.microphone.stop = () => {
      this.command('zcommand test microphone stop');
      return this.waitForCommand();
    };

    zcommand.test.speaker = {};

    zcommand.test.speaker.start = (parameters:{id: string}) => {
      this.command('zcommand test speaker start', parameters);
      return this.waitForCommand();
    };

    zcommand.test.speaker.stop = () => {
      this.command('zcommand test speaker stop');
      return this.waitForCommand();
    };

    zcommand.call.hostChange = (parameters:{id: number}) => {
      this.command('zcommand call hostchange', parameters);
      return this.waitForCommand();
    };

    zcommand.call.hostClaim = (parameters:{key: number}) => {
      this.command('zcommand call hostclaim', parameters);
      return this.waitForCommand();
    };

    zcommand.call.record = (parameters:{enable: 'on' | 'off'}) => {
      this.command('zcommand call record', parameters);
      return this.waitForCommand();
    };

    zcommand.call.spotlight = (parameters:{id: number, enable: 'on' | 'off'}) => {
      this.command('zcommand call spotlight', parameters);
      return this.waitForCommand();
    };

    zcommand.call.allowRecord = (parameters:{id: number, enable: 'on' | 'off'}) => {
      this.command('zcommand call allowrecord', parameters);
      return this.waitForCommand();
    };

    zcommand.call.cameraControl = (parameters:{id: number, speed?: number, state?: 'Start' | 'Continue' | 'Stop' | 'RequestRemote' | 'GiveupRemote' | 'RequestedByFarEnd', action?: 'Left' | 'Right' | 'Up' | 'Down' | 'In' | 'Out'}) => {
      this.command('zcommand call cameracontrol', parameters);
      return this.waitForCommand();
    };

    zcommand.dial.checkin = (parameters:{meetingNumber: string}) => {
      this.command('zcommand dial checkin', parameters);
      return this.waitForCommand();
    };

    zcommand.schedule.add = (parameters:{meetingName: string, start: string, end: string, private: 'on' | 'off'}) => {
      this.command('zcommand schedule add', parameters);
      return this.waitForCommand();
    };

    zcommand.schedule.delete = (parameters:{meetingNumber: string}) => {
      this.command('zcommand schedule delete', parameters);
      return this.waitForCommand();
    };

    zcommand.dial.phoneCallOut = (parameters:{number: string}) => {
      this.command('zcommand dial phonecallout', parameters);
      return this.waitForCommand();
    };

    zcommand.dial.phoneHangUp = (parameters:{callID: string}) => {
      this.command('zcommand dial phonehangup', parameters);
      return this.waitForCommand();
    };

    zcommand.phonecall.list = () => {
      this.command('zcommand phonecall list');
      return this.waitForCommand();
    };

    zconfiguration.call.sharing = (parameters:{optimize_video_sharing: 'on' | 'off'}) => {
      this.command('zconfiguration call sharing', parameters);
      return this.waitForConfiguration();
    };

    zconfiguration.call.sharing.optimize_video_sharing = () => {
      this.command('zconfiguration call sharing optimize_video_sharing');
      return this.waitForConfiguration();
    };

    zconfiguration.call.microphone = (parameters:{mute: 'on' | 'off'}) => {
      this.command('zconfiguration call microphone', parameters);
      return this.waitForConfiguration();
    };

    zconfiguration.call.microphone.mute = () => {
      this.command('zconfiguration call microphone mute');
      return this.waitForConfiguration();
    };

    zconfiguration.call.camera = (parameters:{mute: 'on' | 'off'}) => {
      this.command('zconfiguration call camera', parameters);
      return this.waitForConfiguration();
    };

    zconfiguration.audio.input = {};

    zconfiguration.audio.input.selectedID = (selectedID?: string) => {
      if (selectedID) {
        this.command('zconfiguration audio input', { selectedID });
      } else {
        this.command('zconfiguration audio input selectedID');
      }
      return this.waitForConfiguration();
    };

    zconfiguration.audio.input.is_sap_disabled = (is_sap_disabled?: 'on' | 'off') => {
      if (is_sap_disabled) {
        this.command('zconfiguration audio input', { is_sap_disabled });
      } else {
        this.command('zconfiguration audio input is_sap_disabled');
      }
      return this.waitForConfiguration();
    };

    zconfiguration.audio.input.reduce_reverb = (reduce_reverb?: 'on' | 'off') => {
      if (reduce_reverb) {
        this.command('zconfiguration audio input', { reduce_reverb });
      } else {
        this.command('zconfiguration audio input reduce_reverb');
      }
      return this.waitForConfiguration();
    };

    zconfiguration.audio.input.volume = (volume?: number) => {
      if (volume) {
        this.command('zconfiguration audio input', { volume });
      } else {
        this.command('zconfiguration audio input volume');
      }
      return this.waitForConfiguration();
    };

    zconfiguration.audio.output = {};

    zconfiguration.audio.output.selectedID = (selectedID?: string) => {
      if (selectedID) {
        this.command('zconfiguration audio output', { selectedID });
      } else {
        this.command('zconfiguration audio output selectedID');
      }
      return this.waitForConfiguration();
    };

    zconfiguration.audio.output.volume = (volume?: number) => {
      if (volume) {
        this.command('zconfiguration audio output', { volume });
      } else {
        this.command('zconfiguration audio output volume');
      }
      return this.waitForConfiguration();
    };

    zconfiguration.video = (parameters:{hide_conf_self_video: 'on' | 'off'}) => {
      this.command('zconfiguration video', parameters);
      return this.waitForConfiguration();
    };

    zconfiguration.video.camera = {};

    zconfiguration.video.camera.selectedID = (selectedID?: string) => {
      if (selectedID) {
        this.command('zconfiguration video camera', { selectedID });
      } else {
        this.command('zconfiguration video camera selectedID');
      }
      return this.waitForConfiguration();
    };

    zconfiguration.video.camera.mirror = (mirror?: 'on' | 'off') => {
      if (mirror) {
        this.command('zconfiguration video camera', { mirror });
      } else {
        this.command('zconfiguration video camera mirror');
      }
      return this.waitForConfiguration();
    };

    zconfiguration.client.appVersion = (appVersion?: string) => {
      if (appVersion) {
        this.command('zconfiguration client', { appVersion });
      } else {
        this.command('zconfiguration client appVersion');
      }
      return this.waitForConfiguration();
    };

    zconfiguration.client.deviceSystem = (deviceSystem?: string) => {
      if (deviceSystem) {
        this.command('zconfiguration client', { deviceSystem });
      } else {
        this.command('zconfiguration client deviceSystem');
      }
      return this.waitForConfiguration();
    };

    zconfiguration.call.layout = (parameters:{shareThumb?: 'on' | 'off', style?: 'Gallery' | 'Speaker' | 'Strip' | 'ShareAll', size?: 'Off' | 'Size1' | 'Size2' | 'Size3' | 'Strip', position: 'Center' | 'Up' | 'Right' | 'UpRight' | 'Down' | 'DownRight' | 'Left' | 'UpLeft' | 'DownLeft'}) => {
      this.command('zconfiguration call layout', parameters);
      return this.waitForConfiguration();
    };

    zconfiguration.call.lock = (parameters:{enable: boolean}) => {
      this.command('zconfiguration call lock', parameters);
      return this.waitForConfiguration();
    };

    zconfiguration.call.muteUserOnEntry = (parameters:{enable: boolean}) => {
      this.command('zconfiguration call muteuseronentry', parameters);
      return this.waitForConfiguration();
    };

    zconfiguration.call.closedCaption = (parameters:{visible?: boolean, fontSize?: 0 | 1 | 2}) => {
      this.command('zconfiguration call closedcaption', parameters);
      return this.waitForConfiguration();
    };


    zstatus.call.status = () => {
      this.command('zstatus call status');
      return this.waitForStatus();
    };

    zstatus.audio.input = {};

    zstatus.audio.input.line = () => {
      this.command('zstatus audio input line');
      return this.waitForStatus();
    };

    zstatus.audio.output = {};

    zstatus.audio.output.line = () => {
      this.command('zstatus audio output line');
      return this.waitForStatus();
    };

    zstatus.video.camera = {};

    zstatus.video.camera.line = () => {
      this.command('zstatus video camera line');
      return this.waitForStatus();
    };

    zstatus.video.optimizable = () => {
      this.command('zstatus video optimizable');
      return this.waitForStatus();
    };

    zstatus.systemUnit = () => {
      this.command('zstatus systemunit');
      return this.waitForStatus();
    };

    zstatus.capabilities = () => {
      this.command('zstatus capabilities');
      return this.waitForStatus();
    };

    zstatus.sharing = () => {
      this.command('zstatus sharing');
      return this.waitForStatus();
    };

    zstatus.cameraShare = () => {
      this.command('zstatus camerashare');
      return this.waitForStatus();
    };

    zstatus.call.layout = () => {
      this.command('zstatus call layout');
      return this.waitForStatus();
    };

    zstatus.call.closedCaption = {};

    zstatus.call.closedCaption.available = () => {
      this.command('zstatus call closedcaption available');
      return this.waitForStatus();
    };

    zstatus.numberOfScreens = () => {
      this.command('zstatus numberofscreens');
      return this.waitForStatus();
    };
  }

  async connect() {
    const connection = new Client();
    connection.connect({
      port: 2244,
      host: this.host,
      username: 'zoom',
      password: this.password,
    });
    this.logger.info(`Connecting via SSH to zoom@${this.host}:2244`);
    await new Promise((resolve, reject) => {
      const handleReady = () => {
        connection.removeListener('error', handleError);
        resolve();
      };
      const handleError = (error) => {
        connection.removeListener('ready', handleReady);
        reject(error);
      };
      connection.once('ready', handleReady);
      connection.once('error', handleError);
    });
    connection.on('error', (error) => {
      if (error.code === 'ECONNABORTED') {
        this.emit('close');
      } else {
        this.emit('error', error);
      }
      delete this.stream;
      delete this.connection;
    });
    connection.on('close', () => {
      delete this.stream;
      delete this.connection;
      this.emit('close');
    });
    this.connection = connection;
    this.logger.info('Starting shell');
    const stream = await new Promise((resolve, reject) => {
      connection.shell((error, s) => {
        if (error) {
          reject(error);
        } else {
          resolve(s);
        }
      });
    });
    if (!this.connection) {
      throw new Error('Unable to connect to Zoom Room, connection does not exist');
    }
    this.stream = stream;
    stream.on('error', (error) => {
      delete this.stream;
      delete this.connection;
      connection.end();
      this.emit('error', error);
    });
    stream.on('close', () => {
      delete this.stream;
      delete this.connection;
      connection.end();
    });
    if (this.enableFuzzing) {
      clearTimeout(this.fuzzingTimeout);
      clearInterval(this.fuzzingInterval);
      this.logger.warn('Fuzzing enabled! This is a feature for testing this library that will send bad data to connection.');
      const fuzz = () => {
        try {
          const v = Math.random();
          if (v > 0.9) {
            this.logger.warn('FUZZ: Emitting error');
            this.emit('error', new Error('Fuzzing error'));
          } else if (v > 0.8) {
            this.logger.warn('FUZZ: Closing connection');
            connection.end();
          } else if (v > 0.7) {
            this.logger.warn('FUZZ: Destroying stream with error');
            stream.destroy(new Error('Fuzzing stream error'));
          } else if (v > 0.6) {
            this.logger.warn('FUZZ: Switching to CLI format and sending zStatus SystemUnit command');
            this.command('format cli');
            this.command('zstatus systemunit');
          } else if (v > 0.5) {
            this.logger.warn('FUZZ: Sending invalid string to stream parser then sending zStatus SystemUnit command');
            stream.push(Buffer.from(Math.random().toString()));
            this.command('zstatus systemunit');
          } else if (v > 0.4) {
            this.logger.warn('FUZZ: Sending invalid message object to stream parser');
            stream.push(Buffer.from(JSON.stringify({ [Math.random().toString()]: Math.random().toString() }, null, 2)));
          } else if (v > 0.3) {
            this.logger.warn('FUZZ: Sending 100 zStatus SystemUnit commands');
            for (let i = 0; i < 100; i += 1) {
              this.command('zstatus systemunit');
            }
          } else if (v > 0.2) {
            this.logger.warn('FUZZ: Disconnecting');
            this.disconnect();
          } else if (v > 0.1) {
            this.logger.warn('FUZZ: Sending invalid zConfiguration');
            this.command(`zconfiguration ${Math.random()}`);
          } else if (v > 0) {
            this.logger.warn('FUZZ: Sending invalid zCommand');
            this.command(`zcommand ${Math.random()}`);
          }
          this.fuzzingTimeout = setTimeout(fuzz, Math.round(Math.random() * 30000));
        } catch (error) {
          this.logger.error('FUZZ: Uncaught error');
          this.logger.errorStack(error);
        }
      };
      fuzz();
      this.fuzzingInterval = setInterval(() => {
        try {
          const commands = ['zstatus call status',
            'zstatus audio input line',
            'zstatus audio output line',
            'zstatus video camera line',
            'zstatus video optimizable',
            'zstatus systemunit',
            'zstatus capabilities',
            'zstatus sharing',
            'zstatus camerashare',
            'zstatus call layout',
            'zstatus call closedcaption available',
            'zstatus numberofscreens'];
          this.command(commands[Math.floor(Math.random() * commands.length)]);
        } catch (error) {
          this.logger.error('FUZZ: Uncaught error (zStatus interval)');
          this.logger.errorStack(error);
          clearInterval(this.fuzzingInterval);
        }
      }, 5000);
    }
    this.logger.info('Waiting for startup messages...');
    await new Promise((resolve) => {
      let timeout;
      const handleTimeout = () => {
        stream.removeListener('data', handleData);
        resolve();
      };
      const handleData = (data) => {
        if (data) {
          data.toString().trim().split('\n').map((line) => this.logger.warn(line));
        }
        clearTimeout(timeout);
        timeout = setTimeout(handleTimeout, 1000);
      };
      timeout = setTimeout(handleTimeout, 1000);
      stream.on('data', handleData);
    });
    let lines = null;
    stream.on('data', (data) => {
      for (const line of data.toString().split('\r\n')) {
        if (line.indexOf('{') === 0) {
          lines = [];
        }
        if (lines) {
          lines.push(line);
          if (line.indexOf('}') === 0) {
            try {
              const object = JSON.parse(lines.join(''));
              JSON.stringify(object, null, 2).split('\n').map((l) => this.logger.warn(l));
              const { type, topKey } = object;
              if (!type) {
                throw new Error(`Missing type in message object ${JSON.stringify(object)}`);
              }
              if (!topKey) {
                throw new Error(`Missing topKey in message object ${JSON.stringify(object)}`);
              }
              const top = object[topKey];
              if (!top) {
                throw new Error(`Missing top in message object ${JSON.stringify(object)}`);
              }
              this.emit(type, topKey, top);
            } catch (error) {
              if (error.name === 'SyntaxError') {
                this.logger.error('JSON parse error');
                lines.map((l) => this.logger.warn(l));
              } else {
                this.emit('error', error);
              }
            }
            lines = null;
          }
        }
      }
    });
    this.logger.info('Checking SystemUnit status');
    for (let i = 1; i < 7; i += 1) {
      if (!this.stream) {
        throw new Error('Unable to connect to Zoom Room, stream does not exist');
      }
      if (!this.connection) {
        throw new Error('Unable to connect to Zoom Room, connection does not exist');
      }
      try {
        this.command('format json');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await this.zstatus.systemUnit();
        return;
      } catch (error) {
        this.logger.error('Unable to get systemUnit status');
        this.logger.errorStack(error);
      }
      this.logger.warn(`Retrying ZR-CSAPI handshake in ${i * i} seconds, attempt ${i}`);
      await new Promise((resolve) => setTimeout(resolve, 1000 * i * i));
    }
    throw new Error('Unable to connect to Zoom Room');
  }


  waitForCommand(topKey?:string, duration?: number = 15000):Promise<Object> {
    // { type: 'zStatus', key: 'onUnsupported Command', data: {}
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        this.removeListener('error', handleError);
        this.removeListener('zCommand', handleCommand);
        reject(new Error('Timeout while waiting for command'));
      }, duration);
      const handleStatus = (tk:string) => {
        if (tk === 'onUnsupported Command') {
          clearTimeout(timeout);
          this.removeListener('zStatus', handleStatus);
          this.removeListener('error', handleError);
          this.removeListener('zCommand', handleCommand);
          reject(new Error('Unsupported command'));
        }
      };
      const handleCommand = (tk:string, top:Object) => {
        if (!topKey || (topKey && tk === topKey)) {
          clearTimeout(timeout);
          this.removeListener('zStatus', handleStatus);
          this.removeListener('error', handleError);
          this.removeListener('zCommand', handleCommand);
          resolve(top);
        }
      };
      const handleError = (error) => {
        clearTimeout(timeout);
        this.removeListener('zStatus', handleStatus);
        this.removeListener('error', handleError);
        this.removeListener('zCommand', handleCommand);
        reject(error);
      };
      this.on('zStatus', handleStatus);
      this.on('zCommand', handleCommand);
      this.on('error', handleError);
    });
  }

  waitForConfiguration(topKey?:string, duration?: number = 15000):Promise<Object> {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        this.removeListener('error', handleError);
        this.removeListener('zConfiguration', handleConfiguration);
        reject(new Error('Timeout while waiting for configuration'));
      }, duration);
      const handleConfiguration = (tk:string, top:Object) => {
        if (!topKey || (topKey && tk === topKey)) {
          clearTimeout(timeout);
          this.removeListener('error', handleError);
          this.removeListener('zConfiguration', handleConfiguration);
          resolve(top);
        }
      };
      const handleError = (error) => {
        clearTimeout(timeout);
        this.removeListener('error', handleError);
        this.removeListener('zConfiguration', handleConfiguration);
        reject(error);
      };
      this.on('zConfiguration', handleConfiguration);
      this.on('error', handleError);
    });
  }

  waitForStatus(topKey?:string, duration?: number = 15000):Promise<Object> {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        this.removeListener('error', handleError);
        this.removeListener('zStatus', handleStatus);
        reject(new Error('Timeout while waiting for status'));
      }, duration);
      const handleStatus = (tk:string, top:Object) => {
        if (!topKey || (topKey && tk === topKey)) {
          clearTimeout(timeout);
          this.removeListener('error', handleError);
          this.removeListener('zStatus', handleStatus);
          resolve(top);
        }
      };
      const handleError = (error) => {
        clearTimeout(timeout);
        this.removeListener('error', handleError);
        this.removeListener('zStatus', handleStatus);
        reject(error);
      };
      this.on('zStatus', handleStatus);
      this.on('error', handleError);
    });
  }

  command(s:string, parameters?: Object) {
    const stream = this.stream;
    if (!stream) {
      throw new Error(`Unable to send command, not connected: ${s} ${parameters ? JSON.stringify(parameters) : ''}`);
    }
    const command = [s];
    if (parameters) {
      Object.keys(parameters).forEach((key) => {
        if (key === 'users') {
          for (const user of parameters.users) {
            command.push(`user: ${user}`);
          }
        } else {
          command.push(`${key}: ${parameters[key]}`);
        }
      });
    }
    command.push('\r');
    stream.write(command.join(' '));
  }

  async disconnect() {
    clearTimeout(this.fuzzingTimeout);
    clearInterval(this.fuzzingInterval);
    const stream = this.stream;
    if (!stream) {
      return;
    }
    const connection = this.connection;
    if (!connection) {
      throw new Error('Connection does not exist');
    }
    await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        connection.end();
      }, 3000);
      const handleClose = () => {
        clearTimeout(timeout);
        connection.removeListener('error', handleError);
        stream.destroy();
        resolve();
      };
      const handleError = (error) => {
        clearTimeout(timeout);
        connection.removeListener('close', handleClose);
        stream.destroy();
        reject(error);
      };
      this.once('close', handleClose);
      this.once('error', handleError);
      stream.write('bye\r');
    });
  }
}

module.exports = ZoomRoomsControlSystem;
