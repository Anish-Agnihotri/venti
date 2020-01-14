import React, {useCallback} from 'react';
import Store from '../../../../../../../stores/files';
import Dropzone from 'react-dropzone';

import uploadImg from './upload.png';

class UploadFile extends React.Component {
	constructor() {
		super();

		this.state = {
			uploadImage: uploadImg,
			uploadString: 'Upload your .sol file',
			isLoading: false
		}

		this.handleUpload = this.handleUpload.bind(this);
	}
	// TODO: Reject non .sol files
	handleUpload(file) {
		// Change string, loading
		const upload = file[0];
		this.setState({
			uploadString: upload.name,
			isLoading: true
		})

		file.forEach((file) => {
			const reader = new FileReader()
			reader.readAsText(file)
			reader.onload = () => {
				const code = reader.result
				
				this.props.store.get('files').push({"name": upload.name, "code": code, "shown": true});
				this.props.store.set('files')(this.props.store.get('files'));

				this.props.store.get('tabMgmt')[0] += 1;
				this.props.store.set('tabMgmt')(this.props.store.get('tabMgmt'))
				this.props.closeModal();
			}
		})
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
									
									<h2>{this.state.uploadString}</h2>
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
