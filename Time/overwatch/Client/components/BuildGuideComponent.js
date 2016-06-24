var React = require('react');
var AjaxService = require('../service/AjaxService');
var Underscore = require('underscore');
var $ = require('jquery');
var properties = require('../i18/AppProps');
var AppStore = require('../flux/Store');
var AppAction = require('../flux/Actions');
var Switch = require('rc-switch');

var BuildGuide = React.createClass({
    getInitialState: function () {
        return {
            side: false,
            loop: [0, 1, 2, 3, 4, 5],
            steps: 1,
            heros: null,
            maps: null,
            selection: {
                map: null,
                heros: []
            },
            title: "",
            description: "",
        };
    },
    componentWillMount: function () {
        var url = '/guide/mapList';
        AjaxService.get(url, function(response){
            if(response instanceof Error){
                console.error(response);
                return;
            }
            this.state.maps = response.data;
            this.forceUpdate();
        }.bind(this));
    },
    componentDidMount: function () {

    },
    insertMap: function(item) {
        this.state.selection.map = item;
        $("#mapNext").prop("disabled", false);
        this.forceUpdate();
    },
    insertHero: function(item) {
        let team = this.state.selection.heros;

        if(team.length < 6){
            team.push(item);
        }else{
            team.push(item);
            team.shift();
        }

        this.forceUpdate();
    },
    removeHero: function(index, side){
        if(this.state.selection.heros[index]){
            this.state.selection.heros.splice(index, 1);
        }
        this.forceUpdate();
    },
    nextHero: function(){
        $("#step1").removeClass("selected");
        $("#step2").addClass("selected");
        this.state.steps = 2;
        if(this.state.heros === null){
            var url = '/hero/allheros';
            AjaxService.get(url,function(response){
                if(response instanceof Error){
                    console.error("Can't get hero data");
                    return;
                }
                this.state.heros = response.data;
                this.forceUpdate();
            }.bind(this));
        }
        this.forceUpdate();
    },
    nextTitle: function(){
        $("#step2").removeClass("selected");
        $("#step3").addClass("selected");
        this.state.steps = 3;
        this.forceUpdate();
    },
    submitCombo: function(){
        this.state.title = this.refs.title.value;
        this.state.description = this.refs.description.value;
        if(this.state.title.length == 0 ){
            $("#guideTitleHint").css('visibility', 'visible');
            return;
        }
        var userId = window.sessionStorage.getItem('userId');
        if(!userId){
            AppAction.toast(properties.guideBuildFail);
            window.location.assign("#/guide");
            return;
        }
        var heroList = [];
        var role = this.state.side?"offense":"defense";
        for(let i in this.state.selection.heros){
            heroList.push(this.state.selection.heros[i].imgPath);
        }
        var date = new Date();
        var dateIso = date.toISOString();
        var data = {
            "userId": userId,
            "map": this.state.selection.map.path,
            "heroList": heroList,
            "title": this.state.title,
            "description": this.state.description,
            "createTime": dateIso,
            "role": role,
            "likeTime": 0,
            "dislikeTime": 0,
            "viewTime": 0
        };
        AjaxService.post("/guide/buildGuide", data, function(response){
            if(response.status === 200){
                AppAction.toast(properties.guideBuildSuccess);
                window.location.assign("#/guide");
            }else{
                AppAction.toast(properties.guideBuildFail);
                window.location.assign("#/guide");
            }
        });
    },
    switchSide: function(side,type) {
        if (type==='offense') {

            if(!this.state.side){
                $("#sideOffense").removeClass('guide-side-disable');
                $("#sideDefense").addClass('guide-side-disable');
                this.state.side = side;
                this.forceUpdate();
            }

        } else if(type==='defense'){
            if(this.state.side){
                $("#sideOffense").addClass('guide-side-disable');
                $("#sideDefense").removeClass('guide-side-disable');;
                this.state.side = side;
                this.forceUpdate();
            }
        }

    },
    render: function () {
        if(this.state.maps) {
            return (
                <div className="container-fluid">
                    <ul className="stepNav threeWide">
                        <li id="step1" className="selected"><a>{properties.selectMap}</a></li>
                        <li id="step2"><a>{properties.selectHero}</a></li>
                        <li id="step3"><a>{properties.titleComment}</a></li>
                    </ul>
                    {(() => {
                        switch (this.state.steps){
                            case 1:
                                return (
                                    <div id="mapSelectionPage" className="row-fluid">
                                        <div className="col-md-6" id="mapSelector">
                                            {Underscore.map(this.state.maps, function(item){
                                                return (
                                                    <span key={item.mapName} className="mapSelectionSpan" onClick={this.insertMap.bind(this, item)}>
                                                        <img className="mapSelectionImg" src={"./img/map_origin/"+item.path} />
                                                        <img className="addMap" src="./img/icon/add.png" />
                                                        <p>{item.mapName}</p>
                                                    </span>
                                                );
                                            }.bind(this))}
                                        </div>
                                        <div className="col-md-6">
                                            <span className="mapTarget">
                                                {this.state.selection.map?
                                                    <img className="mapTargetImg" src={"./img/map_origin/"+this.state.selection.map.path} />:
                                                    <div className="emptyMapTarget"><p>{properties.mapSelection}</p></div> }
                                                {this.state.selection.map?<p>{this.state.selection.map.mapName}</p>:null}
                                                {this.state.selection.map?<button id="mapNext" className="btn btn-block btn-info btn-left" onClick={this.nextHero.bind(this)}>
                                                    {properties.next}
                                                </button>:<button id="mapNext" className="btn btn-block btn-info btn-left" disabled>
                                                    {properties.next}
                                                </button>}
                                                <button onClick={() => {
                                                    window.location.assign("#/guide");
                                                }} id="mapCancel" className="btn btn-block btn-danger btn-right">
                                                    {properties.cancel}
                                                </button>
                                            </span>
                                        </div>
                                    </div>
                                );
                            case 2:
                                return (
                                    <div id="heroSelectionPage" className="row-fluid">
                                        <div className="col-sm-6">
                                            {Underscore.map(this.state.heros, function(item){
                                                return (
                                                    <span key={item.key} className="heroSelectionSpan" onClick={this.insertHero.bind(this, item)}>
                                                        <img className="heroSelectionImg" src={"./img/hero/"+item.imgPath} />
                                                        <img className="addHero" src="./img/icon/add.png" />
                                                    </span>
                                                );
                                            }.bind(this))}
                                        </div>
                                        <div className="col-md-6">
                                            <div className="choose-side">
                                                <p>{properties.chooseSide}, current side: {this.state.side?properties.offense:properties.defense}</p>
                                                <button id="sideOffense" onClick={this.switchSide.bind(this, true, 'offense')} className="btn btn-block btn-success btn-left guide-side-disable" >{properties.offense}</button>
                                                <button id="sideDefense" onClick={this.switchSide.bind(this, false, 'defense')} className="btn btn-block btn-danger btn-right" >{properties.defense}</button>
                                            </div>
                                            <div className="choose-team">
                                                <p>{properties.chooseTeam}</p>
                                            </div>
                                            <div>
                                                {Underscore.map(this.state.loop, function(index){
                                                    let hero = this.state.selection.heros[index];
                                                    if(hero){
                                                        return (<span className="col-sm-2 heroTargetSpanSolid">
                                                                <img className="heroTargetImg" src={"./img/hero/"+hero.imgPath} />
                                                                <img onClick={this.removeHero.bind(this, index, true)} className="deleteMap" src="./img/icon/deleteMap.png" />
                                                            </span>);
                                                    }else{
                                                        return (<span className="col-sm-2 heroTargetSpanDash">
                                                            <img className="emptyHeroTarget" src="./img/icon/question.png" />
                                                        </span>);
                                                    }
                                                }.bind(this))}
                                            </div>
                                            {this.state.selection.heros.length==6?<button id="heroNext" className="btn btn-block btn-info btn-left" onClick={this.nextTitle.bind(this)}>
                                                {properties.next}
                                            </button>:<button id="heroNext" className="btn btn-block btn-info btn-left" disabled>
                                                {properties.next}
                                            </button>}
                                            <button onClick={() => {
                                            this.state.steps = 1;
                                            $('#step2').removeClass('selected');
                                            $('#step1').addClass('selected');
                                            this.forceUpdate();
                                            }} id="heroCancel" className="btn btn-block btn-danger btn-right">
                                                {properties.previous}
                                            </button>
                                        </div>
                                    </div>
                                );
                            case 3:
                                return (
                                    <div id="titlePage" className="row-fluid">
                                        <div className="form-group">
                                            <label for="comboTitle">Title</label>
                                            <input ref="title" type="text" className="form-control" id="comboTitle" maxlength="50" />
                                            <label for="comboDescription">Comment:</label>
                                            <textarea ref="description" className="form-control" rows="5" id="comboDescription" maxlength="1000"></textarea>
                                            <span id="guideTitleHint" className="label label-info">{properties.guideInputHint}</span>
                                            <button onClick={this.submitCombo.bind(this)} id="finishNext" className="btn btn-block btn-info">
                                                {properties.finish}
                                            </button>
                                            <button onClick={() => {
                                            this.state.steps = 2;
                                            $('#step3').removeClass('selected');
                                            $('#step2').addClass('selected');
                                            this.forceUpdate();
                                            setTimeOut(function(){$('#mapNext').prop('disabled', false);}, 200);
                                            }} id="finishCancel" className="btn btn-block btn-danger">
                                                {properties.previous}
                                            </button>
                                        </div>
                                    </div>
                                );
                            default:
                                return <p></p>;
                        }
                    })()}
                </div>
            );
        }else{
            return (
                <div>
                    <p></p>
                </div>
            );
        }
    }
});

module.exports = BuildGuide;