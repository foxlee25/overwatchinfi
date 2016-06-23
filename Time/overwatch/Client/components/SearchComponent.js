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
import { Router, Route, Link } from 'react-router'

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
        let battleTag = {
            battleTag: this.refs.search.value.replace("#","-"),
            region: this.refs.region.value,
            platform: this.refs.platform.value
        };
        AppAction.setBattleTag(battleTag);
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
                                     <span className="input-group-addon homeSearch" ><Link to={'/pro'}><span className="glyphicon glyphicon-search proSearchBTN" onClick={this.searchBox.bind(this)}></span></Link></span>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="subsearchDiv">
                                        <div className="searchRegion">
                                            <select ref="region" className="form-control">
                                            <option default value="us">US</option>
                                            <option value="eu">EU</option>
                                            </select>
                                        </div>
                                        <div className="searchPlatform">
                                             <select ref="platform" className="form-control">
                                            <option default value="pc">PC</option>
                                            <option value="xbl">Xbox</option>
                                            <option value="psn">Play Station</option>
                                             </select>
                                        </div>
                                    </div>
                                </div>
                        </div>
                        <div className="row search-sample">
                            <div className="col-lg-12 search-sample-title">What is OverWatchinfi?</div>
                            <div className="col-xs-12 col-sm-6 col-md-6 search-sample-block">
                                    <img className="search-sample-img"  src="./img/pro/pro_sample.png" />
                                     <div className="sample-text">Search personal statistics in OverWatch</div>
                            </div>

                            <div className="col-xs-12 col-sm-6 col-md-6 search-sample-block">
                                <img className="search-sample-img"  src="./img/pro/guide_sample.png" />
                                <div className="sample-text">Build your own guide</div>
                            </div>

                        </div>
                </div>
            );

    }
});


module.exports = Search;
