var React  = require("React");
var $ = require("jquery");

var AchievementCard = React.createClass({
    getInitialState: function () {
        return {};
    },
    propTypes: {
        achievement: React.PropTypes.object
    },
    componentDidMount: function(){
    },
    render: function () {
        return (
            <div className="achievement-div">
                {this.props.achievement.finished?<img src={this.props.achievement.image} />:<img style={{background: "rgba(0,255,255, 0.5)"}} src={this.props.achievement.image} />}
                <div className="achievement-tip">
                    <span>
                        <p>Name: {this.props.achievement.name}</p>
                        {this.props.achievement.finished?<p>Finished</p>:<p>Not finished</p>}
                    </span>
                </div>

            </div>
        );
    }
});

module.exports = AchievementCard;