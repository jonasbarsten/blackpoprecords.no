import React, {Component} from 'react';

export default class ListLinks extends Component {
	render() {

		if (this.props.links) {
			var render = this.props.links.map((link) => {
				return (
					<div className="col-sm-3" key={link.id} onClick={() => {this.props.onClick(link)}}>
						{link.name}
					</div>
				);
			});			
		} else {
			var render = '';
		}

		return(
			<div>
				<div className="row link-list">
					{render}
				</div>
			</div>
		);
	}
}