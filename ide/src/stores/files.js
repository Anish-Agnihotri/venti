// Import createConnectedStore to create undux store.
import { createConnectedStore } from 'undux';

// Create files store
export default createConnectedStore({
	// Files stores all existing file names, code, shown switch, and col/row number of cursor
	files: [{"name": "sign_test.sol", "code": "pragma solidity 0.5.0;", "shown": true}],
	// Tab Management is used for global editor tab management.
	tabMgmt: [0]
})
