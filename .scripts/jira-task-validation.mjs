// scripts/check-jira-issue.js
// usage: node ./scripts/check-jira-issue.js path/to/COMMIT_MSG_FILE
import fs from 'fs';
import 'dotenv/config';
import {Buffer} from 'buffer';

// OR use axios if you prefer (npm i axios) and simpler code

const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const RESET = '\x1b[0m';

const JIRA_BASE = process.env.COMPANY_JIRA_DOMAIN; // e.g. https://your-domain.atlassian.net
const JIRA_USER = process.env.USER_JIRA_EMAIL; // your email
const JIRA_TOKEN = process.env.USER_JIRA_TOKEN; // api token

if (!JIRA_BASE || !JIRA_USER || !JIRA_TOKEN) {
    console.error(`❌ ${RED} Missing JIRA_BASE, JIRA_USER or JIRA_API_TOKEN environment variables. ${RESET}`);
    process.exit(1);
}

const file = process.argv[2];
if (!file || !fs.existsSync(file)) {
    console.error(`❌ ${RED}  Commit message file not provided or not found. ${RESET}`);
    process.exit(1);
}
const msg = fs.readFileSync(file, 'utf8');

// crude but common Jira key regex: starts with letter, then letters/digits, hyphen, number
const issueRegex = /([A-Z][A-Z0-9]+-\d+)/;
const match = msg.match(issueRegex);

if (!match) {
    console.error(`❌ ${RED}  No Jira issue key found in commit message. Example: HANG-123 ${RESET}`);
    process.exit(1);
}

const issueKey = match[1].trim();

// make GET request to Jira REST API /issue/{key}
const url = `${JIRA_BASE}/rest/api/3/issue/${issueKey}`;
// Use template literal for Basic auth safely
const auth = 'Basic ' + Buffer.from(`${JIRA_USER}:${JIRA_TOKEN}`, 'utf8').toString('base64');

try {
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            Authorization: auth,
            Accept: 'application/json',
        },
    });

    const data = await res.json();

    if (res.status === 200) {
        console.log(`✅ ${GREEN} Jira issue ${issueKey} exists — commit allowed. ${RESET}`);
        process.exit(0);
    } else if (res.status === 404) {
        console.error(`❌ ${RED} Jira issue ${issueKey} NOT FOUND or no permission. ${RESET}`);
        process.exit(1);
    } else if (res.status === 401 || res.status === 403) {
        console.error(`❌ ${RED} Authentication/permission error contacting Jira (HTTP ${res.status}). ${RESET}`);
        process.exit(1);
    } else {
        console.error(`❌ ${RED} Unexpected Jira response (HTTP ${res.status}). ${RESET}`);
        process.exit(1);
    }
} catch (err) {
    console.error('Fetch error:', err);
    process.exit(1);
}
