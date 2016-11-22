// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import BitModule from './utils/Bit';

const Bit = BitModule();

function dump(data: ArrayBuffer): string {
  const view = new Uint8Array(data);
  return dumpByte(view[0]);
}

function dumpByte(oneByte: number): string {
  const full = Bit.dump(oneByte, [24, 8]);
  const parts = full.split(', ');
  return parts[parts.length - 1];
}

function pad(num: number | string, len: number = 2): string {
  if (typeof num !== 'string') {
    num = num + '';
  }

  while (num.length < len) {
    num = '0' + num;
  }

  return num;
}

class App extends Component {
  render() {
    const { cpu: { register, flag, port, pc, rom } } = this.props;

    const romDump = [];
    const romView = new Uint8Array(rom);
    romView.forEach((oneByte, i) => {
      romDump.push(<li><code>{pad(i)}</code>: <code>{dumpByte(oneByte)}</code></li>);
    });

    return <div>
      <h3>Register</h3>
      <ul>
        <li>A: <code>{dump(register.a)}</code></li>
        <li>B: <code>{dump(register.b)}</code></li>
      </ul>
      <h3>Flag: {dump(flag)}</h3>
      <h3>Port</h3>
      <ul>
        <li> Input: <code>{dump(port.input)}</code></li>
        <li>Output: <code>{dump(port.output)}</code></li>
      </ul>
      <h3>Program Counter: {pc}</h3>
      <h3>ROM</h3>
      <ul>{romDump}</ul>
    </div>;
  }
}

function select({ cpu }) {
  return { cpu };
}

export default connect(select)(App);
