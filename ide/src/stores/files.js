// Import createConnectedStore to create undux store.
import { createConnectedStore } from 'undux';
// Import default opensign.sol contract.
import { opensign_sol } from './sample';

// TODO: Setup persistance 

// Create files store
export default createConnectedStore({
	// Files stores all existing file names, code, shown switch, and col/row number of cursor
	files: [opensign_sol],
	// Tab Management is used for global editor tab management.
	tabMgmt: [0],
})
