/**
 * This file was automatically generated by joi-to-typescript
 * Do not modify this file manually
 */

export interface createRecord {
  body: {
    hash: string;
    id: number;
    optInId: string;
    userId: string;
    wallet: string;
  };
  query?: any;
}

export interface deleteRecord {
  body?: any;
  query: {
    hash?: string;
    id?: number;
    optInId?: string;
    userId?: string;
    wallet?: string;
  };
}

export interface getRecord {
  body?: any;
  query: {
    hash?: string;
    id?: number;
    optInId?: string;
    userId?: string;
    wallet?: string;
  };
}

export interface getRecords {
  body?: any;
  query: {
    hash?: string;
    id?: number;
    optInId?: string;
    userId?: string;
    wallet?: string;
  };
}

export interface updateRecord {
  body: {
    hash?: string;
    id?: number;
    optInId?: string;
    userId?: string;
    wallet?: string;
  };
  query: {
    hash?: string;
    id?: number;
    optInId?: string;
    userId?: string;
    wallet?: string;
  };
}
