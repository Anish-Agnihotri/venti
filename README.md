<p align="center">
	<img src="https://i.imgur.com/B6GFWYF.png" height="150" />
</p>

**:warning:Warning: Venti is currently a Work-In-Progress (WIP), as a hobby project of [@anish-agnihotri](https://github.com/anish-agnihotri). Until first stable release, project may not be buildable or feature-complete.**</p>

Venti is the *hip* browser-only Ethereum IDE and runtime environment for Solidity + Vyper. It's exposes a minimalist user interface with the aim of being clean, simple, and comfortable for developers (*especially*, those new to blockchain).

Venti is written completely in JavaScript and is extremely efficient. It's lightweight and can be installed with a few commands on *any* environment (Docker support soon).

Functionality is built with the mind-set of expanding [Remix](http://remix.ethereum.org) while optimizing core functionalities for ease and simplicity.

![screenshot](https://i.imgur.com/ocHxezZ.png)

## Running Venti
There are a variety of ways to run Venti.

### Running Locally
It is extremely easy to develop Venti. To run Venti locally in development mode it's only 4 simple steps:
1. Run `git clone https://github.com/anish-agnihotri/venti.git`
2. Change directory via `cd ide/`
3. Run `yarn`
4. Run `yarn start`

### Building from source
It is also very easy to build Venti from source. To run Venti locally it's only 5 simple steps:
1. Run `git clone https://github.com/anish-agnihotri/venti.git`
2. Change directory via `cd ide/`
3. Run `yarn`
4. Run `yarn build`
5. Run `yarn start`

### Running with Docker
Coming soon; stay tuned.

## Architecture
Venti is built to be run completely in a modern browser environment. Core functionality is built on the frameworking of [React](https://github.com/facebook/react), [Undux](https://github.com/bcherny/undux) for hyper-simplified type-safe state management, and [Ethers.js](https://github.com/ethers-io/ethers.js/) for Ethereum utilities in JavaScript.

Additionally, the platform relies heavily upon [ace](https://github.com/ajaxorg/ace) as a standalone code editor (via [react-ace](https://github.com/securingsincity/react-ace)), [react-tabs](https://github.com/reactjs/react-tabs) for multi-file editor management, and [ace-mode-solidity](https://github.com/raphaelhuefner/ace-mode-solidity) for Solidity language support (soon, Vyper too).

Full feature-set + architecture to be updated upon release.

## Attributions
* Architecture: [ethereum/remix-ide](https://github.com/ethereum/remix-ide)
* Design: [Martyna Kwiatkowska](https://dribbble.com/shots/6302230-Remix-Ethereum/attachments/1349789)
* Formatting: [notepad/notepad](https://github.com/notepad/notepad/blob/master/README.md)

## License
Venti is licensed under [the MIT license](https://github.com/anish-agnihotri/venti/blob/master/LICENSE.md).
