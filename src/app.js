// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clock, reset } from './actions';
import { dump } from './utils/binary';
import BitArray from './components/bit-array';

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

  handleReset() {
    this.props.dispatch(reset());
  }

  render() {
    const { cpu: { register, flag, port, pc, rom } } = this.props;

    const romDump = [];
    const romView = new Uint8Array(rom);
    romView.forEach((oneByte, i) => {
      romDump.push(
        <li><BitArray data={oneByte} /> {pad(i)}</li>
      );
    });

    return <div>
      <h2>TD4.js</h2>
      <div>
        <button onClick={this.handleClock.bind(this)}>Clock</button>
        <button onClick={this.handleReset.bind(this)}>Reset</button>
      </div>
      <h3>Register</h3>
      <ul>
        <li><BitArray data={register.a} size={4} /> A</li>
        <li><BitArray data={register.b} size={4} /> B</li>
      </ul>
      <h3>
        Flag: <BitArray data={flag} size={4} />
      </h3>
      <h3>Port</h3>
      <ul>
        <li><BitArray data={port.input} size={4} /> Input</li>
        <li><BitArray data={port.output} size={4} /> Output</li>
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
