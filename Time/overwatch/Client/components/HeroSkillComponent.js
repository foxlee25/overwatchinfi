/**
 * Created by jinz2 on 7/31/16.
 */
var React = require('react');
var AjaxService = require('../service/AjaxService');
var Underscore= require('underscore');
var HeroCard = require('../views/HeroCard');
var AppStore = require('../flux/Store');
var Highcharts = require('highcharts/highcharts.src');
require('highcharts/highcharts-more.src')(Highcharts);
// Load module after Highcharts is loaded
//require('highcharts/modules/exporting')(Highcharts);
// Create the chart

var HeroSkill = React.createClass({
    getInitialState: function(){
        return {
            hero:null
        };
    },
    render: function(){
        return (
            <div className = "container-fluid">
        {this.state.hero?<img className="heroImg" src={this.state.hero.heroPortrait} />:<div></div>}
                <div id="heroSkillChart" className="row">
                </div>
            </div>
        );
    },
    componentDidMount: function(){
        var url = '/hero/getHeroDetail';
        var heroId = AppStore.getHeroId();
        AjaxService.post(url,{data : heroId},function(response){
            var hero = response.data;
            this.state.hero = hero;
            var pentacle = hero.pentacle;
            var ultimateCharge = pentacle.ultimateCharge;
            var difficulty = pentacle.difficulty;
            Highcharts.chart('heroSkillChart', {

                chart: {
                    polar: true,
                    type: 'line'
                },

                title: {
                    text: hero.heroName,
                    x: -80
                },

                pane: {
                    size: '80%'
                },

                xAxis: {
                    categories: ['Damage', 'Survival', 'Mobility', 'Special',
                        'Charge', 'Difficulty'],
                    tickmarkPlacement: 'on',
                    lineWidth: 0
                },

                yAxis: {
                    gridLineInterpolation: 'polygon',
                    lineWidth: 0,
                    min: 0
                },

                tooltip: {
                    shared: true,
                    pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}</b><br/>'
                },

                legend: {
                    align: 'right',
                    verticalAlign: 'top',
                    y: 70,
                    layout: 'vertical'
                },

                series: [{
                    name: 'Ability analysis',
                    data: [pentacle.damage, pentacle.survival, pentacle.mobility, pentacle.special, ultimateCharge, difficulty],
                    pointPlacement: 'on'
                }]

            });
            this.forceUpdate();
            
        }.bind(this));


    }
});

module.exports = HeroSkill;