// Import createConnectedStore to create undux store.
import { createConnectedStore } from 'undux';

// Create files store
export default createConnectedStore({
	files: [{"name": "sign_test.sol", "code": "pragma solidity 0.5.0;", "shown": true}], // Initialize with existing code
	tabMgmt: [0]
})
