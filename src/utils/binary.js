// @flow

import BitModule from './Bit';

const Bit = BitModule();

export function dump(oneByte: number | ArrayBuffer, bit: number = 8): string {
  if (typeof oneByte !== 'number') {
    const view = new Uint8Array(oneByte);
    oneByte = view[0];
  }
  return Bit.dump(oneByte, [32 - bit, bit]).split(', ')[1];
}

export function setOneByte(buffer: ArrayBuffer, n: number | ArrayBuffer): void {
  if (typeof n !== 'number') {
    n = getOneByte(n);
  }
  const view = new Uint8Array(buffer);
  view[0] = Bit.split8(n, [8]);
}

export function getOneByte(buffer: ArrayBuffer): number {
  const view = new Uint8Array(buffer);
  return view[0];
}

export function getOneBit(buffer: ArrayBuffer, nth: number): bool {
  const view = new Uint8Array(buffer);
  return Bit.n(view[0], 1 << nth);
}

export function setOneBit(buffer: ArrayBuffer, nth: number, state: bool | number): void {
  const view = new Uint8Array(buffer);
  view[0] = setOneBitOfNum(view[0], nth, state);
}

export function toggleOneBit(buffer: ArrayBuffer, nth: number): bool {
  const state = getOneBit(buffer, nth);
  const newState = !state;
  setOneBit(buffer, nth, newState);
  return newState;
}

export function setOneBitOfNum(num: number, nth: number, state: bool | number): number {
  if (typeof state === 'number') {
    state = state === 1;
  }

  let mask = 1 << nth;
  if (!state) {
    mask = ~mask;
  }

  if (state) {
    return num | mask;
  } else {
    return num & mask;
  }
}

export function toggleOneBitOfNum(num: number, nth: number): number {
  const buf = new ArrayBuffer(1);
  setOneByte(buf, num);
  const state = getOneBit(buf, nth);
  return setOneBitOfNum(num, nth, !state);
}
