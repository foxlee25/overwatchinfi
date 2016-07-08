var React = require('react');
var Underscore = require('underscore');
var dateFormat = require('dateformat');
var AjaxService = require('../service/AjaxService');
var likeGuideList = [];
var dislikeGuideList = [];

var mapName = {"map_Ilios_stage_1.jpg": "Ilios1",
    "map_Ilios_stage_2.jpg": "Ilios2",
    "map_Ilios_stage_3.jpg": "Ilios3",
     "map_dorado.jpg": "Dorado",
     "map_hanamura.jpg": "Hanamura",
    "map_hollywood.jpg": "Hollywood",
    "map_kings_row.jpg": "KingsRow",
    "map_lijiang_tower_stage_1.jpg": "Lijiang-Tower1",
    "map_lijiang_tower_stage_2.jpg": "Lijiang-Tower2",
    "map_lijiang_tower_stage_3.jpg": "Lijiang-Tower3",
    "map_nepal_stage_1.jpg": "Nepal1",
    "map_nepal_stage_2.jpg": "Nepal2",
    "map_nepal_stage_3.jpg": "Nepal3",
    "map_numbani.jpg": "Numbani",
    "map_route_66.jpg": "Route66",
    "map_temple_of_anubis.jpg": "Temple-of-Anubis",
    "map_volskaya_Industries.jpg": "Volskaya",
    "map_watchpoint_gibraltar.jpg": "Watchpoint"}



var GuideCard = React.createClass({
	getInitialState: function(){
		return {};
	},
	componentWillMount: function(){
        this.state.userId = window.sessionStorage.getItem('userId');
        if(this.props.guide.likeTime){
            this.state.likeTime = this.props.guide.likeTime;
        }else{
            this.state.likeTime = 0;
        }

        if(this.props.guide.dislikeTime){
            this.state.dislikeTime = this.props.guide.dislikeTime;
        }else{
            this.state.dislikeTime = 0;
        }
        this.updateProgressbar();
	},
    propTypes: {
        guide: React.PropTypes.object
    },
    updateProgressbar: function(){
        var totalTime = this.state.likeTime + this.state.dislikeTime;
        if(totalTime > 0){
            var likePercent = Math.round((this.state.likeTime / totalTime)*100);
            var dislikePercent = 100 - likePercent;
            this.state.likeStyle = {width: likePercent+'%'};
            this.state.dislikeStyle = {width: dislikePercent+'%'};
        }else{
            this.state.likeStyle = {width: '0%'};
            this.state.dislikeStyle = {width: '0%'};
        }

    },
    likeGuide: function(){
        var guide = this.props.guide;
        if(likeGuideList.indexOf(guide.createTime) > -1)
            return;
        likeGuideList.push(guide.createTime);
        var url = '/guide/clickGuide';
        this.state.likeTime = this.state.likeTime+1;
        this.updateProgressbar();
        this.forceUpdate();
        AjaxService.post(url,{data: {createTime : guide.createTime ,type : 'like'}});
    },
    dislikeGuide: function(){
        var guide = this.props.guide;
        if(dislikeGuideList.indexOf(guide.createTime) > -1)
            return;
        dislikeGuideList.push(guide.createTime);
        var url = '/guide/clickGuide';
        this.state.dislikeTime = this.state.dislikeTime+1;
        this.updateProgressbar();
        this.forceUpdate();
        AjaxService.post(url,{data: {createTime : guide.createTime,type : 'dislike'}});
    },
    removeGuide: function(guideId){
        var url = '/guide/removeGuide';
        AjaxService.post(url,{data: {guideId : guideId}});
        window.location.reload(true);
    },
	componentDidMount: function() {

	},
	render: function(){
		return (
			<div className="guideCard col-md-12" >
        {this.state.userId==='admin'?<div onClick={this.removeGuide.bind(this, this.props.guide.createTime)} className="glyphicon glyphicon-remove-circle guide-remove-icon"></div>:<div></div>}
				<div className="col-md-4">
					<img className="guide-map"  src={"./img/map_origin/"+this.props.guide.map} />
			        <div className="guide-map-name">{mapName[this.props.guide.map]}</div>
				</div>
				<div className="col-md-8">
					<div className="guide-title"><span>{this.props.guide.title}  ({this.props.guide.role})</span></div>
		             <div className="guide-user">{this.props.guide.userId} at {dateFormat(this.props.guide.createTime,'mmmm dd hh:MM TT')}</div>

					<div className="guideHeroList">{Underscore.map(this.props.guide.heroList, function(hero,index){
							return(<img key={index} className="guideHeroImg"  src={"./img/hero/"+hero} />);
						}.bind(this))}
					</div>
                   <span className="guide-button"><img className="guide-button-img-like" onClick={this.likeGuide} src={"./img/icon/Down.png"}/></span>
                    <div className="progress guideProgress">
            {this.state.likeTime?<div className="progress-bar progress-bar-success" style={this.state.likeStyle} >
        {this.state.likeTime} Agree ({this.state.likeStyle.width})
        </div>:<div className="progress-bar progress-bar-success" style={this.state.likeStyle} ></div>}
        {this.state.dislikeTime?<div className="progress-bar progress-bar-danger" style={this.state.dislikeStyle}  >
            {this.state.dislikeTime} Disagree ({this.state.dislikeStyle.width})
        </div>: <div className="progress-bar progress-bar-danger" style={this.state.dislikeStyle}  ></div>}

					</div>
                    <span className="guide-button"><img className="guide-button-img-dislike" onClick={this.dislikeGuide} src={"./img/icon/Up.png"}/></span>

            </div>

			</div>
		);
	}
});

module.exports = GuideCard;