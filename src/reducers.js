// @flow

import { combineReducers } from 'redux';
import { CLOCK } from './actions';
import * as processor from './processor';
import type { Action } from './actions';

type Register = ArrayBuffer;
type Flag = ArrayBuffer;
type Port = ArrayBuffer;
type ProgramCounter = number;
type ProgramMemory = ArrayBuffer;

const ROM_SIZE = 16;

type State = {
  cpu: CpuState,
};

type CpuState = {
  register: {
    a: Register,
    b: Register,
  },
  flag: Flag,
  port: {
    input: Port,
    output: Port,
  },
  pc: ProgramCounter,
  rom: ProgramMemory,
};

const rom = new ArrayBuffer(ROM_SIZE);
const view = new Uint8Array(rom);
view[0] = 0b00110010;
view[1] = 0b00000011;

const initial = {
  cpu: {
    register: {
      a: new ArrayBuffer(1),
      b: new ArrayBuffer(1),
    },
    flag: new ArrayBuffer(1),
    port: {
      input: new ArrayBuffer(1),
      output: new ArrayBuffer(1),
    },
    pc: 0,
    rom,
  },
};

function cpu(state: CpuState = initial.cpu, { type, payload }: Action): CpuState {
  switch (type) {
    case CLOCK:
      return processor.execute(state);
  }
  return state;
}

export default combineReducers(
  { cpu }
);
