import { RefillForm } from '@refill/intefaces';

export namespace Refill {
  export class Refill {
    static readonly type = '[Refill API] Refill';
    constructor(public readonly refillForm: RefillForm) {}
  }

  export class Clear {
    static readonly type = '[Refill] Clear';
  }
}
