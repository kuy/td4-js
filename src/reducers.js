// @flow

import { combineReducers } from 'redux';
import { CLOCK, RESET, TOGGLE } from './actions';
import * as processor from './processor';
import * as memory from './memory';
import { ROM_SIZE } from './constants';
import type { Action } from './actions';

type Register = ArrayBuffer;
type Flag = ArrayBuffer;
type Port = ArrayBuffer;
type ProgramCounter = number;
type ProgramMemory = ArrayBuffer;

export type State = {
  cpu: CpuState,
};

export type CpuState = {
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
view[0] = 0b00111001;
view[1] = 0b00000111;
view[2] = 0b01110000;

function genInitialCpuState(): CpuState {
  return {
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
  };
}

const initial = {
  cpu: genInitialCpuState(),
};

function cpu(state: CpuState = initial.cpu, { type, payload }: Action): CpuState {
  switch (type) {
    case CLOCK:
      return processor.execute(state);
    case RESET:
      return genInitialCpuState();
    case TOGGLE:
      return memory.toggle(state, payload.name, payload.nth);
  }
  return state;
}

export default combineReducers(
  { cpu }
);
