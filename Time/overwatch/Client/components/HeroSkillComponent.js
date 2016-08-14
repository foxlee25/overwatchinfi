/**
 * Created by jinz2 on 7/31/16.
 */
var React = require('react');
var AjaxService = require('../service/AjaxService');
var Underscore= require('underscore');
var HeroNavCard = require('../views/HeroNavCard');
var AppStore = require('../flux/Store');
var Highcharts = require('highcharts/highcharts.src');
require('highcharts/highcharts-more.src')(Highcharts);
// Load module after Highcharts is loaded
//require('highcharts/modules/exporting')(Highcharts);
// Create the chart

var HeroSkill = React.createClass({
    getInitialState: function(){
        return {
            heroDetail:null,
            heros : null
        };
    },
    render: function(){
        return (
            <div className = "container-fluid">
        {this.state.heroDetail?<img className="heroImg col-md-6 col-sm-6 col-xs-12" src={this.state.heroDetail.heroPortrait} />:<div></div>}
                <div id="heroAbilityChart"  className="col-md-6 col-sm-6 col-xs-12 chartBlock">
                </div>
                <div id="heroWinRateChart"  className="col-md-5 col-sm-5 col-xs-12 chartBlock">
                </div>
            <div id="heroBasicChart"  className="col-md-5 col-sm-5 col-xs-12 chartBlock">
            </div>
                <div id="heroNavList">
                    {Underscore.map(this.state.heros, function(hero){
                        return(<HeroNavCard key={hero.key} hero={hero} />);
                    }.bind(this))}
                </div>
            </div>
        );
    },
    basicChart: function(){
        var basic = this.state.heroDetail.basic;
        Highcharts.chart('heroBasicChart', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Hero Basic'
            },
            xAxis: {
                categories: ['Health', 'Armor', 'Shield']
            },
            credits: {
                enabled: false
            },
            series: [{
                name: 'basic',
                data: [basic.health, basic.armor, basic.shield],
                color: '#f7a35c',
                lineColor: '#f7a35c'
            }]
        });
    },
    abilityChart : function(){
        var heroName = this.state.heroDetail.heroName;
        var pentacle = this.state.heroDetail.pentacle;
        pentacle.damage = pentacle.damage*2;
        pentacle.survival = pentacle.survival*2;
        pentacle.mobility = pentacle.mobility*2;
        pentacle.special = pentacle.special*2;
        var ultimateCharge = pentacle.ultimateCharge*2;
        var difficulty = pentacle.difficulty*2;
        Highcharts.chart('heroAbilityChart', {

            chart: {
                polar: true,
                type: 'line'
            },

            title: {
                text: heroName+ ' Ability',
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
                max: 6,
                lineWidth: 0,
                min: 0
            },

            tooltip: {
                shared: true,
                pointFormat: '',
                headerFormat: '<span style="color:{point.color}">\u25CF</span> {point.x}: <b>{point.y}</b>'
            },

            legend: {
                align: 'right',
                verticalAlign: 'top',
                y: 70,
                layout: 'vertical'
            },

            series: [{
                name: 'Ability Analysis',
                data: [pentacle.damage, pentacle.survival, pentacle.mobility, pentacle.special, ultimateCharge, difficulty],
                pointPlacement: 'on',
                color: '#f7a35c',
                lineColor: '#f7a35c'
            }]

        });
    },
    winRateChart: function(){
        var winRate = this.state.heroDetail.winRate;

        Highcharts.chart('heroWinRateChart', {
            chart: {
                type: 'areaspline'
            },
            title: {
                text: 'Win Rate % By Patch'
            },
            xAxis: {
                categories: ['1', '2', '3'],
                plotBands: [{ // visualize the weekend
                    from: 4.5,
                    to: 6.5,
                    color: 'rgba(68, 170, 213, .2)'
                }],
                title: {
                    text: 'Patch'
                }
            },
            yAxis: {
                max: 100,
                title: {
                    text: 'Percent'
                },

            },

            tooltip: {
                shared: true,
                valueSuffix: '%',
                headerFormat: '',
                pointFormat: '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y}</b>'
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                areaspline: {
                    fillOpacity: 0.5
                }
            },
            series: [{
                name: 'win rate',
                data: winRate,
                color: '#f7a35c',
                lineColor: '#f7a35c'
            }]
        });

    },
    componentDidMount: function(){
        var urlAllHeros = '/hero/allheros';
        AjaxService.get(urlAllHeros,function(response){
            this.state.heros = response.data;
            this.forceUpdate();
        }.bind(this));

        var url = '/hero/getHeroDetail';

        var heroId = window.sessionStorage.getItem('heroId');
        AjaxService.post(url,{data : heroId},function(response){
            var heroDetail = response.data;
            this.state.heroDetail = heroDetail;
            this.abilityChart();
            this.winRateChart();
            this.basicChart();
            this.forceUpdate();
            
        }.bind(this));


    }
});

module.exports = HeroSkill;