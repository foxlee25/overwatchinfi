/**
 * Created by jinz2 on 7/31/16.
 */
var React = require('react');
var AjaxService = require('../service/AjaxService');
var Underscore= require('underscore');
var HeroCard = require('../views/HeroCard');
var AppStore = require('../flux/Store');
var url = '/hero/allheros';
var Highcharts = require('highcharts/highcharts.src');
require('highcharts/highcharts-more.src')(Highcharts);
// Load module after Highcharts is loaded
//require('highcharts/modules/exporting')(Highcharts);
// Create the chart

var HeroSkill = React.createClass({
    getInitialState: function(){
        return {
        };
    },
    render: function(){
        return (
            <div className = "container-fluid">
                <div id="heroSkillChart" className="row">
                </div>
            </div>
        );
    },
    componentDidMount: function(){
        alert('Hero id : '+ AppStore.getHeroId());
        Highcharts.chart('heroSkillChart', {

            chart: {
                polar: true,
                type: 'line'
            },

            title: {
                text: 'Budget vs spending',
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
                pointFormat: '<span style="color:{series.color}">{series.name}: <b>${point.y:,.0f}</b><br/>'
            },

            legend: {
                align: 'right',
                verticalAlign: 'top',
                y: 70,
                layout: 'vertical'
            },

            series: [{
                name: 'Allocated Budget',
                data: [43, 19, 60, 35, 17, 10],
                pointPlacement: 'on'
            }, {
                name: 'Actual Spending',
                data: [50, 39, 42, 31, 26, 14],
                pointPlacement: 'on'
            }]

        });
    }
});

module.exports = HeroSkill;