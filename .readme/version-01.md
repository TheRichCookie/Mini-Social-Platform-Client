# Git Cache Credential

git config --global credential.helper cache | 15min cache and can be modified.

git config --global credential.helper manager-core

# Create Repository

git config --global user.name "AmirHossein Salehi (TheRichCookie)" git config --global user.email
"amirsalehi138080@gmail.com" git clone https://gitlab.com/void6270247/baman-web-app-void.git git branch -m develop |
change name

---

# Permission In GitLab

Change permission Change default branch and make it protected

---

# Read This For Polyrepo

## Creating Git Submodule

Navigate to Your Main Repository git submodule add <repository_url> <path_to_submodule> git add .gitModules
<path_to_submodule> git commit -m "Added submodule"

## Initialize and Update Submodules

git submodule update --init --recursive

---

# Create Workspace

ng new . --create-application=false --skip-git=true --skip-install=true --strict

## Flags Explained

Explanation: ng new .

This creates a new Angular workspace in the current directory (.).

This is useful when you're already inside a directory where you want the workspace to be created, rather than making a
new subfolder.

--create-application=false

Prevents Angular from generating a default application when setting up the workspace.

This is useful if you want a "bare" workspace, for example, to add multiple applications or libraries later (like in
monorepos).

--skip-git=true

Prevents Angular CLI from automatically initializing a Git repository in the project.

--skip-install=true

Skips running npm install after project setup.

You can run it later manually with npm install or yarn install

---

# Changes in angular.json

change newProjectRoot:projects to newProjectRoot:random-name

---

# Create App

ng generate application hangout-app --prefix=hang --skip-tests=true --routing=true --ssr=false --style scss
--skip-install=true

- add this flag only if you need to specify the path of project : --project-root=projects/baman-app

---

# Add library

ng generate lib @baman/ui-kit --prefix=uk --skip-install

## Flags Explained

@baman/ui-kit The library's package name / npm scope. When published (or imported), the package will be known as
@baman/ui-kit. Internally the CLI creates a project entry for the library in your workspace configuration.

---

# TS config

## TS Compiler Explain:

strict: true → turn on a bunch of helpful type checks (catch many bugs).

noImplicitReturns: true → every function must return a value on every path or you get an error.

noFallthroughCasesInSwitch: true → prevent accidental fall-through in switch.

forceConsistentCasingInFileNames: true → make import paths match file name case exactly (avoids cross-OS bugs).

skipLibCheck: true → speed up builds and silence third-party .d.ts errors (useful during strict migration).

## Angular Compiler Explain:

enableI18nLegacyMessageIdFormat: false — a compatibility flag for translation message IDs; set to false for modern
projects, true only if you must keep legacy IDs.

strictInjectionParameters: true — forces correct DI typing; fix by adding concrete service types or using @Inject
tokens.

strictInputAccessModifiers: true — requires @Input() members to have explicit public/protected/private; usually use
public.

strictTemplates: true — strong template null/type checking; fix template expressions (?., initial values) or types.

fullTemplateTypeCheck: true — makes Angular catch more binding mistakes (wrong property names/types).

strictInputTypes: true — ensures parent → child binding types match @Input() types.

strictOutputEventTypes: true — ensures @Output() EventEmitter type and parent handler types match.
