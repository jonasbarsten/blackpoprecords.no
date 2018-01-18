import React, { Component } from 'react';
import { Link } from 'react-router';

class Footer extends Component {
	render() {
		return (
			<div id="footer-container">
				<div id="footer">
					<div className="friend-sites row">
						<div className="col-sm-4 col-xs-12 text-center">
							<Link target="blank" to="https://feiltrykkpr.no">
								Feiltrykk PR
							</Link>
						</div>
						<div className="col-sm-4 col-xs-12 text-center">
							<Link target="blank" to="https://jansenrecords.com">
								Jansen Records
							</Link>
						</div>
						<div className="col-sm-4 col-xs-12 text-center">
							<Link target="blank" to="http://round2.no">
								Round 2
							</Link>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Footer;