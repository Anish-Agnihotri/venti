import React from 'react';
import Store from '../../../../../../../stores/files';
import Dropzone from 'react-dropzone';

import uploadImg from './upload.png';

class UploadFile extends React.Component {
	constructor() {
		super();

		this.state = {
			uploadImage: uploadImg,
			uploadString: 'Upload your .sol file',
			isLoading: false,
			isError: false,
		}

		this.handleUpload = this.handleUpload.bind(this);
	}
	// TODO: Reject non .sol files
	handleUpload(file) {
		// Change string, loading
		const upload = file[0];

		// If file name ends with sol
		if (upload.name.split('.').pop().toLowerCase() === "sol") {
			let fileName = upload.name

			// If filename already exists, add a -1
			for (let i = 0; i < this.props.store.get('files').length; i++) {
				if (fileName === this.props.store.get('files')[i]["name"]) {
					fileName = fileName.substr(0, fileName.indexOf('.')) + "-1.sol";
				}
			}

			this.setState({
				uploadString: fileName,
				isLoading: true,
				isError: false
			})

			file.forEach((file) => {
				const reader = new FileReader()
				reader.readAsText(file)
				reader.onload = () => {
					const code = reader.result
					
					this.props.store.get('files').push({"name": fileName, "code": code, "shown": true});
					this.props.store.set('files')(this.props.store.get('files'));

					this.props.store.get('tabMgmt')[0] += 1;
					this.props.store.set('tabMgmt')(this.props.store.get('tabMgmt'))
					this.props.closeModal();
				}
			})
		} else { // If non .sol file:
			this.setState({
				uploadString: "Error: Not a .sol file",
				isError: true
			})
		}
	}
	render() {
		return(
			<div className="modal-outer">
				<div className="modal-header">
					<h1>Upload .sol file</h1>
					<span>Easily use your existing Solidity files.</span>
				</div>
				<div className="modal-content upload-file-modal">
					<Dropzone onDrop={acceptedFiles => this.handleUpload(acceptedFiles)}>
						{({getRootProps, getInputProps}) => (
							<section>
								<div {...getRootProps()}>
									<input {...getInputProps()} />
									{ this.state.isLoading ? <i className="fa fa-spinner fa-spin"></i> : <img src={this.state.uploadImage} alt="Upload" />}
									
									<h2 className={this.state.isError ? 'wrongupload' : ''}>{this.state.uploadString}</h2>
								</div>
							</section>
						)}
					</Dropzone>
				</div>
			</div>
		)
	}
}

export default Store.withStore(UploadFile);
