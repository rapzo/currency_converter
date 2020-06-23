import { Subject, BehaviorSubject } from 'rxjs';
import {
  shareReplay,
  takeUntil,
  switchMap,
  tap,
  map,
  take,
} from 'rxjs/operators';
import { fromFetch } from 'rxjs/fetch';

class CurrencyCoverterService {

  /**
   * cached data just in case
   * @type {Array<TickerResponse>}
   */
  cache = [];

  /**
   * a stream of loaded status changes
   * @type {BehaviorSubject<Boolean>}
   */
  loaded$ = new BehaviorSubject(false);

  /**
   * the trigger to update the cache
   * @type {Subject<Boolean>}
   */
  update$ = new Subject().pipe(
    tap(() => {
      this.loaded$.next(false);
    })
  );

  /**
   * the cache stream, which is cached as well
   * @type {Observable<Array<TickerResponse>>}
   */
  cache$ = null;

  /**
   * keeping a stream of all selected currencies
   * @type {Subject<String>}
   */
  selectedCurrency$ = new BehaviorSubject('USD');

  /**
   * keeping a stream of all conversion inputs
   * @type {Subject<String>}
   */
  currencyInput$ = new Subject();

  /**
   * Currencies cached stream
   * @returns {<Observable<Array<String>>}
   */
  get currencies$() {
    if (this.cache$ === null) {
      this.cache$ = this.selectedCurrency$.pipe(
        take(1),
        switchMap(selectedCurrency => this.getTicker(selectedCurrency)),
      );
    }

    return this.cache$.pipe(
      map(() => {
        return this.currencies;
      }),
    );
  }

  /**
   * Currencies list acessor
   * @returns {Array<String>}
   */
  get currencies() {
    return Array.from(
      new Set(this.cache.map(({currency}) => currency)),
    );
  }

  convertCurrencies(from, value) {
    const data = new Set(this.cache.filter(item => item.currency !== from));

    return Array
      .from(data)
      .map(({currency, ask}) => ({
        from,
        currency,
        price: Number(ask * value).toFixed(2),
      }));
  }

  getTicker(currency = 'USD') {
    return fromFetch(`/api/ticker/${currency}`).pipe(
      switchMap(response => response.json()),
      tap(data => {
        this.cache = data;
        this.loaded$.next(true);
      }),
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