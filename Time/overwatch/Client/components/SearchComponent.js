/**
 * Created by jinz2 on 6/19/16.
 */
var React = require('react');
var properties = require('../i18/AppProps');
var AjaxService = require('../service/AjaxService');
var ProfileCard = require('../views/ProfileCard');
var AchievementCard = require('../views/AchievementCard');
var PlayedHeroCard = require('../views/PlayedHeroCard');
var LoadingView = require('../views/LoadingView');
var underscore = require('underscore');
var AppStore = require('../flux/Store');
var AppAction = require('../flux/Actions');
var async = require('async');
var $ = require('jquery');

var Search = React.createClass({
    getInitialState: function() {
        var userId = window.sessionStorage.getItem('userId');
       // var battleTag = JSON.parse(window.localStorage.getItem('battleTag'));
        var battleTag ='' ;
        window.localStorage.setItem('battleTag', '');
        return {info: null, userId: userId, searchError: false, battleTag: battleTag, gameData: null, loading: false};
    },
    componentWillMount: function(){
        if(this.state.battleTag) {
            if(AppStore.getProData().profile != null){
                this.state.gameData = AppStore.getProData();
            }else {
                this.search(this.state.battleTag.battleTag, this.state.battleTag.region, this.state.battleTag.platform);
            }
        }
    },
    componentDidMount: function(){
        $(window).on("load resize ", function() {
            var scrollWidth = $('.tbl-content').width() - $('.tbl-content table').width();
            $('.tbl-header').css({'padding-right':scrollWidth});
        }).resize();
    },
    searchBox: function(){
        this.search(this.refs.search.value.replace("#","-"), this.refs.region.value, this.refs.platform.value);
    },
    search: function(battleTag, region, platform){
        this.state.loading = true;
        this.state.searchError = false;
        this.forceUpdate();
        var battleTag = battleTag;
        var region = region;
        var platform = platform;
        var achievements = `https://api.lootbox.eu/${platform}/${region}/${battleTag}/achievements`;
        var allHero = `https://api.lootbox.eu/${platform}/${region}/${battleTag}/allHeroes/`;
        var heros = `https://api.lootbox.eu/${platform}/${region}/${battleTag}/heroes`;
        var profile = `https://api.lootbox.eu/${platform}/${region}/${battleTag}/profile`;

        async.parallel({
                achievements: (callback) => {
                AjaxService.get(achievements, (response) => {
                if(response instanceof Error){
            callback(response, null);
            return;
        }
        callback(null, response.data);
    });
    },
        allHero: (callback) => {
            AjaxService.get(allHero, (response) => {
                if(response instanceof Error){
                callback(response, null);
                return;
            }
            callback(null, response.data);
        });
        },
        heros: (callback) => {
            AjaxService.get(heros, (response) => {
                if(response instanceof Error){
                callback(response, null);
                return;
            }
            callback(null, response.data);
        });
        },
        profile: (callback) => {
            AjaxService.get(profile, (response) => {
                if(response instanceof Error){
                callback(response, null);
                return;
            }
            callback(null, response.data);
        });
        }}, (err, response) => {
            this.state.loading = false;

            if(err){
                this.state.searchError = true;
                AppAction.toast(properties.searchError);
                this.forceUpdate();
                return;
            }

            if(response.profile.error){
                AppAction.toast(properties.noMatchFound);
                this.forceUpdate();
                return;
            }

            let data = {
                battleTag: battleTag,
                region: region,
                platform: platform
            };
            this.state.gameData = response;
            this.state.battleTag = data;
            AppAction.setHeroData(response);
            this.forceUpdate();
            window.localStorage.setItem('battleTag', JSON.stringify(data));
        }
        );
    },
    render: function() {

                return (
                    <div className="container">
                        <div className="row pro-search">
                                <div className="col-lg-12">
                                    <div className="search-hero-icon">
                                             <img   src="./img/pro/tracer.svg" />
                                             <img   src="./img/pro/hanzo.svg" />
                                            <img   src="./img/pro/widowmaker.svg" />
                                    </div>
                                    <div className="input-group input-group-lg searchDiv">
                                     <input ref="search" type="text"  className="form-control" placeholder="Username" placeholder={properties.battleTag}/>
                                     <span className="input-group-addon homeSearch" ><span className="glyphicon glyphicon-search proSearchBTN" onClick={this.searchBox.bind(this)}></span></span>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="subsearchDiv">
                                        <div className="searchRegion">
                                            <select ref="region" className="form-control">
                                            <option default value="us">us</option>
                                            <option value="eu">eu</option>
                                            </select>
                                        </div>
                                        <div className="searchPlatform">
                                             <select ref="platform" className="form-control">
                                            <option default value="pc">pc</option>
                                            <option value="xbl">xbox</option>
                                            <option value="psn">play station</option>
                                             </select>
                                        </div>
                                    </div>
                                </div>
                        </div>
                        <div className="row search-sample">
                            <div className="col-lg-12 search-sample-title">What is OverwatchInfi</div>
                            <div className="col-xs-12 col-sm-6 col-md-6 search-sample-block">
                                    <img className="search-sample-img"  src="./img/pro/pro_sample.png" />
                                     <div className="sample-text">Searching personal statistics in overwatch</div>
                            </div>

                            <div className="col-xs-12 col-sm-6 col-md-6 search-sample-block">
                                <img className="search-sample-img"  src="./img/pro/guide_sample.png" />
                                <div className="sample-text">Building your own guide by choosing the map and heros</div>
                            </div>

                        </div>
                </div>
            );

    }
});


module.exports = Search;
