/**
 * Created by jinz2 on 6/5/16.
 */
var React = require('react');
var AjaxService = require('../service/AjaxService');
var Underscore = require('underscore');
var AppStore = require('../flux/Store.js');
var GuideCard = require('../views/GuideCard');
var properties = require('../i18/AppProps');
import { Router, Route, Link } from 'react-router'

var Guide = React.createClass({
    getInitialState: function(){
        return {
            guides: [],
            userId: null
        };
    },
    getGuides: function(){
        var url = '/guide/allGuides';
        AjaxService.post(url,{},function(response){
            this.state.guides = response.data;
            this.forceUpdate();
        }.bind(this));
    },
    componentWillMount: function(){
        //check if user is login
        this.state.userId = AppStore.getLoginData().userId;
    },
    componentDidMount: function(){
        this.getGuides();
    },
    render: function(){
        return (
            <div className="container-fluid">
              <div id="guideComponent" className="row">
                    {Underscore.map(this.state.guides, function(guide){
                        return(<GuideCard key={guide.createTime} guide={guide} />);
                    }.bind(this))}
              </div>
                {this.state.userId?
                    <div className="container-fluid">
                        <a><Link to={'/buildGuide'}><button className="btn btn-block btn-info">{properties.buildGuide}</button></Link></a>
                    </div>
                    :<div>
                        <span className="label label-info">{properties.loginToBuildGuid}</span>
                    </div>}
            </div>
        );
    }
});

module.exports = Guide;