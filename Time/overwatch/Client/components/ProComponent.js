'use strict'
const React = require('react');
const properties = require('../i18/AppProps');
const AjaxService = require('../service/AjaxService');
const _ = require('underscore');
const AppStore = require('../flux/Store');
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
        this.battleService('achievements');
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
            return <div>loading</div>
        }else {
            return (
                <div className="proContainer">
                    <div className="featureStats">
                    <h4>Feature Stats</h4>
                    <div></div>
                    <hr/>
                    <div></div>
                    {_.map(this.state[`featurestats${this.state.type}`].name, (item, i) => {
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
                    <div style={{height: "20px"}}></div>
                    <div className="heroStats">
                    <h4>Hero Stats</h4>
                    <div></div>
                    <hr />
                    <div></div>
                    <div className="row">
                        {_.map(this.state[`heros${this.state.type}`].heroName, (item, i) => {
                            let percent = parseInt(this.state[`heros${this.state.type}`].description[i].replace("%", ""));
                            return (
                                <div key={item} className="col-sm-4 col-md-3 heroStatsGrid">
                                    <img src={this.state[`heros${this.state.type}`].heroImg[i]} className="heroStatsGridImg" />
                                    <div className="heroStatsCircle">
                                        <CircularProgressbar percentage={percent} />
                                    </div>
                                    <p>{item}</p>
                                </div>
                            );
                        })}
                    </div>
                    </div>
                    <div className="proTopBar">
                        <p>
                            {this.state.basicinfo.profileName}
                        </p>
                        <p>
                            {this.state.basicinfo.level} {this.state.basicinfo.platform} {this.state.basicinfo.gameWins}
                        </p>
                    </div>
                    <Tabs style={{width: "80%", margin: "auto"}} onSelect={this.handleSelect} selectedIndex={0}>
                        <TabList>
                            <Tab>General</Tab>
                            <Tab>Heros</Tab>
                            <Tab>Best record</Tab>
                            <Tab>Achievements</Tab>
                        </TabList>
                        <TabPanel>
                            <FeatureStats data={this.state[`featurestats${this.state.type}`]} />
                            <div style={{width: "90%", margin: "auto"}}>
                                <CommonHeros style={{width: "50%"}} data={this.state[`heros${this.state.type}`]} />
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <Heros data={this.state[`heros${this.state.type}`]} />
                        </TabPanel>
                        <TabPanel>
                            <CareerBestView data={this.state[`careerBest${this.state.type}`]} />
                        </TabPanel>
                        <TabPanel>
                            <Achievements data={this.state.achievements.achievements} />
                        </TabPanel>
                    </Tabs>
                </div>
            );
        }
    }
});

module.exports = pro;

