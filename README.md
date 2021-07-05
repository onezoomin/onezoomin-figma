# preact-figma boilerplate
Quick and dirty html and preact based ui in a figma plugin modal.

Forked from a basic template to start working with [react-figma](https://www.npmjs.com/package/react-figma) package

Original template included:
- Basic file structure
- TypeScript configuration
- Webpack configuration
- using react-figma to manipulate the document page with no actual UI

Adapted to:
- resemble the default figma ui plugin functionality 
- use [preact](https://preactjs.com/) (without compat)
- use ts with linting and VS code auto fix config


## Quick start
- clone repository from GitHub
    ````
    git clone https://github.com/onezoomin/preact-figma-boilerplate.git <your project name>
    ````

- install node modules either with `Yarn` or `npm`

    Yarn:
    ````
    cd <your project name>
    yarn 
    ````
    
    npm:
    ````
    cd <your project name>
    npm install
    ````

- run

    Yarn:
    ````
    yarn webpack:watch 
    ````
    
    npm:
    ````
    cd <your project name>
    npm run webpack:watch
    ````

- in Figma

    add new Plugin via the manifest.json in the repo root