#!/usr/bin/env bash
tsc --p tsconfig.json
webpack
sass ./style/style.scss ./style/style.css
cp ./style/style.css ./dist/style.css