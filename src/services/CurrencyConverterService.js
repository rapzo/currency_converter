import UpholdSDK from '@uphold/uphold-sdk-javascript';
import { from, Observable, Subject } from 'rxjs';
import { shareReplay, takeUntil, map, switchMap } from 'rxjs/operators';
import { fromFetch } from 'rxjs/fetch';

const sdk = new UpholdSDK({
  baseUrl: 'http://api-sandbox.uphold.com',
  clientId: 'foo',
  clientSecret: 'bar'
});

class CurrencyCoverterService {

  cache$ = null;

  update$ = new Subject();

  get currencies$() {
    if (this.cache$ === null) {
      this.cache$ = this.getTicker();
    }

    return this.cache$.pipe(
      map(response => Array.from(
        new Set(
          response.map(({currency}) => currency)
        )
      )),
    );
  }

  getTicker(currency) {
    // return from(sdk.getTicker()).pipe(
    //   map(response => response)
    // )
    return fromFetch('/data.json').pipe(
      switchMap(response => response.json()),
      takeUntil(this.update$),
      shareReplay(1),
    );
  }

  hydrate() {
    this.update$.next();
    this.cache$ = null;
  }
}

export const currencyConverterService = new CurrencyCoverterService();