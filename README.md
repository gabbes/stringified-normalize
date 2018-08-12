# stringified-normalize

> Stringified normalize.css for CSS-in-JS libraries

[Necolas](https://github.com/necolas) excellent [normalize.css](https://github.com/necolas/normalize.css) parsed into a JavaScript template literal, ready to be used by modern CSS-in-JS libraries such as [styled-components](https://github.com/styled-components/styled-components) or [emotion](https://github.com/emotion-js/emotion).

## Install

```sh
npm install --save stringified-normalize
```

## Usage

Example uses [styled-components](https://github.com/styled-components/styled-components), but works the same with other libraries, such as [emotion](https://github.com/emotion-js/emotion). Simply replace the `import` statement appropriately.

```js
import normalize from 'stringified-normalize';
import { injectGlobal } from 'styled-components';

injectGlobal`
  ${normalize}

  body {
    font-family: sans-serif;
  }
`;
```

## Development

The update script will automatically download the latest published `normalize.css` and parse it, compare to the current version and generate an updated version if any changes are detected.

Simply run `npm start` to check for updates.

```sh
git clone https://github.com/gabbes/stringified-normalize
cd stringified-normalize

npm start
```

## License

[MIT](LICENSE)
