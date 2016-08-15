'use strict'
const React = require('react');
const properties = require('../i18/AppProps');
const AjaxService = require('../service/AjaxService');
const _ = require('underscore');
const AppStore = require('../flux/Store');
var LoadingView = require('../views/LoadingView');
const CareerBestView = require('../views/pro/CareerBest');
const Achievements = require('../views/pro/Achievements');
const FeatureStats = require('../views/pro/FeatureStats');
const CommonHeros = require('../views/pro/CommonHeros');
const Heros = require('../views/pro/Heros');
import CircularProgressbar from 'react-circular-progressbar';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

require('../views/pro/pro.css');

const pro = React.createClass({
    getInitialState: function() {
        window.localStorage.setItem('currentPage', 'pro');
        var userId = window.sessionStorage.getItem('userId');
        var battleTag = {};
        if(AppStore.getBattleTag().battleTag) {
            battleTag = AppStore.getBattleTag();
        }else{
            battleTag = JSON.parse(window.localStorage.getItem('battleTag'));
        }

        return {info: null, userId: userId, searchError: false, battleTag: battleTag, gameData: null, loading: false, type: 0};
    },
    componentWillMount: function() {
    },
    lootBoxService: function(subdomain) {
        const battle = this.state.battleTag;

        AjaxService.get("https://api.lootbox.eu/"+battle.platform+"/"+battle.region+"/"+battle.battleTag+"/"+subdomain, (res) => {
            if(res instanceof Error){
                console.error(res);
                return;
            }

            this.state[subdomain] = res.data;
            this.forceUpdate();
        });
    },
    battleService: function(subdomain) {
        if(this.state[subdomain]){
            return;
        }

        const battle = this.state.battleTag;

        AjaxService.get(`/pro/battle/${subdomain}/${battle.platform}/${battle.region}/${battle.battleTag}`, (res) => {
            if(res instanceof Error){
                console.error(res);
                return;
            }

            this.state[subdomain] = res.data;
            this.forceUpdate();
        });
    },
    battleServiceWithType: function(subdomain, type) {
        if(this.state[`${subdomain}${type}`]){
            return;
        }

        const battle = this.state.battleTag;

        AjaxService.get(`/pro/battle/${subdomain}/${battle.platform}/${battle.region}/${battle.battleTag}/${type}`, (res) => {
            if(res instanceof Error){
                console.error(res);
                return;
            }

            this.state[`${subdomain}${type}`] = res.data;
            this.forceUpdate();
        })
    },
    componentDidMount: function() {
        this.battleService('basicinfo');
        //this.battleService('achievements');
        this.lootBoxService('achievements');
        this.battleServiceWithType('featurestats', this.state.type);
        this.battleServiceWithType('heros', this.state.type);
        this.battleServiceWithType('careerBest', this.state.type);
    },
    handleSelect:function(index, last) {
        console.log('Selected tab: ' + index + ', Last tab: ' + last);
    },
    render: function() {
        if(this.state.basicinfo == null
            || this.state.heros0 == null
            || this.state.careerBest0 == null
            || this.state.featurestats0 == null){
            return 	(<div className="loading-container">
                <LoadingView />
                <p>Loading...</p>
            </div>)
        }else {
            return (
                <div className="proContainer">
                    <div className="bestRecord">
                        <h4>Best record</h4>
                        <br/>
                        <hr/>
                        <div></div> 
                    </div>
                    <div className="row" style={{width: "90%", margin: "auto"}}>
                    {_.map(this.state[`careerBest${this.state.type}`].name, (item, i) => {
                        let displayValue = item.replace("- Most in Game", "");
                        return (
                            <div className="col-md-2 col-sm-3 bestRecordCard">
                                <p>{displayValue}</p>
                                <hr />
                                <h4>{this.state[`careerBest${this.state.type}`].value[i]}</h4>
                            </div>
                        );
                    })}
                    </div>
                    <br/>
                    <div style={{height: "20px"}}></div>
                    <div className="featureStats">
                    <h4>Feature Stats</h4>
                    <br/>
                    <hr/>
                    <div></div>
                    {_.map(this.state[`featurestats${this.state.type}`].name, (item, i) => {
                        if(i == 6){
                            return;
                        }
                        return (
                            <div key={item} className="featureStatsList">
                                <div className="featureStatsKey">
                                    <h5>{item}</h5>
                                </div>
                                <div className="featureStatsValue">
                                    <div className="progress">
                                        <div className="progress-bar" role="progressbar" aria-valuenow={this.state[`featurestats${this.state.type}`].value[i]}
                                          aria-valuemin="0" aria-valuemax="20" style={{width: this.state[`featurestats${this.state.type}`].value[i].indexOf(".")==-1?parseInt(this.state[`featurestats${this.state.type}`].value[i].replace(",",""))/60+"%":this.state[`featurestats${this.state.type}`].value[i]*5+"%"}}>
                                            {this.state[`featurestats${this.state.type}`].value[i]}
                                          </div>
                                        </div>      
                                    </div>
                            </div>
                        );
                    })}
                    </div>
                    <br/>
                    <div style={{height: "20px"}}></div>
                    <div className="heroStats">
                    <h4>Hero Stats</h4>
                    <br />
                    <hr />
                    <div></div>
                    <div className="row">
                        {_.map(this.state[`heros${this.state.type}`].heroName, (item, i) => {
                            let type = ['offense', 'defense', 'tank', 'support'][Math.floor(Math.random()*4)];
                            return (
                                <div key={item} className="heroStatsList">
                                    <div style={{flex: 1}}>
                                        <b>{i+1}</b>
                                    </div>
                                    <div style={{flex: 2}}>
                                        {item}
                                    </div>
                                    <div style={{flex: 2}}>
                                        <img style={{height: "40px"}} src={this.state[`heros${this.state.type}`].heroImg[i]} />
                                    </div>
                                    <div style={{flex: 2}} className="heroStatsIcon">
                                        <img style={{height: "40px"}} src={`./img/icon/${type}.png`} />
                                    </div>
                                    <div className="heroStatsValue">
                                        <div className="progress">
                                            <div className="progress-bar" role="progressbar" aria-valuenow={this.state[`heros${this.state.type}`].description[i]}
                                            aria-valuemin="0" aria-valuemax="100" style={{width: this.state[`heros${this.state.type}`].description[i]}}>
                                                {this.state[`heros${this.state.type}`].description[i]}
                                            </div>
                                        </div>      
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    </div>
                    <br/>
                    <div style={{height: "20px"}}></div>
                    <div className="bestRecord">
                        <h4>Achievements</h4>
                        <br/>
                        <hr/>
                        <div></div> 
                    </div>
                    <div className="row" style={{width: "90%", margin: "auto"}}>
                    {_.map(this.state.achievements.achievements, (item, i) => {
                        if(item.finished){
                            return (
                                <div key={item.name} className="col-md-1 col-sm-2 achievementCard">
                                    <img className="achievementCardImgActive" src={item.image} />
                                </div>
                            );
                        }else{
                            return (
                                <div key={item.name} className="col-md-1 col-sm-2 achievementCard">
                                    <img className="achievementCardImgInactive" src={item.image} />
                                </div>
                            );
                        }
                    })}
                    </div>
                </div>
            );
        }
    }
});

module.exports = pro;

