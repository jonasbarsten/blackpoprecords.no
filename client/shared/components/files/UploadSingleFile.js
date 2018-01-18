
// elementId="id" --> trigger file dialog, ex. $('#id').trigger('click');
// attatchToCategory="category" --> for meta sub document in file document "meta: [{category: id}]"
// attatchToId="id" --> for meta sub document in file document "meta: [{category: id}]"
// postUploadMethod="methodName" --> Method to be ran after upload "Meteor.call('methodName', customArgument, fileObject)"
// postUploadMethodArgument="customArgument" --> "Meteor.call('methodName', customArgument, fileObject)""



import React, {Component} from 'react';

export default class UploadSingleFile extends Component {

	upload (e) {
		"use strict";
		e.preventDefault();

		let self = this;

			if (e.currentTarget.files && e.currentTarget.files[0]) {
			// We upload only one file, in case
			// there was multiple files selected
			var file = e.currentTarget.files[0];

			if (file) {
				let uploadInstance = UserFiles.insert({
					file: file,
					
					meta: {
						locator: self.props.fileLocator,
						userId: Meteor.userId(), // Optional, used to check on server for file tampering
						attachTo: [
							{category: this.props.attatchToCategory, id: this.props.attatchToId}
						]
					},
					streams: 'dynamic',
					chunkSize: 'dynamic',
					allowWebWorkers: true // If you see issues with uploads, change this to false
				}, false);

				this.setState({
					uploading: uploadInstance, // Keep track of this instance to use below
					inProgress: true // Show the progress bar now
				});

				// These are the event functions, don't need most of them, it shows where we are in the process
				uploadInstance.on('start', function () {
					// console.log('Starting');
				});

				uploadInstance.on('end', (error, fileObj) => {

					Meteor.call(this.props.postUploadMethod, this.props.postUploadMethodArgument, fileObj._id);
				});

				uploadInstance.on('uploaded', function (error, fileObj) {
					// console.log('uploaded: ', fileObj);

					// Remove the filename from the upload box
					self.refs['fileinput'].value = '';

					// Reset our state for the next file
					self.setState({
						uploading: [],
						progress: 0,
						inProgress: false
					});
				});

				uploadInstance.on('error', function (error, fileObj) {
					// console.log('Error during upload: ' + error);
				});

				uploadInstance.on('progress', function (progress, fileObj) {
					// console.log('Upload Percentage: ' + progress);
					// Update our progress bar
					self.setState({
						progress: progress
					})
				});

				uploadInstance.start(); // Must manually start the upload
			}
		}

	}

	render () {
		return (
			<input 
				id={this.props.elementId} 
				type="file" 
				ref="fileinput"
				onChange={this.upload.bind(this)}
				style={{display: 'none'}}
			/>
		);
	}
}