//      

const { EventEmitter } = require('events');
const { Client } = require('ssh2');
const { SSH2Stream } = require('ssh2-streams');

/**
 * Class representing a Zoom Rooms Control System
 */
class ZoomRoomsControlSystem extends EventEmitter {
               
                   
                     
                     
                   
                         
                  
                  

  constructor(host       , password       ) {
    super();
    this.host = host;
    this.password = password;

    const zcommand        = {
      dial: {},
      call: {},
      bookings: {},
      phonebook: {},
      phonecall: {},
      test: {},
      schedule: {},
    };
    this.zcommand = zcommand;

    const zconfiguration        = {
      call: {},
      audio: {},
      video: {},
    };
    this.zconfiguration = zconfiguration;

    const zstatus        = {
      call: {},
      audio: {},
      video: {},
    };

    this.zstatus = zstatus;

    zcommand.dial.start = (parameters                        ) => {
      this.command('zcommand dial start', parameters);
      return this.waitForCommand();
    };

    zcommand.dial.startPMI = (parameters                   ) => {
      this.command('zcommand dial startpmi', parameters);
      return this.waitForCommand('InfoResult');
    };

    zcommand.dial.join = (parameters                        ) => {
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

    zcommand.call.muteAll = (parameters                     ) => {
      this.command('zcommand call muteall', parameters);
      return this.waitForCommand();
    };

    zcommand.call.muteParticipant = (parameters                                 ) => {
      this.command('zcommand call muteparticipant', parameters);
      return this.waitForCommand();
    };

    zcommand.call.listParticipants = () => {
      this.command('zcommand call listparticipants');
      return this.waitForCommand();
    };

    zcommand.call.accept = (parameters                    ) => {
      this.command('zcommand call accept', parameters);
      return this.waitForCommand();
    };

    zcommand.call.reject = (parameters                    ) => {
      this.command('zcommand call reject', parameters);
      return this.waitForCommand();
    };

    zcommand.invite = (parameters                                         ) => {
      this.command('zcommand invite', parameters);
      return this.waitForCommand();
    };

    zcommand.phonebook.list = (parameters                                   ) => {
      this.command('zcommand phonebook list', parameters);
      return this.waitForCommand();
    };

    zcommand.run = (parameters               ) => {
      this.command('zcommand run', parameters);
      return this.waitForCommand();
    };

    zcommand.comment = (parameters               ) => {
      this.command('zcommand comment', parameters);
      return this.waitForCommand();
    };

    zcommand.wait = (parameters              ) => {
      this.command('zcommand wait', parameters);
      return this.waitForCommand();
    };

    zcommand.call.leave = () => {
      this.command('zcommand call leave');
      return this.waitForCommand('CallDisconnectResult');
    };

    zcommand.call.invite = (parameters                                     ) => {
      this.command('zcommand call invite', parameters);
      return this.waitForCommand();
    };

    zcommand.call.inviteH323Room = (parameters                                        ) => {
      this.command('zcommand call inviteh323room', parameters);
      return this.waitForCommand();
    };

    zcommand.call.inviteSIPRoom = (parameters                                        ) => {
      this.command('zcommand call invitesiproom', parameters);
      return this.waitForCommand();
    };

    zcommand.call.muteParticipantVideo = (parameters                            ) => {
      this.command('zcommand call muteparticipantvideo', parameters);
      return this.waitForCommand();
    };

    zcommand.bookings.update = () => {
      this.command('zcommand bookings update');
      return this.waitForCommand();
    };

    zcommand.dial.sharing = (parameters                                                                              ) => {
      this.command('zcommand dial sharing', parameters);
      return this.waitForCommand();
    };

    zcommand.call.shareCamera = (parameters                                   ) => {
      this.command('zcommand call sharecamera', parameters);
      return this.waitForCommand();
    };

    zcommand.call.setInstructions = (parameters                                                      ) => {
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

    zcommand.call.layout.turnPage = (parameters                   ) => {
      this.command('zcommand call layout turnpage', parameters);
      return this.waitForCommand();
    };

    zcommand.call.expel = (parameters             ) => {
      this.command('zcommand call expel', parameters);
      return this.waitForCommand();
    };

    zcommand.test.microphone = {};

    zcommand.test.microphone.start = (parameters             ) => {
      this.command('zcommand test microphone start', parameters);
      return this.waitForCommand();
    };

    zcommand.test.microphone.stop = () => {
      this.command('zcommand test microphone stop');
      return this.waitForCommand();
    };

    zcommand.test.speaker = {};

    zcommand.test.speaker.start = (parameters             ) => {
      this.command('zcommand test speaker start', parameters);
      return this.waitForCommand();
    };

    zcommand.test.speaker.stop = () => {
      this.command('zcommand test speaker stop');
      return this.waitForCommand();
    };

    zcommand.call.hostChange = (parameters             ) => {
      this.command('zcommand call hostchange', parameters);
      return this.waitForCommand();
    };

    zcommand.call.hostClaim = (parameters              ) => {
      this.command('zcommand call hostclaim', parameters);
      return this.waitForCommand();
    };

    zcommand.call.record = (parameters                       ) => {
      this.command('zcommand call record', parameters);
      return this.waitForCommand();
    };

    zcommand.call.spotlight = (parameters                                   ) => {
      this.command('zcommand call spotlight', parameters);
      return this.waitForCommand();
    };

    zcommand.call.allowRecord = (parameters                                   ) => {
      this.command('zcommand call allowrecord', parameters);
      return this.waitForCommand();
    };

    zcommand.call.cameraControl = (parameters                                                                                                                                                                                       ) => {
      this.command('zcommand call cameracontrol', parameters);
      return this.waitForCommand();
    };

    zcommand.dial.checkin = (parameters                        ) => {
      this.command('zcommand dial checkin', parameters);
      return this.waitForCommand();
    };

    zcommand.schedule.add = (parameters                                                                         ) => {
      this.command('zcommand schedule add', parameters);
      return this.waitForCommand();
    };

    zcommand.schedule.delete = (parameters                        ) => {
      this.command('zcommand schedule delete', parameters);
      return this.waitForCommand();
    };

    zcommand.dial.phoneCallOut = (parameters                 ) => {
      this.command('zcommand dial phonecallout', parameters);
      return this.waitForCommand();
    };

    zcommand.dial.phoneHangUp = (parameters                 ) => {
      this.command('zcommand dial phonehangup', parameters);
      return this.waitForCommand();
    };

    zcommand.phonecall.list = () => {
      this.command('zcommand phonecall list');
      return this.waitForCommand();
    };

    zconfiguration.call.sharing = (parameters                                       ) => {
      this.command('zconfiguration call sharing', parameters);
      return this.waitForConfiguration();
    };

    zconfiguration.call.sharing.optimize_video_sharing = () => {
      this.command('zconfiguration call sharing optimize_video_sharing');
      return this.waitForConfiguration();
    };

    zconfiguration.call.microphone = (parameters                     ) => {
      this.command('zconfiguration call microphone', parameters);
      return this.waitForConfiguration();
    };

    zconfiguration.call.microphone.mute = () => {
      this.command('zconfiguration call microphone mute');
      return this.waitForConfiguration();
    };

    zconfiguration.call.camera = (parameters                     ) => {
      this.command('zconfiguration call camera', parameters);
      return this.waitForConfiguration();
    };

    zconfiguration.audio.input = (parameters                     ) => {
      this.command('zconfiguration audio input', parameters);
      return this.waitForConfiguration();
    };

    zconfiguration.audio.input = (parameters                                ) => {
      this.command('zconfiguration audio input', parameters);
      return this.waitForConfiguration();
    };

    zconfiguration.audio.input = (parameters                              ) => {
      this.command('zconfiguration audio input', parameters);
      return this.waitForConfiguration();
    };

    zconfiguration.audio.input = (parameters                 ) => {
      this.command('zconfiguration audio input', parameters);
      return this.waitForConfiguration();
    };

    zconfiguration.audio.output = (parameters                     ) => {
      this.command('zconfiguration audio output', parameters);
      return this.waitForConfiguration();
    };

    zconfiguration.audio.output = (parameters                 ) => {
      this.command('zconfiguration audio output', parameters);
      return this.waitForConfiguration();
    };

    zconfiguration.video = (parameters                                     ) => {
      this.command('zconfiguration video', parameters);
      return this.waitForConfiguration();
    };

    zconfiguration.video.camera = (parameters                     ) => {
      this.command('zconfiguration video camera', parameters);
      return this.waitForConfiguration();
    };

    zconfiguration.video.camera = (parameters                       ) => {
      this.command('zconfiguration video camera', parameters);
      return this.waitForConfiguration();
    };

    zconfiguration.client = (parameters                     ) => {
      this.command('zconfiguration client', parameters);
      return this.waitForConfiguration();
    };

    zconfiguration.client = (parameters                       ) => {
      this.command('zconfiguration client', parameters);
      return this.waitForConfiguration();
    };

    zconfiguration.call.layout = (parameters                                                                                                                                                                                                                                                 ) => {
      this.command('zconfiguration call layout', parameters);
      return this.waitForConfiguration();
    };

    zconfiguration.call.lock = (parameters                  ) => {
      this.command('zconfiguration call lock', parameters);
      return this.waitForConfiguration();
    };

    zconfiguration.call.muteUserOnEntry = (parameters                  ) => {
      this.command('zconfiguration call muteuseronentry', parameters);
      return this.waitForConfiguration();
    };

    zconfiguration.call.closedCaption = (parameters                                          ) => {
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
    const stream = await new Promise((resolve, reject) => {
      connection.shell((error, s) => {
        if (error) {
          reject(error);
        } else {
          resolve(s);
        }
      });
    });
    connection.on('error', (error) => {
      if(error.code === 'ECONNABORTED') {
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
              const object = JSON.parse(lines.join('\n'));
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
              this.emit('error', error);
            }
            lines = null;
          }
        } else if (line === '*r Login successful') {
          this.emit('zStatus', 'Login', {});
          return;
        }
      }
    });
    this.stream = stream;
    this.connection = connection;
    this.command('format json');
    this.version = await this.waitForStatus('Login');
    await this.waitForStatus();
  }


  waitForCommand(topKey        , duration          = 15000)                 {
    // { type: 'zStatus', key: 'onUnsupported Command', data: {}
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        this.removeListener('error', handleError);
        this.removeListener('zCommand', handleCommand);
        reject(new Error('Timeout while waiting for command'));
      }, duration);
      const handleStatus = (tk       ) => {
        if(tk === 'onUnsupported Command') {
          clearTimeout(timeout);
          this.removeListener('zStatus', handleStatus);
          this.removeListener('error', handleError);
          this.removeListener('zCommand', handleCommand);
          reject(new Error('Unsupported command'));
        }
      };
      const handleCommand = (tk       , top       ) => {
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

  waitForConfiguration(topKey        , duration          = 15000)                 {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        this.removeListener('error', handleError);
        this.removeListener('zConfiguration', handleConfiguration);
        reject(new Error('Timeout while waiting for configuration'));
      }, duration);
      const handleConfiguration = (tk       , top       ) => {
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

  waitForStatus(topKey        , duration          = 15000)                 {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        this.removeListener('error', handleError);
        this.removeListener('zStatus', handleStatus);
        reject(new Error('Timeout while waiting for status'));
      }, duration);
      const handleStatus = (tk       , top       ) => {
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

  command(s       , parameters         ) {
    const stream = this.stream;
    if (!stream) {
      throw new Error('Not connected');
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
    console.log(`COMMAND ${command.join(' ')}`);
  }

  async disconnect() {
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
