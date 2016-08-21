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
            heroCompares:null,
            heros : null
        };
    },
    render: function(){
        return (
            <div className = "container-fluid">
                <div className="row heroRow">
                    {this.state.heroDetail?<img className="heroImg col-md-5 col-sm-5 col-xs-12" src={this.state.heroDetail.heroPortrait} />:<div></div>}
                    <div id="heroAbilityChart"  className="col-md-5 col-sm-5 col-xs-12 chartBlock">
                    </div>
                </div>

                <div className="row heroRow">
                    <div id="heroSkillPieChart"  className="col-md-5 col-sm-5 col-xs-12 chartBlock">
                    </div>

                    <div id="heroBasicChart"  className="col-md-5 col-sm-5 col-xs-12 chartBlock">
                    </div>
                </div>

                <div className="row heroRow">
                    <div id="heroWinRateChart"  className="col-md-5 col-sm-5 col-xs-12 chartBlock">
                    </div>
                    <div id="heroWinRateQuickMatchChart"  className="col-md-5 col-sm-5 col-xs-12 chartBlock">
                    </div>

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
                width: 400,
                type: 'column'
            },
            title: {
                text: 'Basic Statistics'
            },
            xAxis: {
                categories: ['Health', 'Armor', 'Shield']
            },
            tooltip: {
                pointFormat: '',
                headerFormat: '<span style="color:{point.color}">\u25CF</span>  {point.x}: <b>{point.y}</b>'
            },
            credits: {
                enabled: false
            },

            series: [{
                name: 'Basic Statistics',
                data: [basic.health, basic.armor, basic.shield]
            }]
        });
    },
    abilityChart : function(){
        var heroName = this.state.heroDetail.heroName;
        var pentacle = this.state.heroDetail.pentacle;
        pentacle.damage = pentacle.damage*3;
        pentacle.survival = pentacle.survival*3;
        pentacle.mobility = pentacle.mobility*3;
        pentacle.special = pentacle.special*3;
        var ultimateCharge = pentacle.ultimateCharge*3;
        var difficulty = pentacle.difficulty*3;
        Highcharts.chart('heroAbilityChart', {
            credits: {
                enabled: false
            },
            chart: {
                polar: true,
                width: 450,
                type: 'line'
            },

            title: {
                text: heroName+ ' Ability',
                x: -60
            },

            pane: {
                size: '75%'
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
                min: 0,
                max: 10
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
                type: 'area',
                fillColor: 'rgba(173, 214, 245, 0.5)',

            }]

        });
    },
    winRateChart: function(){
        var winRateCompetitive = this.state.heroDetail.winRateCompetitive;
        var winRateQuick = this.state.heroDetail.winRateQuick;
        var patchName = this.state.heroDetail.patchName;
        Highcharts.chart('heroWinRateChart', {
            chart: {
                width: 400,
                type: 'areaspline'
            },
            title: {
                text: 'Win Rate / Competitive'
            },
            xAxis: {
                categories: patchName,
                title: {
                    text: 'Patch'
                }
            },
            yAxis: {
                max: 60,
                min:45,
                tickInterval: 5,
                title: {
                    text: 'Percent'
                }

            },

            tooltip: {
                shared: true,
                valueSuffix: '%',
                headerFormat: '',
                pointFormat: '<span style="color:{point.color}">\u25CF</span> win rate : <b>{point.y}</b>'
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
                name: 'Win Rate / Competitive',
                data: winRateCompetitive
            }]
        });

        Highcharts.chart('heroWinRateQuickMatchChart', {
            chart: {
                width: 400,
                type: 'areaspline'
            },
            title: {
                text: 'Win Rate / Quick Match'
            },
            xAxis: {
                categories: patchName,
                title: {
                    text: 'Patch'
                }
            },
            yAxis: {
                max: 60,
                min:45,
                tickInterval: 5,
                title: {
                    text: 'Percent'
                }

            },

            tooltip: {
                shared: true,
                valueSuffix: '%',
                headerFormat: '',
                pointFormat: '<span style="color:{point.color}">\u25CF</span> win rate : <b>{point.y}</b>'
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
                name: 'Win Rate / Quick Match',
                data: winRateQuick
            }]
        });

    },
    skillPieChart : function(){

        var heroSkillList = this.state.heroDetail.heroSkillList;
        var heroSkillValue = this.state.heroDetail.heroSkillValue;

        var heroSkillArr = [];
        heroSkillList.forEach(function(skill,index){
            var subSkillArr = [];
            subSkillArr.push(skill,heroSkillValue[index]);
            heroSkillArr.push(subSkillArr);
        });

        Highcharts.chart('heroSkillPieChart', {
            chart: {
                type: 'pie',
                options3d: {
                    enabled: true,
                    alpha: 45,
                    beta: 0
                }
            },
            title: {
                text: 'Skills frequency of use'
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    depth: 35,
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}'
                    }
                }
            },
            tooltip: {
                pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> {point.percentage:.1f}%</b>'
            },
            series: [{
                type: 'pie',
                name: 'frequency of use',
                data: heroSkillArr
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
            this.skillPieChart();
            this.forceUpdate();
            
        }.bind(this));


    }
});

module.exports = HeroSkill;