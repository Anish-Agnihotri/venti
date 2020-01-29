// Import createConnectedStore to create undux store.
import { createConnectedStore } from 'undux';
import { opensign_test_code } from './sample';

// TODO: Setup persistance 

// Create files store
export default createConnectedStore({
	// Files stores all existing file names, code, shown switch, and col/row number of cursor
	files: [{"name": "opensign_test.sol", "code": opensign_test_code, "shown": true, "row": 27, "col": 1}],
	// Tab Management is used for global editor tab management.
	tabMgmt: [0],
})
