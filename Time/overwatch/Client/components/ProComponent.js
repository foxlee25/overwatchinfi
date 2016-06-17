var React = require('react');
var AppStore = require('../flux/Store');
var AjaxService = require('../service/AjaxService');

var Pro = React.createClass({
	getInitialState: function() {
		var userId = window.sessionStorage.getItem('userId');
		return {info: null, userId: userId};
	},
	componentWillMount: function(){

		let data = AppStore.getLoginData();
		this.state.fbLogin = data;
		let config = {
			data: this.state.fbLogin
		};

		AjaxService.post('/pro/all', config, function(response){
			if(response.data.info){
				this.setState({info: response.data.info});
			}
		});
	},
	componentDidMount: function(){
		
	},
	search: function(){

	},
	render: function() {
		if(this.state.userId) {
			return(
				<div className="container">
					<div className="row">
						<div className="col-lg-6">
							<div className="input-group">
								<input ref="search" type="text" className="form-control" placeholder={properties.battleTag} />
								  <span className="input-group-btn">
									<button className="btn btn-default" type="button" onClick={this.search.bind(this)}>Search</button>
								  </span>
							</div>
						</div>
						<div className="col-lg-6">
							<h4>{properties.region}</h4>
							<select className="form-control">
								<option default value="us">us</option>
								<option value="eu">eu</option>
							</select>
							<h4>{properties.platform}</h4>
							<select className="form-control">
								<option default value="pc">pc</option>
								<option value="xbl">xbox</option>
								<option value="psn">play station</option>
							</select>
						</div>
					</div>
				</div>
			);
		}else {
			return (
				<div>
					<p>login to get your personal data trainer</p>
				</div>
			);
		}
	}
});


module.exports = Pro;
