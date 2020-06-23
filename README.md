# Currency Converter

It's a little React app that manages currency convertion rates based on Uphold's API.

## Setup

The `.env.example` file should be copied into `.env` in order to work, although, it falls back
to default values and, since it is using the sandbox mode, it should work despite of its existance.
Nevertheless, to a more controlled execution, `CLIENT_ID` and `CLIENT_SECRET`, should be replaced with
proper values generated from the target Uphold application.

## Server Side

It's a simple micro service which proxies the request to the api while preserving
any secret information provided as environment variables.
In order to run independently, the command given is aliased in `package.json` as:

```bash
yarn run api
```

And its original form:

```bash
env $(cat .env) yarn run micro -l tcp://0.0.0.0:1337 api/src/index.js
```

Replacing the `0.0.0.0` and `1337` changes the hostname and port respectedly where the server runs.
No CORS are supported by design.


## Client Side

In order to test the application, the following command:

```bash
yarn start
```

Will launch both the client side app and the server side api in parallel processes.
The api requests are proxied from the default server port `1337` to the default app port `3000`.
If the server port is changed, the last value in `package.json` keyed by `proxy` should be changed as well.

The default browser should launch as soon as the application is build.


## Architecture

### Styling

All styles were written with the SASS pre-processor in order to have separation of concerns in terms of
what is common and what is particular, what is from the theme and what is from a given component.
BEM patterns are applied shallowly at the component level.

### Type safety

All code was written in JavaScript and the only type check validation is done via PropTypes.

### State management

State management is done in a two-fold, which may look redundant, but the objective was to mix in both
strategies in order to showcase its potential and synergies.
The entrypoint component `CurrencyConverter` is some sort of controller, or container component` since it
packs all the wiring and state manipulation across the whole app.
The service `CurrencyConverterService` exports a singleton-ish instance of the given service class and,
with help of `RxJS` deals with loading, caching, selecting, and calculating conversions, while keeping
internal state streams of the latest inputs and/or transformations.

### Components

All components should be pluggable anywhere since their dependency footprint is very small: other than the theme,
only the necessary props should be needed.

### Testing

WIP
