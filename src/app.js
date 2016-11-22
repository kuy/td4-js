// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clock, reset } from './actions';
import { dump } from './utils/binary';

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
  handleClock() {
    this.props.dispatch(clock());
  }

  render() {
    const { cpu: { register, flag, port, pc, rom } } = this.props;

    const romDump = [];
    const romView = new Uint8Array(rom);
    romView.forEach((oneByte, i) => {
      romDump.push(<li><code>{pad(i)}: {dump(oneByte)}</code></li>);
    });

    return <div>
      <h2>TD4.js</h2>
      <div>
        <button onClick={this.handleClock.bind(this)}>Clock</button>
        <button>Reset</button>
      </div>
      <h3>Register</h3>
      <ul>
        <li>A: <code>{dump(register.a, 4)}</code></li>
        <li>B: <code>{dump(register.b, 4)}</code></li>
      </ul>
      <h3>Flag: {dump(flag, 4)}</h3>
      <h3>Port</h3>
      <ul>
        <li> Input: <code>{dump(port.input, 4)}</code></li>
        <li>Output: <code>{dump(port.output, 4)}</code></li>
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
