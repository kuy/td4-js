// @flow

import BitModule from './utils/Bit';
import { MAX_NUM } from './constants';
import { dump, setOneByte, getOneByte, getOneBit } from './utils/binary';
import type { CpuState } from './reducers';

const Bit = BitModule();

const CARRY_BIT = 0b0001;
function carry(flag: ArrayBuffer, on: bool): ArrayBuffer {
  const newFlag = flag.slice(0);
  const view = new Uint8Array(newFlag);
  if (on) {
    view[0] = view[0] | CARRY_BIT;
  } else {
    view[0] = view[0] & (~CARRY_BIT);
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
      const na = getOneByte(state.register.a) + im;
      state.flag = carry(state.flag, MAX_NUM <= na);
      state.register.a = state.register.a.slice(0);
      setOneByte(state.register.a, na);
      break;
    case 0b0001: // MOV A, B
      state.flag = carry(state.flag, false);
      state.register.a = state.register.a.slice(0);
      setOneByte(state.register.a, state.register.b);
      break;
    case 0b0010: // IN A
      state.flag = carry(state.flag, false);
      state.register.a = state.register.a.slice(0);
      setOneByte(state.register.a, state.port.input);
      break;
    case 0b0011: // MOV A, Im
      state.flag = carry(state.flag, false);
      state.register.a = state.register.a.slice(0);
      setOneByte(state.register.a, im);
      break;
    case 0b0100: // MOV B, A
      state.flag = carry(state.flag, false);
      state.register.b = state.register.b.slice(0);
      setOneByte(state.register.b, state.register.a);
      break;
    case 0b0101: // ADD B, Im
      const nb = getOneByte(state.register.b) + im;
      state.flag = carry(state.flag, MAX_NUM <= nb);
      state.register.b = state.register.b.slice(0);
      setOneByte(state.register.b, nb);
      break;
    case 0b0110: // IN B
      state.flag = carry(state.flag, false);
      state.register.b = state.register.b.slice(0);
      setOneByte(state.register.b, state.port.input);
      break;
    case 0b0111: // MOV B, Im
      state.flag = carry(state.flag, false);
      state.register.b = state.register.b.slice(0);
      setOneByte(state.register.b, im);
      break;
    case 0b1001: // OUT B
      state.flag = carry(state.flag, false);
      state.port.output = state.port.output.slice(0);
      setOneByte(state.port.output, state.register.b);
      break;
    case 0b1011: // OUT Im
      state.flag = carry(state.flag, false);
      state.port.output = state.port.output.slice(0);
      setOneByte(state.port.output, im);
      break;
    case 0b1110: // JNC Im
      state.flag = carry(state.flag, false);
      if (!getOneBit(current.flag, 0)) {
        state.pc = im;
      }
      break;
    case 0b1111: // JNP Im
      state.flag = carry(state.flag, false);
      state.pc = im;
      break;
    default:
      throw new Error(`Error: Not implemented opcode: ${dump(op, 4)}`);
  }

  state.pc += 1;

  return state;
}
