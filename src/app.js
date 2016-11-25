// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clock, reset, toggle } from './actions';
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

  handleToggle(name, nth) {
    this.props.dispatch(toggle({ name, nth }));
  }

  render() {
    const { cpu: { register, flag, port, pc, rom } } = this.props;

    const handle = {
      onToggle: this.handleToggle.bind(this),
    };

    const romDump = [];
    const romView = new Uint8Array(rom);
    romView.forEach((oneByte, i) => {
      romDump.push(
        <li><BitArray name={`rom.${i}`} data={oneByte} {...handle} /> {pad(i)}</li>
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
        <li><BitArray name="register.a" data={register.a} size={4} {...handle} /> A</li>
        <li><BitArray name="register.b" data={register.b} size={4} {...handle} /> B</li>
      </ul>
      <h3>
        Flag: <BitArray name="flag" data={flag} size={4} {...handle} />
      </h3>
      <h3>Port</h3>
      <ul>
        <li><BitArray name="port.input" data={port.input} size={4} {...handle} /> Input</li>
        <li><BitArray name="port.output" data={port.output} size={4} {...handle} /> Output</li>
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
