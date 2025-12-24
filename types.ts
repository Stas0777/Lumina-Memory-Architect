
export enum MemoryDataType {
  BYTE = 'Byte',
  TWO_BYTES = '2 Bytes',
  FOUR_BYTES = '4 Bytes',
  EIGHT_BYTES = '8 Bytes',
  FLOAT = 'Float',
  DOUBLE = 'Double',
  STRING = 'String'
}

export enum ScanType {
  EXACT_VALUE = 'Exact Value',
  BIGGER_THAN = 'Bigger than...',
  SMALLER_THAN = 'Smaller than...',
  VALUE_BETWEEN = 'Value between...',
  UNKNOWN_INITIAL_VALUE = 'Unknown initial value'
}

export interface MemoryAddress {
  address: string;
  value: string;
  previousValue: string;
  type: MemoryDataType;
}

export interface Process {
  pid: number;
  name: string;
  user: string;
  cpu: number;
  mem: number;
}

export interface SavedAddress extends MemoryAddress {
  active: boolean;
  description: string;
}
