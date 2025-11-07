export default {
  branches: [
    "main", 
    { name: "stage", prerelease: true } // prerelease channel
  ],
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    [
      "@semantic-release/changelog",
      {
        changelogFile: "CHANGELOG.md"
      }
    ],
    [
      "@semantic-release/exec",
      {
        prepareCmd: "node ./.scripts/app-set-version.mjs ${nextRelease.version}",
        successCmd: "echo 'Release ${nextRelease.version} complete'"
      }
    ],
    [
      "@semantic-release/git",
      {
        assets: [
          "CHANGELOG.md",
          "package.json",
          "app/VERSION",
          "android/gradle.properties",
          "ios/Info.plist"
        ],
        message:
          "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
      }
    ]
  ]
};
