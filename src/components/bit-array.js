// @flow

import React, { Component } from 'react';
import BitModule from '../utils/Bit';
import { setOneByte, getOneBit } from '../utils/binary';

const Bit = BitModule();

type onToggleFn = (name: ?string, nth: number) => void;

type Props = {
  name?: string,
  data: ArrayBuffer | number,
  size: number,
  onToggle: onToggleFn,
};

function range(n: number): Array<number> {
  let i = 0, list = [];
  while (i < n) {
    list.push(i);
    i++;
  }
  return list;
}

const wrapperStyle = {
  display: 'inline-block',
  webkitPaddingStart: '0',
  webkitMarginBefore: '0',
  webkitMarginAfter: '0',
};

function style(state: bool) {
  const base = {
    display: 'inline-block',
    width: '18px',
    height: '18px',
    border: '1px solid black',
    textAlign: 'center',
    fontFamily: 'monospace',
    fontSize: '14px',
    userSelect: 'none',
    cursor: 'pointer',
  };

  if (state) {
    base.color = 'gray';
    base.backgroundColor = 'white';
  } else {
    base.color = 'gray';
    base.backgroundColor = 'black';
  }

  return base;
}

export default class BitArray extends Component {
  props: Props;

  static defaultProps: {
    name?: string,
    data: ArrayBuffer | number,
    size: number,
    onToggle: onToggleFn
  }

  handleClick(nth: number) {
    const { name, onToggle } = this.props;
    onToggle(name, nth);
  }

  render() {
    let { data } = this.props;
    if (typeof data === 'number') {
      const buf = new ArrayBuffer(1);
      setOneByte(buf, data);
      data = buf;
    }

    const { size } = this.props;
    const list = range(size);
    list.reverse();

    return <ul style={wrapperStyle}>
      {list.map(i => ([getOneBit(data, i), i])).map(([b, nth]) =>
        <li style={style(b)} onClick={e => this.handleClick(nth)}>
          {b ? '1' : '0'}
        </li>
      )}
    </ul>;
  }
}

BitArray.defaultProps = {
  data: 0,
  size: 8,
  onToggle: () => {},
};
