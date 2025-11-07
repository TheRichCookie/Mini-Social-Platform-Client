import custom from '@digitalroute/cz-conventional-changelog-for-jira/configurable.js';
import defaultTypes from '@digitalroute/cz-conventional-changelog-for-jira/types.js';

export default custom({
    types: {
        ...defaultTypes,
        perf: {
            description: 'Improvements that will make your code perform better',
            title: 'Performance',
        },
    },
    skipScope: false,
    scopes: ['WORKSPACE', 'HANGOUT', 'UI_KIT'],
    customScope: true,
    jiraMode: true,
    maxHeaderWidth: 70,
    minHeaderWidth: 10,
    jiraPrefix: 'HAN',
    jiraOptional: false,
    jiraPrepend: '[',
    jiraAppend: ']',
    skipBreaking: true,
});
