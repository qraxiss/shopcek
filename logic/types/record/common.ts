/**
 * This file was automatically generated by joi-to-typescript
 * Do not modify this file manually
 */

export interface base {
  body?: any;
  query?: any;
}

export interface record {
  hash: string;
  id: number;
  optInId: string;
  userId: string;
  wallet: string;
}

export interface recordNoRequire {
  hash?: string;
  id?: number;
  optInId?: string;
  userId?: string;
  wallet?: string;
}
