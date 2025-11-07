// const decoratorKeySort = require('./decorator-key-sort');
// const injectionTokenDescription = require('./injection-token-description');
// const noDeepImports = require('./no-deep-imports');
// const noImplicitPublic = require('./no-implicit-public');
// const noPrivateEsnextFields = require('./no-private-esnext-fields');
// const noSimpleForOf = require('./no-simple-for-of');
// const strictDocExample = require('./strict-doc-example');
// const plugin = {
//     rules: {
//         'decorator-key-sort': decoratorKeySort,
//         'injection-token-description': injectionTokenDescription,
//         'no-deep-imports': noDeepImports,
//         'no-implicit-public': noImplicitPublic,
//         'no-private-esnext-fields': noPrivateEsnextFields,
//         'no-simple-for-of': noSimpleForOf,
//         'strict-doc-example': strictDocExample,
//     },
// };

// module.exports = plugin;
import decoratorKeySort from './decorator-key-sort.mjs';
import injectionTokenDescription from './injection-token-description.mjs';
import noDeepImports from './no-deep-imports.mjs';
import noImplicitPublic from './no-implicit-public.mjs';
import noPrivateEsnextFields from './no-private-esnext-fields.mjs';
import noSimpleForOf from './no-simple-for-of.mjs';
import strictDocExample from './strict-doc-example.mjs';

const plugin = {
    rules: {
        'decorator-key-sort': decoratorKeySort,
        'injection-token-description': injectionTokenDescription,
        'no-deep-imports': noDeepImports,
        'no-implicit-public': noImplicitPublic,
        'no-private-esnext-fields': noPrivateEsnextFields,
        'no-simple-for-of': noSimpleForOf,
        'strict-doc-example': strictDocExample,
    },
};

export default plugin;