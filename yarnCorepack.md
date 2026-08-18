# Corepack and Yarn

Corepack is part of helping us migrate to newer versions of yarn in a repo by repo manner. It will help seamlessly switch between repos that use different versions of yarn without any manual intervention.

## 🛠️ Phase 1: Setting Up Corepack Environment

Devs should ensure Corepack is active on their machines.
* If using Node.js 24 or older (Active/Maintenance LTS), Corepack is built-in.
* If using Node.js 25+, developers must install Corepack globally first. 
* Yarn documentation on corepack https://yarnpkg.com/corepack 

### Step 1: Install Corepack (Node 25+ Only)
If developers are on the newest Node versions, they should run:
``` sh
npm install -g corepack
```

### Step 2: Enable Corepack
Regardless of the Node version, everyone must enable Corepack to allow it to intercept Yarn commands and route them to the correct binary version specified in the project.

``` bash
corepack enable
```

Note: If using version managers like nvm or fnm, you may need to do this every time they install a new Node version.

### Step 3: Run `yarn install`

Most of our projects should already have a packageManager entry in the package.json file. And if so you should be ready to go. Running a `yarn install` should install the specified version of yarn if you don't already have it, and then use that to install all dependencies.

## 🚀 Phase 2: Migrating a Legacy Project to Yarn 4

Many projects have already done some of the setup to prep for the move, such as preemptively defining new .gitignore entries. 

### Step 1: Set the Yarn Version

Run the following command at the root of the project to download the Yarn 4 binary and update the "packageManager" field in package.json:

``` bash
yarn set version berry
```

Or target a specific version to match our other projects:

``` bash 
yarn set version 4.17.1
```

You should see the `"packageManager"` entry in `package.json` update to something like `"yarn@4.17.1+sha512.ccbfa…"`

### Step 2: Configure the Node Linker

By default, Yarn 4 tries to use Plug'n'Play. To maintain backward compatibility with your legacy projects and avoid a massive headache, we often will choose to explicitly tell Yarn to keep using node_modules.

Create or edit the .yarnrc.yml file in the project root and add:
``` yaml
nodeLinker: node-modules
```

(Note: If you have an existing .npmrc or .yarnrc file, Yarn 4 ignores them. You will need to migrate any custom registry or auth token configurations into .yarnrc.yml.)

### Step 3: Update .gitignore

Yarn 4 generates new directories for its binaries and caches. If git is tracking new files add the following to your .gitignore to keep the repository clean:

``` txt
# Yarn Berry
.yarn/*
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/sdks
!.yarn/versions
```

### Step 4: Clear Old State and Reinstall

Trigger a fresh install to migrate the existing lockfile.

``` bash
yarn install
```

This will resolve your dependencies using Yarn 4's faster engine and generate a brand-new yarn.lock file in the modern YAML format.

### Step 5: Update GitHub actions commands to yarn 4 versions

Migration of the config .yml files to add `corepack enable` step or yarn 4 updated commands where relevant.

### Step 6: Commit the Changes

Once the installation is successful and the project runs locally, commit the changes:
* package.json (Updated packageManager field)
* .yarnrc.yml
* yarn.lock (New format)
* .gitignore
* .github/workflows/config.yml files



💡 Quick Tips for the Team
* Command Changes: A few Yarn 1 commands have changed. For example, `yarn upgrade` is now `yarn up`, and `yarn install --frozen-lockfile` (often used in CI) is now `yarn install --immutable`. 
* Patching: If your legacy projects relied on patch-package via postinstall scripts, Yarn 4 has native patching built-in. You can transition those by running `yarn patch <package-name>`.
