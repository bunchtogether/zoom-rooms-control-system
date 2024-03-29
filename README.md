# Unofficial Zoom Rooms Control System Client

[![npm version](https://badge.fury.io/js/%40bunchtogether%2Fzoom-rooms-control-system.svg)](http://badge.fury.io/js/%40bunchtogether%2Fzoom-rooms-control-system)

ZOOM is a trademark of Zoom Video Communications, Inc. All content on this page derived from the [Zoom API (v2) Swagger definition](https://marketplace.zoom.us/docs/api-reference/zoom-api/Zoom%20API.oas2.json) copyright Zoom Video Communications, Inc.

## Install

`yarn add @bunchtogether/zoom-rooms-control-system`

## Usage

```js
import ZoomRoomsControlSystem from 'zoom-rooms-control-system';

const run = async () => {
}

run();


/*

Logs:


*/
```

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

#### Table of Contents

-   [ZoomRoomsControlSystem](#zoomroomscontrolsystem)
    -   [Parameters](#parameters)

### ZoomRoomsControlSystem

**Extends EventEmitter**

Class representing a Zoom Rooms Control System

#### Parameters

-   `host`  
-   `password`  
-   `logger`   (optional, default `makeLogger('ZR-CSAPI')`)
