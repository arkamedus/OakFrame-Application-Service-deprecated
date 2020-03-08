#!/usr/bin/env bash
tsc --p tsconfig.json
webpack
sass ./style/style.scss ./style/style.css
cp ./style/style.css ./dist/style.css
rm ./app.js
rm ./app.js.map
find ./view -type f -name '*.js' -delete
find ./view -type f -name '*.js.map' -delete
find ./controller -type f -name '*.js' -delete
find ./controller -type f -name '*.js.map' -delete
find ./style -type f -name '*.css' -delete
find ./style -type f -name '*.css.map' -delete