#!/bin/sh

rm -rf public coverage docs

npm run readme

npm run document

npm run coverage

mv coverage public/

mv img public/

exit 0

