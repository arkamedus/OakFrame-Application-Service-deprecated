#!/usr/bin/env bash

echo Compilation Starting. Removing legacy builds.
#if [ -d tmp/ ];then
    #rm -r tmp/
#fi

if [ -d release/ ];then
    rm -r release/
fi

echo Rebuilding Directories.
mkdir tmp/
mkdir release/

echo Compiling Typescript.
tsc --p tsconfig.json
#tsc --lib es6 --target es5 utils/**.ts

echo Compiling JavaScript.
#/client/
mkdir release/client/
cd tmp/client
webpack
cd ../../
java -jar node_modules/google-closure-compiler/compiler.jar --warning_level=VERBOSE --compilation_level ADVANCED_OPTIMIZATIONS --language_in ECMASCRIPT6 --language_out ECMASCRIPT5 --js_output_file=release/client/app.js utils/externs.js 'tmp/shared/interface/**.js' 'tmp/shared/model/**.js' 'tmp/client/dist/bundle.js'
cp client/index.html release/client/index.html


#/lambda/
#mkdir release/lambda/
#java -jar node_modules/google-closure-compiler/compiler.jar --warning_level=VERBOSE --compilation_level ADVANCED_OPTIMIZATIONS --language_in ECMASCRIPT6 --language_out ECMASCRIPT5 --js_output_file=release/lambda/app.js utils/externs.js 'tmp/interface/**.js' 'tmp/model/**.js' 'tmp/lambda/app.js'

echo Compilation Complete. Cleaning Up.
#if [ -d tmp/ ];then
#    rm -r tmp/
#fi

echo Compilation Complete. /release/