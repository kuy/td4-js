// @flow

import BitModule from './utils/Bit';
import { toggleOneBit, toggleOneBitOfNum } from './utils/binary';
import type { CpuState } from './reducers';

const Bit = BitModule();

export function toggle(current: CpuState, name: string, nth: number): CpuState {
  const state = { ...current };

  if (name.indexOf('rom.') !== -1) {
    // ROM
    const i = parseInt(name.slice(4), 10);
    state.rom = state.rom.slice(0);
    const rom = new Uint8Array(state.rom);
    rom[i] = toggleOneBitOfNum(rom[i], nth);
  } else {
    // Others
    switch (name) {
      case 'register.a':
        state.register.a = state.register.a.slice(0);
        toggleOneBit(state.register.a, nth);
        break;
      case 'register.b':
        state.register.b = state.register.b.slice(0);
        toggleOneBit(state.register.b, nth);
        break;
      case 'flag':
        state.flag = state.flag.slice(0);
        toggleOneBit(state.flag, nth);
        break;
      case 'port.input':
        state.port.input = state.port.input.slice(0);
        toggleOneBit(state.port.input, nth);
        break;
      case 'port.output':
        state.port.output = state.port.output.slice(0);
        toggleOneBit(state.port.output, nth);
        break;
    }
  }

  return state;
}
