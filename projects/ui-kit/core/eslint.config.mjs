// @ts-check
import * as tseslint from 'typescript-eslint';
import rootConfig from '../../../eslint.config.mjs';

export default tseslint.config(
    ...rootConfig,
    {
        files: ['**/*.ts'],
        rules: {
            '@angular-eslint/directive-selector': [
                'error',
                {
                    type: 'attribute',
                    prefix: 'uk',
                    style: 'camelCase',
                },
            ],
            '@angular-eslint/component-selector': [
                'error',
                {
                    type: 'element',
                    prefix: 'uk',
                    style: 'kebab-case',
                },
            ],
            '@typescript-eslint/naming-convention': [
                'error',
                {
                    format: ['PascalCase'],
                    modifiers: ['exported'],
                    prefix: ['Uk'],
                    selector: 'class',
                },
                {
                    format: ['PascalCase'],
                    modifiers: ['exported', 'abstract'],
                    prefix: ['AbstractUk', 'Uk'],
                    selector: 'class',
                },
                {
                    format: ['PascalCase'],
                    modifiers: ['exported'],
                    prefix: ['uk'],
                    selector: 'function',
                },
                {
                    format: ['PascalCase'],
                    modifiers: ['exported'],
                    prefix: ['Uk'],
                    selector: 'interface',
                },
                // {
                //     format: ['PascalCase'],
                //     modifiers: ['exported'],
                //     prefix: ['Uk'],
                //     selector: 'typeAlias',
                // },
                {
                    format: null,
                    modifiers: ['destructured'],
                    selector: 'variable',
                },
                {
                    format: ['camelCase'],
                    selector: 'variable',
                },
                {
                    format: ['UPPER_CASE', 'camelCase', 'PascalCase'],
                    modifiers: ['global'],
                    selector: 'variable',
                },
                {
                    format: ['UPPER_CASE', 'camelCase', 'PascalCase'],
                    modifiers: ['exported'],
                    selector: 'variable',
                },
                {
                    format: ['UPPER_CASE', 'camelCase'],
                    modifiers: ['const'],
                    selector: 'variable',
                },
                {
                    format: ['PascalCase'],
                    modifiers: ['abstract'],
                    prefix: ['AbstractUk', 'Uk'],
                    selector: 'class',
                },
                {
                    format: ['StrictPascalCase'],
                    modifiers: ['exported'],
                    prefix: ['Uk'],
                    selector: 'enum',
                },
                {
                    format: ['UPPER_CASE', 'camelCase'],
                    selector: 'enumMember',
                },
                {
                    format: ['camelCase'],
                    selector: 'classMethod',
                },
                {
                    format: ['camelCase'],
                    selector: 'classProperty',
                },
                {
                    format: ['camelCase'],
                    selector: 'classProperty',
                    modifiers: ['private'],
                    leadingUnderscore: 'allow',
                },
                {
                    format: ['UPPER_CASE', 'camelCase'],
                    selector: 'classProperty',
                    modifiers: ['public', 'readonly'],
                },
            ],
        },
    },
    {
        files: ['**/*.html'],
        rules: {},
    },
    {
        files: ['**/*.spec.ts'],
        languageOptions: {
            globals: {
                describe: 'readonly',
                it: 'readonly',
                beforeEach: 'readonly',
                afterEach: 'readonly',
                expect: 'readonly',
                jasmine: 'readonly',
                spyOn: 'readonly',
                expectAsync: 'readonly',
            },
        },
    },
    {
        ignores: [
            'definitions/swagger/',
            // '**/*.spec.ts',
        ],
    },
);
