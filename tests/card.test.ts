import {expect,it} from 'vitest';
import {cardState} from '../src/features/card/utils/cardPayment';
it('approval requires the provider approved state',()=>{for(const value of [undefined,'pending','in_process','authorized','in_mediation','unknown','rejected'])expect(cardState(value)).not.toBe('approved');expect(cardState('approved')).toBe('approved');});
it('pending and analysis states keep the buyer waiting',()=>{for(const value of ['pending','in_process','authorized','in_mediation'])expect(cardState(value)).toBe('processing');});
it('terminal failures do not look like success',()=>{expect(cardState('rejected')).toBe('rejected');expect(cardState('cancelled')).toBe('cancelled');expect(cardState('refunded')).toBe('refunded');expect(cardState('charged_back')).toBe('refunded');expect(cardState('unexpected')).toBe('unknown');});
