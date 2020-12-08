## Webpack, gulp, node setup for React applications

Gulp is responsible for compiling styles.

Webpack compiles react code.

### Webpack usage

To build valid js code from react code, create entries at `./src` and add them to webpack config **entries** list. The code built from the entry goes to `./public/<entry-name>/index.js`.
To include that code in the _views_ files, you have to add `<script>` with src set to `<entry-name>/index.js`.

Command used to build code:

```shell
    npm run build
```

Command used to build code on detected save:

```shell
    npm run build:watch
```

To run app in the local dev mode, make sure to include js within `/local-dev/index.html`

Command used to run webpack local sev server:

```shell
    npm run start:dev
```

### Gulp Usage

Style source files are located at `./style`.
The styles are compiled into `./public/style`.
To make use of these styles, simply include them with href equal to `/style/<file-name>`

Command used to compile styles on detected save:

```shell
    npm run gulp
```

Gulp will inject the compiled styles into the browser without the need to reload it.

###### It will only work if you use the url that gulp gives in the command line when it is launched.

### Ideal setup launch

Use 3 different cmds!

```shell
    node index.js
```

```shell
    npm run build:watch
```

```shell
    npm run gulp
```

And use the url that gulp gives.
