// @flow

import { combineReducers } from 'redux';
import { CLOCK } from './actions';
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

const a = new ArrayBuffer(1);
const v = new DataView(a);
v.setUint8(0, 15);

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
    rom: new ArrayBuffer(ROM_SIZE),
  },
};

function cpu(state: CpuState = initial.cpu, { type, payload }: Action): CpuState {
  switch (type) {
    case CLOCK:
      return { ...state, behavior: payload };
  }
  return state;
}

export default combineReducers(
  { cpu }
);
