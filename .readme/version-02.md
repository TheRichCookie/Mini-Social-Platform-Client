# lint setup

npm install --save-dev stylelint stylelint-order stylelint-no-px stylelint-config-standard npm install --save-dev eslint
angular-eslint

config your eslint and .stylelintrc.json also set this in your package.json : "lint:styles": "stylelint
\"apps/\*_/_.scss\" --fix"

# Husky

add install.js file

add this to package.json scripts: "prepare": "node .husky/install.js"
