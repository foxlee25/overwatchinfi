var React  = require("React");

var ProfileCard = React.createClass({
    getInititalState: function () {
        return {};
    },
    propTypes: {
        profile: React.PropTypes.object
    },
    render: function () {
        return (
            <div className="row">
                <div className="col-md-6 profile-card-div">
                    <img className="img-responsive" src={this.props.profile.data.avatar} />
                    <div>
                        <p>User: {this.props.profile.data.username}</p>
                        <p>Wins: {this.props.profile.data.games.wins}</p>
                        <p>Lost: {this.props.profile.data.games.lost}</p>
                        <p>Played: {this.props.profile.data.games.played}</p>
                    </div>
                    <div>
                        {this.props.profile.data.level}
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = ProfileCard;

// <div className="progress">
//     <div className="progress-bar" role="progressbar" aria-valuenow={this.props.profile.data.games.win_percentage}
//          aria-valuemin="0" aria-valuemax="100" style={{width: this.props.profile.data.games.win_percentage+"%"}}>
//     </div>
// </div>