import { Buffer } from 'buffer';
import assert from 'assert';
import BN from 'bn.js';
import { FieldData } from './ifaces';

/**
 * @param value
 */
export function padToEven(value: any): any {
  var a = value; // eslint-disable-line
  if (a.length % 2) {
    a = `0${a}`;
  }

  return a;
}

/**
 * @param str
 */
export function isHexPrefixed(str: string): boolean {
  return str.slice(0, 2) === '0x';
}

/**
 * @param str
 */
export function stripHexPrefix(str: string): string {
  if (typeof str !== 'string') {
    return str;
  }

  return isHexPrefixed(str) ? str.slice(2) : str;
}

/**
 * @param a
 */
export function stripZeros(a: any): any {
  a = stripHexPrefix(a);
  let first = a[0];
  while (a.length > 0 && first.toString() === '0') {
    a = a.slice(1);
    first = a[0];
  }
  return a;
}

/**
 * @param value
 */
export function isHexString(value: any): boolean {
  if (typeof value !== 'string' || !value.match(/^0x[0-9A-Fa-f]*$/)) {
    return false;
  }
  return true;
}

/**
 * @param i
 */
export function intToHex(i: any): string {
  var hex = i.toString(16); // eslint-disable-line
  return '0x' + hex;
}

/**
 * @param i
 */
export function intToBuffer(i: any): Buffer {
  const hex = intToHex(i);
  return new Buffer(padToEven(hex.slice(2)), 'hex');
}

/**
 * @param v
 */
export function toBuffer(v: any): Buffer {
  if (!Buffer.isBuffer(v)) {
    if (typeof v === 'string') {
      if (isHexString(v)) {
        v = Buffer.from(padToEven(stripHexPrefix(v)), 'hex');
      } else {
        v = Buffer.from(v);
      }
    } else if (typeof v === 'number') {
      v = intToBuffer(v);
    } else if (BN.isBN(v)) {
      v = v.toArrayLike(Buffer);
    } else {
      throw new Error('invalid type');
    }
  }
  return v;
}

/**
 * @param buf
 */
export function bufferToInt(buf: Buffer): number {
  return new BN(toBuffer(buf)).toNumber();
}

/**
 * @param v
 * @param field
 */
export function getFieldValue(v: any, field: FieldData): Buffer {
  v = toBuffer(v);

  if (v.toString('hex') === '00' && !field.allowZero) {
    v = Buffer.allocUnsafe(0);
  }

  if (field.allowLess && field.length) {
    v = stripZeros(v);
    assert(field.length >= v.length, 'The field ' + field.name + ' must not have more ' + field.length + ' bytes');
  } else if (!(field.allowZero && v.length === 0) && field.length) {
    assert(field.length === v.length, 'The field ' + field.name + ' must have byte length of ' + field.length);
  }
  return v;
}
