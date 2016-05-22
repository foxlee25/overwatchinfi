var React = require('react');
var $ = require('jquery');

var VideoCard = React.createClass({
	getInitialState: function(){
		return {};
	},
    componentDidMount: function() {
       $('.videoCard').children('iframe').attr('allowfullscreen','allowfullscreen');
       
    },
	render: function(){
		return (
			<div className="col-md-4 col-sm-6 col-xs-12">
				<div className="videoCard">
                    <iframe className="videoCardIframe"
                        src={this.props.video.url}>
                    </iframe>
			    </div>
			</div>
		);
	}
});

module.exports = VideoCard;