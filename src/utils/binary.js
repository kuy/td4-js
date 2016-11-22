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

export function setOneByte(buffer: ArrayBuffer, n: number): void {
  const view = new Uint8Array(buffer);
  view[0] = Bit.split8(n, [8]);
}

export function getOneByte(buffer: ArrayBuffer): number {
  const view = new Uint8Array(buffer);
  return view[0];
}
