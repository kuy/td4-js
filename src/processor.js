// @flow

import BitModule from './utils/Bit';
import { MAX_NUM } from './constants';
import { dump, setOneByte, getOneByte } from './utils/binary';
import type { CpuState } from './reducers';

const Bit = BitModule();

const CARRY_BIT = 0b00000001;
function carry(flag: ArrayBuffer, on: bool): ArrayBuffer {
  const newFlag = flag.slice(0);
  const view = new Uint8Array(newFlag);
  if (on) {
    view[0] = view[0] | CARRY_BIT;
  } else {
    view[0] = view[0] & Bit.reverse8(CARRY_BIT);
  }
  return newFlag;
}

export function execute(current: CpuState): CpuState {
  const state = { ...current };

  const rom = new Uint8Array(current.rom);
  const inst = rom[current.pc];
  const [ op, im ] = Bit.split8(inst, [4, 4]);

  switch (op) {
    case 0b0000: // ADD A, Im
      const n = getOneByte(state.register.a) + im;
      state.flag = carry(state.flag, MAX_NUM <= n);
      state.register.a = state.register.a.slice(0);
      setOneByte(state.register.a, n);
      break;
    case 0b0011: // MOV A, Im
      state.register.a = state.register.a.slice(0);
      setOneByte(state.register.a, im);
      break;
    default:
      throw new Error(`Error: Not implemented opcode: ${dump(op, 4)}`);
  }

  state.pc += 1;

  return state;
}
