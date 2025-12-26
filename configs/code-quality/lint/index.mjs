// @ts-check

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectTsconfig = path.resolve(__dirname, "../../../tsconfig.json");
const normalizedRootDirectory = path.resolve(__dirname, "../../..");

import eslint from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import * as tsEslint from "typescript-eslint";
import * as angular from "angular-eslint";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import unusedImports from "eslint-plugin-unused-imports";
import jasmine from "eslint-plugin-jasmine";
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import decoratorPosition from "eslint-plugin-decorator-position";
import functional from "functional";
import * as importPlugin from "eslint-plugin-import";
import rxjs from "@smarttools/eslint-plugin-rxjs";
import unicorn from "eslint-plugin-unicorn";
// import jest from "eslint-plugin-jest";
import ngrx from "@ngrx/eslint-plugin/v9";
import customRules from "./custom-rules/custom-rules.bundle.mjs";
import cypressPlugin from "eslint-plugin-cypress";
import playwright from "eslint-plugin-playwright";
import path from "node:path";
import { fileURLToPath } from "node:url";

export default tsEslint.config(
  {
    files: ["**/*.ts"],
    ignores: ["**/.swagger/**"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
        ecmaFeatures: {},
        tsconfigRootDir: normalizedRootDirectory,
        project: [projectTsconfig],
        // [ADB] added new in baman!!!
        // projectService: true,
      },
      globals: {
        window: "readonly",
        document: "readonly",
        navigator: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
        setInterval: "readonly",
        clearInterval: "readonly",
        console: "readonly",
        localStorage: "readonly",
        sessionStorage: "readonly",
        fetch: "readonly",
        alert: "readonly",
        confirm: "readonly",
        prompt: "readonly",
        XMLHttpRequest: "readonly",
        Event: "readonly",
        CustomEvent: "readonly",
        history: "readonly",
        location: "readonly",
        MutationObserver: "readonly",
        requestAnimationFrame: "readonly",
        cancelAnimationFrame: "readonly",
      },
    },
    extends: [
      ...tsEslint.configs.recommended,
      ...tsEslint.configs.stylistic,
      ...angular.configs.tsRecommended,
      ...ngrx.configs.all,
      eslint.configs.recommended,
      prettierConfig,
    ],
    plugins: {
      // @ts-ignore
      "@stylistic": stylistic,
      //
      "simple-import-sort": simpleImportSort,
      "unused-imports": unusedImports,
      importPlugin: importPlugin,
      //
      jasmine: jasmine,
      prettier: prettier,
      customRules: customRules,
      decoratorPosition: decoratorPosition,
      // @ts-ignore
      functional: functional,
      rxjs,
      unicorn,
      ngrx,
    },
    processor: angular.processInlineTemplates,
    rules: {
      // ********************************** import
      // ❌ Disable duplicate rule (prefer importPlugin/no-duplicates)
      "no-duplicate-imports": "off",

      // ✅ Sort named imports alphabetically within each statement
      "sort-imports": [
        "error",
        {
          ignoreDeclarationSort: true, // avoids conflict with simple-import-sort
          memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
          ignoreMemberSort: false,
          ignoreCase: true,
        },
      ],

      "@ngrx/prefix-selectors-with-select": "off",

      // ❌ Disable eslint-plugin-import's sort; conflicts with simple-import-sort
      "import/order": "off",

      // ✅ Enforce clean, sorted import blocks (handles grouping and order)
      "simple-import-sort/imports": "error",

      // ✅ Enforce sorted and grouped exports
      "simple-import-sort/exports": "error",

      // ✅ Enforce imports at the top
      "importPlugin/first": "error",

      // ✅ Require newline after all imports
      "importPlugin/newline-after-import": ["error", { count: 1 }],

      // ✅ Prevent circular dependencies
      "importPlugin/no-cycle": "error",

      // ✅ Disallow deprecated imports
      "importPlugin/no-deprecated": "error",

      // ✅ Disallow duplicate imports across files
      "importPlugin/no-duplicates": "error",

      // ✅ Disallow webpack loader syntax in imports
      "importPlugin/no-webpack-loader-syntax": "error",

      // ✅ Use `import type` for type-only imports
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          disallowTypeAnnotations: false,
          fixStyle: "separate-type-imports",
          prefer: "type-imports",
        },
      ],

      // ✅ Restrict problematic imports
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["rxjs/operators"],
              message:
                "Don't use 'rxjs/operators'; use pipeable imports from 'rxjs' instead.",
            },
            {
              group: ["@angular/**"],
              importNames: ["Inject"],
              message: "Please use `inject(Type)` function instead.",
            },
          ],
        },
      ],

      // ✅ Prevent deep internal imports
      "customRules/no-deep-imports": [
        "error",
        {
          currentProject: "(?<=projects/)([-\\w]+)",
          ignoreImports: ["\\?raw"],
        },
      ],

      // ✅ Remove unused imports
      "unused-imports/no-unused-imports": "error",

      // ✅ Warn about unused variables unless prefixed with `_`
      "unused-imports/no-unused-vars": [
        "error",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
      // ********************************** end

      // @angular-eslint
      "@angular-eslint/sort-lifecycle-methods": "error",

      // Prettier rules
      "prettier/prettier": [
        "error",
        {
          endOfLine: "auto",
          bracketSpacing: false,
        },
      ],
      // @typescript-eslint
      "@typescript-eslint/array-type": [
        "error",
        { default: "array-simple", readonly: "array-simple" },
      ],
      "@typescript-eslint/ban-ts-comment": "error",
      "@typescript-eslint/consistent-generic-constructors": "error",
      "@typescript-eslint/consistent-indexed-object-style": "error",
      "@typescript-eslint/consistent-type-assertions": [
        "error",
        {
          assertionStyle: "as",
          objectLiteralTypeAssertions: "allow-as-parameter",
        },
      ],
      "@typescript-eslint/consistent-type-definitions": "error",
      "@typescript-eslint/explicit-function-return-type": [
        "error",
        {
          allowConciseArrowFunctionExpressionsStartingWithVoid: true,
          allowDirectConstAssertionInArrowFunctions: true,
          allowExpressions: true,
          allowHigherOrderFunctions: true,
          allowTypedFunctionExpressions: true,
        },
      ],
      "@typescript-eslint/explicit-member-accessibility": [
        "error",
        {
          accessibility: "explicit",
          overrides: {
            accessors: "explicit",
            constructors: "no-public",
            methods: "explicit",
            parameterProperties: "explicit",
            properties: "explicit",
          },
        },
      ],
      "@typescript-eslint/member-ordering": [
        "error",
        {
          default: [
            "signature",
            "readonly-signature",
            "public-static-field",
            "protected-static-field",
            "#private-static-field",
            "private-static-field",
            "public-abstract-field",
            "protected-abstract-field",
            "private-decorated-field",
            "private-instance-field",
            "#private-instance-field",
            "public-decorated-field",
            "public-instance-field",
            "protected-decorated-field",
            "protected-instance-field",
            "public-constructor",
            "protected-constructor",
            "private-constructor",
            "public-static-method",
            "protected-static-method",
            "private-static-method",
            "#private-static-method",
            "public-abstract-get",
            "public-abstract-set",
            "protected-abstract-get",
            "protected-abstract-set",
            "public-abstract-method",
            "protected-abstract-method",
            ["public-decorated-set", "public-get"],
            ["public-decorated-set", "public-decorated-get"],
            ["public-set", "public-get"],
            "public-decorated-method",
            "public-instance-method",
            ["protected-decorated-set", "protected-decorated-get"],
            ["protected-set", "protected-get"],
            "protected-decorated-method",
            "protected-instance-method",
            ["private-decorated-set", "private-decorated-get"],
            ["private-set", "private-get"],
            "private-decorated-method",
            "private-instance-method",
            "#private-instance-method",
          ],
        },
      ],
      "@typescript-eslint/naming-convention": [
        "error",
        {
          format: ["PascalCase", "UPPER_CASE", "camelCase"],
          selector: "typeLike",
        },
        {
          format: null,
          modifiers: ["destructured"],
          selector: "variable",
        },
        {
          format: ["camelCase"],
          selector: "variable",
        },
        {
          format: ["UPPER_CASE", "camelCase", "PascalCase"],
          modifiers: ["global"],
          selector: "variable",
        },
        {
          format: ["UPPER_CASE", "camelCase", "PascalCase"],
          modifiers: ["exported"],
          selector: "variable",
        },
        {
          format: ["UPPER_CASE", "camelCase"],
          modifiers: ["const"],
          selector: "variable",
        },
        {
          format: ["UPPER_CASE", "camelCase"],
          selector: "enumMember",
        },
        {
          format: ["camelCase"],
          selector: "classMethod",
        },
        {
          format: ["camelCase"],
          selector: "classProperty",
        },
        {
          format: ["camelCase"],
          selector: "classProperty",
          modifiers: ["private"],
          leadingUnderscore: "allow",
        },
        {
          format: ["UPPER_CASE", "camelCase"],
          selector: "classProperty",
          modifiers: ["public", "readonly"],
        },
      ],
      "@typescript-eslint/no-confusing-non-null-assertion": "error",
      "@typescript-eslint/no-duplicate-enum-values": "error",
      "@typescript-eslint/no-duplicate-type-constituents": "error",
      "@typescript-eslint/no-empty-function": [
        "error",
        {
          allow: [
            "methods",
            "arrowFunctions",
            "private-constructors",
            "protected-constructors",
            "overrideMethods",
            "decoratedFunctions",
          ],
        },
      ],
      "@typescript-eslint/no-extra-non-null-assertion": "error",
      "@typescript-eslint/no-extraneous-class": [
        "error",
        {
          allowConstructorOnly: true,
          allowEmpty: false,
          allowStaticOnly: true,
          allowWithDecorator: true,
        },
      ],
      "@typescript-eslint/no-floating-promises": [
        "error",
        { ignoreIIFE: true, ignoreVoid: true },
      ],
      "@typescript-eslint/no-for-in-array": "error",
      "@typescript-eslint/no-implied-eval": "error",
      "@typescript-eslint/no-inferrable-types": "error",
      "@typescript-eslint/no-namespace": ["error", { allowDeclarations: true }],
      "@typescript-eslint/no-non-null-asserted-optional-chain": "error",
      "@typescript-eslint/no-shadow": "error",
      "@typescript-eslint/no-unnecessary-boolean-literal-compare": "error",
      "@typescript-eslint/no-unnecessary-qualifier": "error",
      "@typescript-eslint/no-unnecessary-type-arguments": "error",
      "@typescript-eslint/no-unnecessary-type-assertion": "error",
      "@typescript-eslint/no-unnecessary-type-constraint": "error",
      "@typescript-eslint/no-unsafe-declaration-merging": "error",
      "@typescript-eslint/no-unused-expressions": [
        "error",
        {
          allowShortCircuit: true,
          allowTernary: true,
        },
      ],
      "@typescript-eslint/no-use-before-define": [
        "error",
        {
          allowNamedExports: false,
          classes: false,
          enums: true,
          functions: false,
          ignoreTypeReferences: true,
          typedefs: true,
          variables: true,
        },
      ],
      "@typescript-eslint/no-useless-constructor": "error",
      "@typescript-eslint/no-var-requires": "error",
      "@typescript-eslint/prefer-as-const": "error",
      "@typescript-eslint/prefer-find": "error",
      "@typescript-eslint/prefer-for-of": "error",
      "@typescript-eslint/prefer-includes": "error",
      "@typescript-eslint/prefer-nullish-coalescing": "error",
      "@typescript-eslint/prefer-optional-chain": "error",
      "@typescript-eslint/prefer-readonly": ["error"],
      "@typescript-eslint/prefer-string-starts-ends-with": "error",
      "@typescript-eslint/promise-function-async": [
        "error",
        {
          allowedPromiseNames: ["Thenable"],
          checkArrowFunctions: true,
          checkFunctionDeclarations: true,
          checkFunctionExpressions: true,
          checkMethodDeclarations: true,
        },
      ],
      "@typescript-eslint/require-array-sort-compare": "error",
      "@typescript-eslint/require-await": "error",
      "@typescript-eslint/restrict-plus-operands": "error",
      "@typescript-eslint/sort-type-constituents": "error",
      "@typescript-eslint/switch-exhaustiveness-check": "error",
      "@typescript-eslint/triple-slash-reference": [
        "error",
        {
          lib: "always",
          path: "always",
          types: "always",
        },
      ],
      "decoratorPosition/decorator-position": [
        "error",
        {
          methods: "above",
          printWidth: 120,
          properties: "above",
        },
      ],
      eqeqeq: ["error", "always"],
      "func-style": [
        "error",
        "declaration",
        {
          allowArrowFunctions: true,
        },
      ],
      "functional/functional-parameters": "off",
      "functional/immutable-data": "off",
      "functional/no-classes": "off",
      "functional/no-conditional-statements": "off",
      "functional/no-expression-statements": "off",
      "functional/no-let": "off",
      "functional/no-loop-statements": "off",
      "functional/no-mixed-types": "off",
      "functional/no-promise-reject": "off",
      "functional/no-return-void": "off",
      "functional/no-this-expressions": "off",
      "functional/no-throw-statements": "off",
      "functional/no-try-statements": "off",
      "functional/prefer-immutable-types": "off",
      "functional/prefer-property-signatures": "off",
      "guard-for-in": "error",
      "lines-around-comment": [
        "error",
        {
          afterBlockComment: false,
          afterLineComment: false,
          allowArrayEnd: true,
          allowArrayStart: true,
          allowBlockEnd: true,
          allowBlockStart: true,
          allowClassEnd: true,
          allowClassStart: true,
          allowObjectEnd: true,
          allowObjectStart: true,
          applyDefaultIgnorePatterns: true,
          beforeBlockComment: false,
          beforeLineComment: false,
        },
      ],
      "max-classes-per-file": ["error", 3],
      "max-depth": "error",
      "max-nested-callbacks": ["error", 4],
      "no-bitwise": "error",
      "no-case-declarations": "error",
      "no-console": ["error", { allow: ["info", "assert", "warn", "error"] }],
      "no-empty": ["error", { allowEmptyCatch: true }],
      "no-implicit-coercion": ["error", { allow: ["!!"] }],
      "no-irregular-whitespace": "error",
      "no-loop-func": "error",
      "no-restricted-syntax": [
        "error",
        {
          message:
            "Use `map(() => value)` instead of `mapTo(value)`, the operator is deprecated",
          selector: "CallExpression[callee.name='mapTo']",
        },
        {
          message: "Use `FALSE_HANDLER` please instead of `() => false`",
          selector:
            "ArrowFunctionExpression[params.length=0][body.raw='false'][body.value='false']",
        },
        {
          message: "Use `TRUE_HANDLER` please instead of `() => true`",
          selector:
            "ArrowFunctionExpression[params.length=0][body.raw='true'][body.value='true']",
        },
        {
          message:
            "Use `switchMap(() => stream$)` instead of `switchMapTo(stream$)`, the operator is deprecated",
          selector: "CallExpression[callee.name='switchMapTo']",
        },
        {
          message:
            "Use `mergeMap` instead of `flatMap`, the operator is deprecated",
          selector: "CallExpression[callee.name='flatMap']",
        },
        {
          message:
            "Use `map(x => x?.foo?.bar)` instead of `pluck('foo', 'bar')`",
          selector: "CallExpression[callee.name='pluck']",
        },
        {
          message:
            "Provide initial value to .reduce() method. Possible runtime error: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Reduce_of_empty_array_with_no_initial_value",
          selector:
            "CallExpression[arguments.length=1] > MemberExpression.callee > Identifier.property[name='reduce']",
        },
        {
          message: "Please use `inject(Type)` function instead.",
          selector: "Decorator[expression.callee.name='Inject']",
        },
        {
          message:
            "Please use `inject(Type, { self: true })` function instead.",
          selector: "Decorator[expression.callee.name='Self']",
        },
        {
          message:
            "Please use `inject(Type, { skipSelf: true })` function instead.",
          selector: "Decorator[expression.callee.name='SkipSelf']",
        },
        {
          message:
            "Please use `inject(Type, { optional: true })` function instead.",
          selector: "Decorator[expression.callee.name='Optional']",
        },
        {
          message:
            "Please use `inject(Type, { host: true })` function instead.",
          selector: "Decorator[expression.callee.name='Host']",
        },
        {
          message: "Please use `inject(INJECTOR)` instead",
          selector:
            "CallExpression[callee.name='inject'][arguments.0.name='Injector']",
        },
      ],
      "no-return-assign": ["error", "always"],
      "no-useless-concat": "error",
      "no-useless-escape": "error",
      "no-useless-rename": [
        "error",
        {
          ignoreDestructuring: true,
          ignoreExport: false,
          ignoreImport: false,
        },
      ],
      "no-var": "error",
      "no-void": ["error", { allowAsStatement: true }],
      "prefer-template": "error",
      "rxjs/no-compat": "error",
      "rxjs/no-connectable": "error",
      "rxjs/no-cyclic-action": "error",
      "rxjs/no-ignored-observable": "error",
      "rxjs/no-topromise": "error",
      "rxjs/no-unsafe-catch": "error",
      "rxjs/no-unsafe-first": "error",
      "rxjs/no-unsafe-switchmap": "error",
      "rxjs/no-unsafe-takeuntil": [
        "error",
        {
          alias: ["takeUntilDestroyed"],
        },
      ],
      "rxjs/throw-error": "error",
      "spaced-comment": [
        "error",
        "always",
        {
          markers: ["/"],
        },
      ],
      "unicorn/escape-case": "error",
      "unicorn/filename-case": [
        "error",
        {
          case: "kebabCase",
        },
      ],
      "unicorn/new-for-builtins": "error",
      "unicorn/no-array-push-push": "error",
      "unicorn/no-empty-file": "error",
      "unicorn/no-useless-spread": "error",
      "unicorn/prefer-logical-operator-over-ternary": "error",
      "unicorn/prefer-string-replace-all": "error",
      "unicorn/prefer-string-slice": "error",
      "unicorn/require-number-to-fixed-digits-argument": "error",
      "vars-on-top": "error",

      "@typescript-eslint/no-unused-vars": "off",
      "no-unused-vars": "off",
      "jasmine/no-focused-tests": "error",
      "jasmine/no-disabled-tests": "warn",
      "jasmine/no-spec-dupes": ["error", "branch"],

      "@stylistic/object-curly-spacing": [
        "error",
        "never",
        {
          arraysInObjects: true,
          objectsInObjects: true,
        },
      ],
      // "@stylistic/func-call-spacing": ['error', 'never'],
      "@stylistic/member-delimiter-style": "error",
      "@stylistic/type-annotation-spacing": "error",
      "@stylistic/lines-between-class-members": [
        "error",
        "always",
        { exceptAfterOverload: true, exceptAfterSingleLine: true },
      ],
      "@stylistic/padding-line-between-statements": [
        "error",
        { blankLine: "always", next: "block", prev: "*" },
        { blankLine: "always", next: "*", prev: "block" },
        { blankLine: "always", next: "block-like", prev: "*" },
        { blankLine: "always", next: "*", prev: "block-like" },
        { blankLine: "always", next: "return", prev: "*" },
        { blankLine: "always", next: "*", prev: "directive" },
        { blankLine: "always", next: ["interface", "type"], prev: "*" },
        { blankLine: "always", next: "*", prev: ["const", "let", "var"] },
        { blankLine: "always", next: "class", prev: "*" },
        { blankLine: "always", next: "*", prev: "class" },
        {
          blankLine: "any",
          next: ["const", "let", "var", "export"],
          prev: ["const", "let", "var", "export"],
        },
        { blankLine: "any", next: ["case", "default"], prev: "*" },
        { blankLine: "any", next: "*", prev: ["case", "default"] },
        { blankLine: "any", next: "directive", prev: "directive" },
      ],
      "@stylistic/quotes": [
        "error",
        "single",
        {
          avoidEscape: true,
        },
      ],

      "customRules/decorator-key-sort": [
        "error",
        {
          Component: [
            "moduleId",
            "standalone",
            "signal",
            "selector",
            "imports",
            "template",
            "templateUrl",
            "styleUrls",
            "styleUrl",
            "styles",
            "encapsulation",
            "changeDetection",
            "providers",
            "viewProviders",
            "animations",
            "entryComponents",
            "preserveWhitespaces",
            "interpolation",
          ],
          Directive: [
            "standalone",
            "selector",
            "inputs",
            "outputs",
            "providers",
            "exportAs",
            "queries",
            "host",
            "jit",
          ],
          Injectable: ["providedIn"],
          NgModule: [
            "id",
            "jit",
            "imports",
            "declarations",
            "providers",
            "exports",
            "entryComponents",
            "bootstrap",
            "schemas",
          ],
          Pipe: ["name", "pure"],
        },
      ],
      "customRules/injection-token-description": "error",
      "customRules/no-private-esnext-fields": "error",
      "customRules/no-simple-for-of": "error",
      "customRules/strict-doc-example": "error",
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {
      "@angular-eslint/template/banana-in-box": "error",
      "@angular-eslint/template/no-distracting-elements": "error",
      "@angular-eslint/template/no-duplicate-attributes": "error",
      "@angular-eslint/template/prefer-self-closing-tags": "error",
      "@angular-eslint/template/table-scope": "error",

      "@angular-eslint/template/no-negated-async": "warn",
      "@angular-eslint/template/no-positive-tabindex": "warn",
      "@angular-eslint/template/conditional-complexity": [
        "warn",
        { maxComplexity: 4 },
      ],
      "@angular-eslint/template/use-track-by-function": "warn",
    },
  },
  {
    files: [
      "**/*.component.ts",
      "**/*.service.ts",
      "**/*.directive.ts",
      "**/*.pipe.ts",
      "**/*.module.ts",
    ],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: {},
        tsconfigRootDir: normalizedRootDirectory,
        project: [projectTsconfig],
      },
      globals: {
        console: true,
      },
    },
    rules: {
      "@angular-eslint/component-class-suffix": "error",
      "@angular-eslint/contextual-decorator": "error",
      "@angular-eslint/contextual-lifecycle": "error",
      "@angular-eslint/directive-class-suffix": "error",
      "@angular-eslint/directive-selector": "error",
      "@angular-eslint/no-attribute-decorator": "error",
      "@angular-eslint/no-conflicting-lifecycle": "error",
      "@angular-eslint/no-empty-lifecycle-method": "error",
      "@angular-eslint/no-input-prefix": "error",
      "@angular-eslint/no-lifecycle-call": "error",
      "@angular-eslint/no-output-on-prefix": "error",
      "@angular-eslint/no-queries-metadata-property": "error",
      "@angular-eslint/prefer-on-push-component-change-detection": "error",
      "@angular-eslint/prefer-output-readonly": "error",
      "@angular-eslint/relative-url-prefix": "error",
      "@angular-eslint/use-lifecycle-interface": "error",
      "@angular-eslint/use-pipe-transform-interface": "error",
    },
  },
  {
    files: [
      "**/*.spec.*",
      "**/*.cy.*",
      "**/*.test.*",
      "**/*.unit.*",
      "**/*/__tests__/*",
      "**/*.fixture.ts",
    ],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: {},
        tsconfigRootDir: normalizedRootDirectory,
        project: [projectTsconfig],
      },
      globals: {
        console: true,
      },
    },
    rules: {
      "customRules/no-deep-imports": "off",
      "@typescript-eslint/no-extraneous-class": "off",
      "@typescript-eslint/no-shadow": "off",
      "import/extensions": "off",
      "import/no-unresolved": "off",
      "max-classes-per-file": "off",
      "max-nested-callbacks": ["error", 10],
      "prefer-promise-reject-errors": "error",
      "rxjs/no-topromise": "off",
    },
  },
  {
    files: ["**/*.cy.ts"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: {},
        tsconfigRootDir: normalizedRootDirectory,
        project: [projectTsconfig],
      },
      globals: {
        console: true,
      },
    },
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint", "cypress"],
    rules: {
      ...cypressPlugin.configs.recommended.rules,
    },
  },
  {
    files: ["**/*.spec.ts"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: {},
        tsconfigRootDir: normalizedRootDirectory,
        project: [projectTsconfig],
        // projectService: true,
      },
      globals: {
        console: true,
      },
    },
    plugins: {
      // jest,
    },
    rules: {
      // // ********************************** import
      // "jest/prefer-importing-jest-globals": "off",
      // // ********************************** end
      // "jest/expect-expect": "off",
      // "jest/max-expects": "off",
      // "jest/max-nested-describe": "off",
      // "jest/no-conditional-in-test": "off",
      // "jest/no-deprecated-functions": "off",
      // "jest/no-disabled-tests": "off",
      // "jest/no-done-callback": "off",
      // "jest/no-hooks": "off",
      // "jest/no-test-prefixes": "off",
      // "jest/prefer-called-with": "off",
      // "jest/prefer-each": "off",
      // "jest/prefer-expect-assertions": "off",
      // "jest/prefer-expect-resolves": "off",
      // "jest/prefer-hooks-on-top": "off",
      // "jest/prefer-lowercase-title": "off",
      // "jest/prefer-strict-equal": "off",
      // "jest/prefer-to-be-null": "off",
      // "jest/prefer-to-have-length": "off",
      // "jest/require-hook": "off",
      // "jest/require-to-throw-message": "off",
      // "jest/no-jasmine-globals": "off",
      // "jest/require-top-level-describe": [
      //   "error",
      //   {
      //     maxNumberOfTopLevelDescribes: 1,
      //   },
      // ],
      // "jest/unbound-method": "off",
    },
  },
  {
    files: ["**/*playwright*/*.spec.ts"],
    parser: "@typescript-eslint/parser",
    // extends: ['plugin:playwright/recommended'],
    plugins: {
      playwright,
    },
    rules: {
      ...playwright.configs.recommended.rules, // important!
    },
  },
  {
    files: ["*"],
    rules: {
      // ********************************** import
      "no-duplicate-imports": "off",
      "import/exports-last": "off",
      "import/extensions": "off",
      "import/no-default-export": "off",
      "import/no-dynamic-require": "off",
      "import/no-extraneous-dependencies": "off",
      "import/no-relative-packages": "off",
      "import/no-unresolved": "off",
      "import/prefer-default-export": "off",
      // ********************************** end
      "@angular-eslint/component-max-inline-declarations": "off",
      "@angular-eslint/component-selector": "off",
      "@angular-eslint/no-forward-ref": "off",
      "@angular-eslint/no-host-metadata-property": "off",
      "@angular-eslint/no-input-rename": "off",
      "@angular-eslint/no-inputs-metadata-property": "off",
      "@angular-eslint/no-output-native": "off",
      "@angular-eslint/no-output-rename": "off",
      "@angular-eslint/no-outputs-metadata-property": "off",
      "@angular-eslint/no-pipe-impure": "off",
      "@angular-eslint/sort-ngmodule-metadata-arrays": "off",
      "@angular-eslint/use-component-selector": "off",
      "@angular-eslint/use-component-view-encapsulation": "off",
      "@angular-eslint/use-injectable-provided-in": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-base-to-string": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-shadow": "off",
      "@typescript-eslint/no-unnecessary-condition": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/no-var-requires": "off",
      "@typescript-eslint/prefer-nullish-coalescing": "off",
      "@typescript-eslint/prefer-readonly-parameter-types": "off",
      "@typescript-eslint/strict-boolean-expressions": "off",
      camelcase: "off",
      "class-methods-use-this": "off",
      complexity: "off",
      "consistent-return": "off",
      "default-case": "off",
      "default-case-last": "off",
      "default-param-last": "off",
      "dot-notation": "off",
      "eslint-comments/disable-enable-pair": "off",
      "eslint-comments/no-unlimited-disable": "off",
      "func-name-matching": "off",
      "func-names": "off",
      "global-require": "off",
      "grouped-accessor-pairs": "off",
      "lines-between-class-members": "off",
      "max-params": "off",
      "max-statements": "off",
      "no-await-in-loop": "off",
      "no-bitwise": "off",
      "no-constructor-return": "off",
      "no-continue": "off",
      "no-dupe-class-members": "off",
      "no-empty-function": "off",
      "no-param-reassign": "off",
      "no-plusplus": "off",
      "no-prototype-builtins": "off",
      "no-redeclare": "off",
      "no-shadow": "off",
      "no-undef": "off",
      "no-underscore-dangle": "off",
      "no-unused-expressions": "off",
      "no-use-before-define": "off",
      "no-useless-constructor": "off",
      "padding-line-between-statements": "off",
      "prefer-destructuring": "off",
      "promise/always-return": "off",
      "promise/catch-or-return": "off",
      "promise/no-callback-in-promise": "off",
      "promise/no-nesting": "off",
      quotes: "off",
      "require-await": "off",
      "rxjs/no-ignored-takewhile-value": "off",
      "sonar/deprecation": "off",
      "sonar/function-name": "off",
      "sonar/max-union-size": "off",
      "sonarjs/cognitive-complexity": "off",
      "sonarjs/max-switch-cases": "off",
      "sonarjs/no-duplicate-string": "off",
      "sonarjs/no-nested-template-literals": "off",
    },
  },
);
