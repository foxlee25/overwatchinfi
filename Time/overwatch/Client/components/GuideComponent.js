/**
 * Created by jinz2 on 6/5/16.
 */
var React = require('react');
var AjaxService = require('../service/AjaxService');
var Underscore = require('underscore');
var GuideCard = require('../views/GuideCard');

var Guide = React.createClass({
    getInitialState: function(){
        return {
            guides: []
        };
    },
    getGuides: function(){
        var url = '/guide/allGuides';
        AjaxService.post(url,{},function(response){
            this.state.guides = response.data;
            this.forceUpdate();
        }.bind(this));
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
            </div>
        );
    }
});

module.exports = Guide;