'use strict'
var xRay = require('x-ray');
var Worker = require('webworker-threads').Worker;
var fs = require('fs');

var xray = new xRay();
(function(){
    var url = 'https://playoverwatch.com/en-us/career/pc/us/foxlee-1405';
    var result = {};

    var swap = function(genre, name){
        result[genre].topHeros[name] = {};
        for(let i=0; i<data[genre].topHeros[name].heroName.length; i++){
            result[genre].topHeros[name][data[genre].topHeros[name].heroName[i]] = {};
            result[genre].topHeros[name][data[genre].topHeros[name].heroName[i]].img = data[genre].topHeros[name].heroImg[i];
            result[genre].topHeros[name][data[genre].topHeros[name].heroName[i]].desc = data[genre].topHeros[name].description[i];
        }
    }

    var swap1 = function(genre, name){
        result[genre].careerStats.allHeros[name] = {};
        for(let i=0; i<data[genre].careerStats.allHeros[name].name.length; i++){
            result[genre].careerStats.allHeros[name][data[genre].careerStats.allHeros[name].name[i]] = data[genre].careerStats.allHeros[name].value[i];
        }
    }

    var swap3 = function(genre){
        let nestSwap = function(heroName, index){
            for(let key = 0; key<data[genre].careerHeroStats.value[index].name.length; key++){
                result[genre].careerHeroStats[heroName][data[genre].careerHeroStats.value[index].name[key]] = {};
                for(let i=0; i<data[genre].careerHeroStats.value[index][key].name.length; i++){
                    result[genre].careerHeroStats[heroName][data[genre].careerHeroStats.value[index].name[key]][data[genre].careerHeroStats.value[index][key].name[i]] = data[genre].careerHeroStats.value[index][key].value[i];
                }
            }
        };

        for(let i=1; i<data[genre].careerHeroStats.name.length; i++){
            result[genre].careerHeroStats[data[genre].careerHeroStats.name[i]] = {};
            let heroName = data[genre].careerHeroStats.name[i];
            nestSwap(heroName, i);
        }
    }

    var swap2 = function(name){
        result.achievements[name] = {};
        for(let i=0; i<data.achievements[name].finished.name.length; i++){
            result.achievements[name][data.achievements[name].finished.name[i]] = {"finished": true};
            result.achievements[name][data.achievements[name].finished.name[i]].img = data.achievements[name].finished.img[i];
        }

        for(let i=0; i<data.achievements[name].notFinished.name.length; i++){
            result.achievements[name][data.achievements[name].notFinished.name[i]] = {"finished": false};
            result.achievements[name][data.achievements[name].notFinished.name[i]].img = data.achievements[name].notFinished.img[i];
        }
    }

    var playThread = new Worker(function() {

        var getQuickPlay = function (url) {
            console.log("get quick play");
            xray(url, {
                profileName: '.masthead-player h1',
                level: '.player-level .u-vertical-center',
                profile: '#overview-section .u-relative .row .masthead-player img@src',
                platform: '#profile-platforms a',
                gameWins: '.masthead-detail span',
                quickPlay: {
                    featuredStats: {
                        name: ['#quick-play .card-copy'],
                        value: ['#quick-play .card-heading']
                    },
                    topHeros: {
                        timePlayed: {
                            heroName: ['#quick-play section:nth-child(2) .row .progress-category:nth-child(4) .title'],
                            heroImg: ['#quick-play section:nth-child(2) .row .progress-category:nth-child(4) img@src'],
                            description: ['#quick-play section:nth-child(2) .row .progress-category:nth-child(4) .description']
                        },
                        gamesWon: {
                            heroName: ['#quick-play section:nth-child(2) .row .progress-category:nth-child(5) .title'],
                            heroImg: ['#quick-play section:nth-child(2) .row .progress-category:nth-child(5) img@src'],
                            description: ['#quick-play section:nth-child(2) .row .progress-category:nth-child(5) .description']
                        },
                        winPercentage: {
                            heroName: ['#quick-play section:nth-child(2) .row .progress-category:nth-child(6) .title'],
                            heroImg: ['#quick-play section:nth-child(2) .row .progress-category:nth-child(6) img@src'],
                            description: ['#quick-play section:nth-child(2) .row .progress-category:nth-child(6) .description']
                        },
                        weaponAccuracy: {
                            heroName: ['#quick-play section:nth-child(2) .row .progress-category:nth-child(7) .title'],
                            heroImg: ['#quick-play section:nth-child(2) .row .progress-category:nth-child(7) img@src'],
                            description: ['#quick-play section:nth-child(2) .row .progress-category:nth-child(7) .description']
                        },
                        eliminationPerlife: {
                            heroName: ['#quick-play section:nth-child(2) .row .progress-category:nth-child(8) .title'],
                            heroImg: ['#quick-play section:nth-child(2) .row .progress-category:nth-child(8) img@src'],
                            description: ['#quick-play section:nth-child(2) .row .progress-category:nth-child(8) .description']
                        },
                        killStreak: {
                            heroName: ['#quick-play section:nth-child(2) .row .progress-category:nth-child(9) .title'],
                            heroImg: ['#quick-play section:nth-child(2) .row .progress-category:nth-child(9) img@src'],
                            description: ['#quick-play section:nth-child(2) .row .progress-category:nth-child(9) .description']
                        },
                        multiKill: {
                            heroName: ['#quick-play section:nth-child(2) .row .progress-category:nth-child(10) .title'],
                            heroImg: ['#quick-play section:nth-child(2) .row .progress-category:nth-child(10) img@src'],
                            description: ['#quick-play section:nth-child(2) .row .progress-category:nth-child(10) .description']
                        },
                        objectiveKill: {
                            heroName: ['#quick-play section:nth-child(2) .row .progress-category:nth-child(11) .title'],
                            heroImg: ['#quick-play section:nth-child(2) .row .progress-category:nth-child(11) img@src'],
                            description: ['#quick-play section:nth-child(2) .row .progress-category:nth-child(11) .description']
                        }
                    },
                    careerStats: {
                        allHeros: {
                            combat: {
                                name: ['#quick-play section:nth-child(3) .row .row .js-stats:first-child .column:first-child table tbody tr td:first-child'],
                                value: ['#quick-play section:nth-child(3) .row .row .js-stats:first-child .column:first-child table tbody tr td:nth-child(2)']
                            },
                            assists: {
                                name: ['#quick-play .row .row .js-stats:first-child .column:nth-child(2) table tbody tr td:first-child'],
                                value: ['#quick-play .row .row .js-stats:first-child .column:nth-child(2) table tbody tr td:nth-child(2)']
                            },
                            best: {
                                name: ['#quick-play .row .row .js-stats:first-child .column:nth-child(3) table tbody tr td:first-child'],
                                value: ['#quick-play .row .row .js-stats:first-child .column:nth-child(3) table tbody tr td:nth-child(2)']
                            },
                            average: {
                                name: ['#quick-play .row .row .js-stats:first-child .column:nth-child(4) table tbody tr td:first-child'],
                                value: ['#quick-play .row .row .js-stats:first-child .column:nth-child(4) table tbody tr td:nth-child(2)']
                            },
                            deaths: {
                                name: ['#quick-play .row .row .js-stats:first-child .column:nth-child(5) table tbody tr td:first-child'],
                                value: ['#quick-play .row .row .js-stats:first-child .column:nth-child(5) table tbody tr td:nth-child(2)']
                            },
                            matchAwards: {
                                name: ['#quick-play .row .row .js-stats:first-child .column:nth-child(6) table tbody tr td:first-child'],
                                value: ['#quick-play .row .row .js-stats:first-child .column:nth-child(6) table tbody tr td:nth-child(2)']
                            },
                            game: {
                                name: ['#quick-play .row .row .js-stats:first-child .column:nth-child(7) table tbody tr td:first-child'],
                                value: ['#quick-play .row .row .js-stats:first-child .column:nth-child(7) table tbody tr td:nth-child(2)']
                            },
                            miscellaneous: {
                                name: ['#quick-play .row .row .js-stats:first-child .column:nth-child(8) table tbody tr td:first-child'],
                                value: ['#quick-play .row .row .js-stats:first-child .column:nth-child(8) table tbody tr td:nth-child(2)']
                            }
                        }
                    },
                    careerHeroStats: {
                        name: ['#quick-play section:nth-child(3) .row  select option'],
                        value: {
                            1: {
                                name: ['#quick-play .row .row .js-stats:nth-child(2) .column table thead tr th'],
                                0: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(2) .column:first-child table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(2) .column:first-child table tbody tr td:nth-child(2)']
                                },
                                1: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(2) .column:nth-child(2) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(2) .column:nth-child(2) table tbody tr td:nth-child(2)']
                                },
                                2: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(2) .column:nth-child(3) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(2) .column:nth-child(3) table tbody tr td:nth-child(2)']
                                },
                                3: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(2) .column:nth-child(4) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(2) .column:nth-child(4) table tbody tr td:nth-child(2)']
                                },
                                4: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(2) .column:nth-child(5) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(2) .column:nth-child(5) table tbody tr td:nth-child(2)']
                                },
                                5: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(2) .column:nth-child(6) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(2) .column:nth-child(6) table tbody tr td:nth-child(2)']
                                },
                                6: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(2) .column:nth-child(7) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(2) .column:nth-child(7) table tbody tr td:nth-child(2)']
                                },
                                7: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(2) .column:nth-child(8) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(2) .column:nth-child(8) table tbody tr td:nth-child(2)']
                                },
                                8: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(2) .column:nth-child(9) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(2) .column:nth-child(9) table tbody tr td:nth-child(2)']
                                },
                            },
                            2: {
                                name: ['#quick-play .row .row .js-stats:nth-child(3) .column table thead tr th'],
                                0: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(3) .column:first-child table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(3) .column:first-child table tbody tr td:nth-child(2)']
                                },
                                1: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(3) .column:nth-child(2) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(3) .column:nth-child(2) table tbody tr td:nth-child(2)']
                                },
                                2: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(3) .column:nth-child(3) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(3) .column:nth-child(3) table tbody tr td:nth-child(2)']
                                },
                                3: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(3) .column:nth-child(4) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(3) .column:nth-child(4) table tbody tr td:nth-child(2)']
                                },
                                4: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(3) .column:nth-child(5) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(3) .column:nth-child(5) table tbody tr td:nth-child(2)']
                                },
                                5: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(3) .column:nth-child(6) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(3) .column:nth-child(6) table tbody tr td:nth-child(2)']
                                },
                                6: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(3) .column:nth-child(7) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(3) .column:nth-child(7) table tbody tr td:nth-child(2)']
                                },
                                7: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(3) .column:nth-child(8) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(3) .column:nth-child(8) table tbody tr td:nth-child(2)']
                                },
                                8: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(3) .column:nth-child(9) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(3) .column:nth-child(9) table tbody tr td:nth-child(2)']
                                }
                            },
                            3: {
                                name: ['#quick-play .row .row .js-stats:nth-child(4) .column table thead tr th'],
                                0: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(4) .column:first-child table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(4) .column:first-child table tbody tr td:nth-child(2)']
                                },
                                1: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(4) .column:nth-child(2) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(4) .column:nth-child(2) table tbody tr td:nth-child(2)']
                                },
                                2: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(4) .column:nth-child(3) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(4) .column:nth-child(3) table tbody tr td:nth-child(2)']
                                },
                                3: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(4) .column:nth-child(4) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(4) .column:nth-child(4) table tbody tr td:nth-child(2)']
                                },
                                4: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(4) .column:nth-child(5) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(4) .column:nth-child(5) table tbody tr td:nth-child(2)']
                                },
                                5: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(4) .column:nth-child(6) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(4) .column:nth-child(6) table tbody tr td:nth-child(2)']
                                },
                                6: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(4) .column:nth-child(7) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(4) .column:nth-child(7) table tbody tr td:nth-child(2)']
                                },
                                7: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(4) .column:nth-child(8) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(4) .column:nth-child(8) table tbody tr td:nth-child(2)']
                                },
                                8: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(4) .column:nth-child(9) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(4) .column:nth-child(9) table tbody tr td:nth-child(2)']
                                }
                            },
                            4: {
                                name: ['#quick-play .row .row .js-stats:nth-child(5) .column table thead tr th'],
                                0: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(5) .column:first-child table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(5) .column:first-child table tbody tr td:nth-child(2)']
                                },
                                1: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(5) .column:nth-child(2) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(5) .column:nth-child(2) table tbody tr td:nth-child(2)']
                                },
                                2: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(5) .column:nth-child(3) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(5) .column:nth-child(3) table tbody tr td:nth-child(2)']
                                },
                                3: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(5) .column:nth-child(4) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(5) .column:nth-child(4) table tbody tr td:nth-child(2)']
                                },
                                4: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(5) .column:nth-child(5) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(5) .column:nth-child(5) table tbody tr td:nth-child(2)']
                                },
                                5: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(5) .column:nth-child(6) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(5) .column:nth-child(6) table tbody tr td:nth-child(2)']
                                },
                                6: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(5) .column:nth-child(7) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(5) .column:nth-child(7) table tbody tr td:nth-child(2)']
                                },
                                7: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(5) .column:nth-child(8) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(5) .column:nth-child(8) table tbody tr td:nth-child(2)']
                                },
                                8: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(5) .column:nth-child(9) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(5) .column:nth-child(9) table tbody tr td:nth-child(2)']
                                },
                            },
                            5: {
                                name: ['#quick-play .row .row .js-stats:nth-child(6) .column table thead tr th'],
                                0: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(6) .column:first-child table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(6) .column:first-child table tbody tr td:nth-child(2)']
                                },
                                1: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(6) .column:nth-child(2) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(6) .column:nth-child(2) table tbody tr td:nth-child(2)']
                                },
                                2: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(6) .column:nth-child(3) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(6) .column:nth-child(3) table tbody tr td:nth-child(2)']
                                },
                                3: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(6) .column:nth-child(4) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(6) .column:nth-child(4) table tbody tr td:nth-child(2)']
                                },
                                4: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(6) .column:nth-child(5) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(6) .column:nth-child(5) table tbody tr td:nth-child(2)']
                                },
                                5: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(6) .column:nth-child(6) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(6) .column:nth-child(6) table tbody tr td:nth-child(2)']
                                },
                                6: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(6) .column:nth-child(7) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(6) .column:nth-child(7) table tbody tr td:nth-child(2)']
                                },
                                7: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(6) .column:nth-child(8) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(6) .column:nth-child(8) table tbody tr td:nth-child(2)']
                                },
                                8: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(6) .column:nth-child(9) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(6) .column:nth-child(9) table tbody tr td:nth-child(2)']
                                }
                            },
                            6: {
                                name: ['#quick-play .row .row .js-stats:nth-child(7) .column table thead tr th'],
                                0: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(7) .column:first-child table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(7) .column:first-child table tbody tr td:nth-child(2)']
                                },
                                1: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(7) .column:nth-child(2) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(7) .column:nth-child(2) table tbody tr td:nth-child(2)']
                                },
                                2: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(7) .column:nth-child(3) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(7) .column:nth-child(3) table tbody tr td:nth-child(2)']
                                },
                                3: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(7) .column:nth-child(4) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(7) .column:nth-child(4) table tbody tr td:nth-child(2)']
                                },
                                4: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(7) .column:nth-child(5) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(7) .column:nth-child(5) table tbody tr td:nth-child(2)']
                                },
                                5: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(7) .column:nth-child(6) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(7) .column:nth-child(6) table tbody tr td:nth-child(2)']
                                },
                                6: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(7) .column:nth-child(7) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(7) .column:nth-child(7) table tbody tr td:nth-child(2)']
                                },
                                7: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(7) .column:nth-child(8) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(7) .column:nth-child(8) table tbody tr td:nth-child(2)']
                                },
                                8: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(7) .column:nth-child(9) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(7) .column:nth-child(9) table tbody tr td:nth-child(2)']
                                }
                            },
                            7: {
                                name: ['#quick-play .row .row .js-stats:nth-child(8) .column table thead tr th'],
                                0: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(8) .column:first-child table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(8) .column:first-child table tbody tr td:nth-child(2)']
                                },
                                1: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(8) .column:nth-child(2) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(8) .column:nth-child(2) table tbody tr td:nth-child(2)']
                                },
                                2: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(8) .column:nth-child(3) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(8) .column:nth-child(3) table tbody tr td:nth-child(2)']
                                },
                                3: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(8) .column:nth-child(4) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(8) .column:nth-child(4) table tbody tr td:nth-child(2)']
                                },
                                4: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(8) .column:nth-child(5) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(8) .column:nth-child(5) table tbody tr td:nth-child(2)']
                                },
                                5: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(8) .column:nth-child(6) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(8) .column:nth-child(6) table tbody tr td:nth-child(2)']
                                },
                                6: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(8) .column:nth-child(7) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(8) .column:nth-child(7) table tbody tr td:nth-child(2)']
                                },
                                7: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(8) .column:nth-child(8) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(8) .column:nth-child(8) table tbody tr td:nth-child(2)']
                                },
                                8: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(8) .column:nth-child(9) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(8) .column:nth-child(9) table tbody tr td:nth-child(2)']
                                }
                            },
                            8: {
                                name: ['#quick-play .row .row .js-stats:nth-child(9) .column table thead tr th'],
                                0: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(9) .column:first-child table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(9) .column:first-child table tbody tr td:nth-child(2)']
                                },
                                1: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(9) .column:nth-child(2) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(9) .column:nth-child(2) table tbody tr td:nth-child(2)']
                                },
                                2: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(9) .column:nth-child(3) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(9) .column:nth-child(3) table tbody tr td:nth-child(2)']
                                },
                                3: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(9) .column:nth-child(4) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(9) .column:nth-child(4) table tbody tr td:nth-child(2)']
                                },
                                4: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(9) .column:nth-child(5) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(9) .column:nth-child(5) table tbody tr td:nth-child(2)']
                                },
                                5: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(9) .column:nth-child(6) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(9) .column:nth-child(6) table tbody tr td:nth-child(2)']
                                },
                                6: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(9) .column:nth-child(7) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(9) .column:nth-child(7) table tbody tr td:nth-child(2)']
                                },
                                7: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(9) .column:nth-child(8) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(9) .column:nth-child(8) table tbody tr td:nth-child(2)']
                                },
                                8: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(9) .column:nth-child(9) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(9) .column:nth-child(9) table tbody tr td:nth-child(2)']
                                }
                            },
                            9: {
                                name: ['#quick-play .row .row .js-stats:nth-child(10) .column table thead tr th'],
                                0: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(10) .column:first-child table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(10) .column:first-child table tbody tr td:nth-child(2)']
                                },
                                1: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(10) .column:nth-child(2) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(10) .column:nth-child(2) table tbody tr td:nth-child(2)']
                                },
                                2: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(10) .column:nth-child(3) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(10) .column:nth-child(3) table tbody tr td:nth-child(2)']
                                },
                                3: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(10) .column:nth-child(4) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(10) .column:nth-child(4) table tbody tr td:nth-child(2)']
                                },
                                4: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(10) .column:nth-child(5) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(10) .column:nth-child(5) table tbody tr td:nth-child(2)']
                                },
                                5: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(10) .column:nth-child(6) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(10) .column:nth-child(6) table tbody tr td:nth-child(2)']
                                },
                                6: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(10) .column:nth-child(7) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(10) .column:nth-child(7) table tbody tr td:nth-child(2)']
                                },
                                7: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(10) .column:nth-child(8) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(10) .column:nth-child(8) table tbody tr td:nth-child(2)']
                                },
                                8: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(10) .column:nth-child(9) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(10) .column:nth-child(9) table tbody tr td:nth-child(2)']
                                }
                            },
                            10: {
                                name: ['#quick-play .row .row .js-stats:nth-child(11) .column table thead tr th'],
                                0: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(11) .column:first-child table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(11) .column:first-child table tbody tr td:nth-child(2)']
                                },
                                1: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(11) .column:nth-child(2) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(11) .column:nth-child(2) table tbody tr td:nth-child(2)']
                                },
                                2: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(11) .column:nth-child(3) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(11) .column:nth-child(3) table tbody tr td:nth-child(2)']
                                },
                                3: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(11) .column:nth-child(4) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(11) .column:nth-child(4) table tbody tr td:nth-child(2)']
                                },
                                4: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(11) .column:nth-child(5) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(11) .column:nth-child(5) table tbody tr td:nth-child(2)']
                                },
                                5: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(11) .column:nth-child(6) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(11) .column:nth-child(6) table tbody tr td:nth-child(2)']
                                },
                                6: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(11) .column:nth-child(7) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(11) .column:nth-child(7) table tbody tr td:nth-child(2)']
                                },
                                7: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(11) .column:nth-child(8) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(11) .column:nth-child(8) table tbody tr td:nth-child(2)']
                                },
                                8: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(11) .column:nth-child(9) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(11) .column:nth-child(9) table tbody tr td:nth-child(2)']
                                }
                            },
                            11: {
                                name: ['#quick-play .row .row .js-stats:nth-child(12) .column table thead tr th'],
                                0: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(12) .column:first-child table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(12) .column:first-child table tbody tr td:nth-child(2)']
                                },
                                1: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(12) .column:nth-child(2) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(12) .column:nth-child(2) table tbody tr td:nth-child(2)']
                                },
                                2: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(12) .column:nth-child(3) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(12) .column:nth-child(3) table tbody tr td:nth-child(2)']
                                },
                                3: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(12) .column:nth-child(4) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(12) .column:nth-child(4) table tbody tr td:nth-child(2)']
                                },
                                4: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(12) .column:nth-child(5) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(12) .column:nth-child(5) table tbody tr td:nth-child(2)']
                                },
                                5: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(12) .column:nth-child(6) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(12) .column:nth-child(6) table tbody tr td:nth-child(2)']
                                },
                                6: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(12) .column:nth-child(7) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(12) .column:nth-child(7) table tbody tr td:nth-child(2)']
                                },
                                7: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(12) .column:nth-child(8) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(12) .column:nth-child(8) table tbody tr td:nth-child(2)']
                                },
                                8: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(12) .column:nth-child(8) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(12) .column:nth-child(8) table tbody tr td:nth-child(2)']
                                }
                            },
                            12: {
                                name: ['#quick-play .row .row .js-stats:nth-child(13) .column table thead tr th'],
                                0: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(13) .column:first-child table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(13) .column:first-child table tbody tr td:nth-child(2)']
                                },
                                1: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(13) .column:nth-child(2) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(13) .column:nth-child(2) table tbody tr td:nth-child(2)']
                                },
                                2: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(13) .column:nth-child(3) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(13) .column:nth-child(3) table tbody tr td:nth-child(2)']
                                },
                                3: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(13) .column:nth-child(4) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(13) .column:nth-child(4) table tbody tr td:nth-child(2)']
                                },
                                4: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(13) .column:nth-child(5) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(13) .column:nth-child(5) table tbody tr td:nth-child(2)']
                                },
                                5: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(13) .column:nth-child(6) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(13) .column:nth-child(6) table tbody tr td:nth-child(2)']
                                },
                                6: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(13) .column:nth-child(7) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(13) .column:nth-child(7) table tbody tr td:nth-child(2)']
                                },
                                7: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(13) .column:nth-child(8) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(13) .column:nth-child(8) table tbody tr td:nth-child(2)']
                                },
                                8: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(13) .column:nth-child(9) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(13) .column:nth-child(9) table tbody tr td:nth-child(2)']
                                }
                            },
                            13: {
                                name: ['#quick-play .row .row .js-stats:nth-child(14) .column table thead tr th'],
                                0: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(14) .column:first-child table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(14) .column:first-child table tbody tr td:nth-child(2)']
                                },
                                1: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(14) .column:nth-child(2) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(14) .column:nth-child(2) table tbody tr td:nth-child(2)']
                                },
                                2: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(14) .column:nth-child(3) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(14) .column:nth-child(3) table tbody tr td:nth-child(2)']
                                },
                                3: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(14) .column:nth-child(4) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(14) .column:nth-child(4) table tbody tr td:nth-child(2)']
                                },
                                4: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(14) .column:nth-child(5) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(14) .column:nth-child(5) table tbody tr td:nth-child(2)']
                                },
                                5: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(14) .column:nth-child(6) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(14) .column:nth-child(6) table tbody tr td:nth-child(2)']
                                },
                                6: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(14) .column:nth-child(7) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(14) .column:nth-child(7) table tbody tr td:nth-child(2)']
                                },
                                7: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(14) .column:nth-child(8) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(14) .column:nth-child(8) table tbody tr td:nth-child(2)']
                                },
                                8: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(14) .column:nth-child(8) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(14) .column:nth-child(8) table tbody tr td:nth-child(2)']
                                }
                            },
                            14: {
                                name: ['#quick-play .row .row .js-stats:nth-child(15) .column table thead tr th'],
                                0: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(15) .column:first-child table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(15) .column:first-child table tbody tr td:nth-child(2)']
                                },
                                1: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(15) .column:nth-child(2) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(15) .column:nth-child(2) table tbody tr td:nth-child(2)']
                                },
                                2: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(15) .column:nth-child(3) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(15) .column:nth-child(3) table tbody tr td:nth-child(2)']
                                },
                                3: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(15) .column:nth-child(4) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(15) .column:nth-child(4) table tbody tr td:nth-child(2)']
                                },
                                4: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(15) .column:nth-child(5) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(15) .column:nth-child(5) table tbody tr td:nth-child(2)']
                                },
                                5: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(15) .column:nth-child(6) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(15) .column:nth-child(6) table tbody tr td:nth-child(2)']
                                },
                                6: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(15) .column:nth-child(7) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(15) .column:nth-child(7) table tbody tr td:nth-child(2)']
                                },
                                7: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(15) .column:nth-child(8) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(15) .column:nth-child(8) table tbody tr td:nth-child(2)']
                                },
                                8: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(15) .column:nth-child(9) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(15) .column:nth-child(9) table tbody tr td:nth-child(2)']
                                }
                            },
                            15: {
                                name: ['#quick-play .row .row .js-stats:nth-child(16) .column table thead tr th'],
                                0: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(16) .column:first-child table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(16) .column:first-child table tbody tr td:nth-child(2)']
                                },
                                1: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(16) .column:nth-child(2) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(16) .column:nth-child(2) table tbody tr td:nth-child(2)']
                                },
                                2: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(16) .column:nth-child(3) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(16) .column:nth-child(3) table tbody tr td:nth-child(2)']
                                },
                                3: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(16) .column:nth-child(4) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(16) .column:nth-child(4) table tbody tr td:nth-child(2)']
                                },
                                4: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(16) .column:nth-child(5) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(16) .column:nth-child(5) table tbody tr td:nth-child(2)']
                                },
                                5: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(16) .column:nth-child(6) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(16) .column:nth-child(6) table tbody tr td:nth-child(2)']
                                },
                                6: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(16) .column:nth-child(7) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(16) .column:nth-child(7) table tbody tr td:nth-child(2)']
                                },
                                7: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(16) .column:nth-child(8) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(16) .column:nth-child(8) table tbody tr td:nth-child(2)']
                                },
                                8: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(16) .column:nth-child(9) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(16) .column:nth-child(9) table tbody tr td:nth-child(2)']
                                }
                            },
                            16: {
                                name: ['#quick-play .row .row .js-stats:nth-child(17) .column table thead tr th'],
                                0: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(17) .column:first-child table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(17) .column:first-child table tbody tr td:nth-child(2)']
                                },
                                1: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(17) .column:nth-child(2) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(17) .column:nth-child(2) table tbody tr td:nth-child(2)']
                                },
                                2: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(17) .column:nth-child(3) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(17) .column:nth-child(3) table tbody tr td:nth-child(2)']
                                },
                                3: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(17) .column:nth-child(4) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(17) .column:nth-child(4) table tbody tr td:nth-child(2)']
                                },
                                4: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(17) .column:nth-child(5) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(17) .column:nth-child(5) table tbody tr td:nth-child(2)']
                                },
                                5: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(17) .column:nth-child(6) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(17) .column:nth-child(6) table tbody tr td:nth-child(2)']
                                },
                                6: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(17) .column:nth-child(7) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(17) .column:nth-child(7) table tbody tr td:nth-child(2)']
                                },
                                7: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(17) .column:nth-child(8) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(17) .column:nth-child(8) table tbody tr td:nth-child(2)']
                                },
                                8: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(17) .column:nth-child(9) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(17) .column:nth-child(9) table tbody tr td:nth-child(2)']
                                }
                            },
                            17: {
                                name: ['#quick-play .row .row .js-stats:nth-child(18) .column table thead tr th'],
                                0: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(18) .column:first-child table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(18) .column:first-child table tbody tr td:nth-child(2)']
                                },
                                1: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(18) .column:nth-child(2) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(18) .column:nth-child(2) table tbody tr td:nth-child(2)']
                                },
                                2: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(18) .column:nth-child(3) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(18) .column:nth-child(3) table tbody tr td:nth-child(2)']
                                },
                                3: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(18) .column:nth-child(4) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(18) .column:nth-child(4) table tbody tr td:nth-child(2)']
                                },
                                4: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(18) .column:nth-child(5) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(18) .column:nth-child(5) table tbody tr td:nth-child(2)']
                                },
                                5: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(18) .column:nth-child(6) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(18) .column:nth-child(6) table tbody tr td:nth-child(2)']
                                },
                                6: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(18) .column:nth-child(7) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(18) .column:nth-child(7) table tbody tr td:nth-child(2)']
                                },
                                7: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(18) .column:nth-child(8) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(18) .column:nth-child(8) table tbody tr td:nth-child(2)']
                                },
                                8: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(18) .column:nth-child(9) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(18) .column:nth-child(9) table tbody tr td:nth-child(2)']
                                }
                            },
                            18: {
                                name: ['#quick-play .row .row .js-stats:nth-child(19) .column table thead tr th'],
                                0: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(19) .column:first-child table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(19) .column:first-child table tbody tr td:nth-child(2)']
                                },
                                1: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(19) .column:nth-child(2) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(19) .column:nth-child(2) table tbody tr td:nth-child(2)']
                                },
                                2: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(19) .column:nth-child(3) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(19) .column:nth-child(3) table tbody tr td:nth-child(2)']
                                },
                                3: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(19) .column:nth-child(4) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(19) .column:nth-child(4) table tbody tr td:nth-child(2)']
                                },
                                4: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(19) .column:nth-child(5) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(19) .column:nth-child(5) table tbody tr td:nth-child(2)']
                                },
                                5: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(19) .column:nth-child(6) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(19) .column:nth-child(6) table tbody tr td:nth-child(2)']
                                },
                                6: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(19) .column:nth-child(7) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(19) .column:nth-child(7) table tbody tr td:nth-child(2)']
                                },
                                7: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(19) .column:nth-child(8) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(19) .column:nth-child(8) table tbody tr td:nth-child(2)']
                                },
                                8: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(19) .column:nth-child(9) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(19) .column:nth-child(9) table tbody tr td:nth-child(2)']
                                }
                            },
                            19: {
                                name: ['#quick-play .row .row .js-stats:nth-child(20) .column table thead tr th'],
                                0: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(20) .column:first-child table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(20) .column:first-child table tbody tr td:nth-child(2)']
                                },
                                1: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(20) .column:nth-child(2) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(20) .column:nth-child(2) table tbody tr td:nth-child(2)']
                                },
                                2: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(20) .column:nth-child(3) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(20) .column:nth-child(3) table tbody tr td:nth-child(2)']
                                },
                                3: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(20) .column:nth-child(4) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(20) .column:nth-child(4) table tbody tr td:nth-child(2)']
                                },
                                4: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(20) .column:nth-child(5) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(20) .column:nth-child(5) table tbody tr td:nth-child(2)']
                                },
                                5: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(20) .column:nth-child(6) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(20) .column:nth-child(6) table tbody tr td:nth-child(2)']
                                },
                                6: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(20) .column:nth-child(7) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(20) .column:nth-child(7) table tbody tr td:nth-child(2)']
                                },
                                7: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(20) .column:nth-child(8) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(20) .column:nth-child(8) table tbody tr td:nth-child(2)']
                                },
                                8: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(20) .column:nth-child(9) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(20) .column:nth-child(9) table tbody tr td:nth-child(2)']
                                }
                            },
                            20: {
                                name: ['#quick-play .row .row .js-stats:nth-child(21) .column table thead tr th'],
                                0: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(21) .column:first-child table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(21) .column:first-child table tbody tr td:nth-child(2)']
                                },
                                1: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(21) .column:nth-child(2) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(21) .column:nth-child(2) table tbody tr td:nth-child(2)']
                                },
                                2: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(21) .column:nth-child(3) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(21) .column:nth-child(3) table tbody tr td:nth-child(2)']
                                },
                                3: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(21) .column:nth-child(4) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(21) .column:nth-child(4) table tbody tr td:nth-child(2)']
                                },
                                4: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(21) .column:nth-child(5) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(21) .column:nth-child(5) table tbody tr td:nth-child(2)']
                                },
                                5: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(21) .column:nth-child(6) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(21) .column:nth-child(6) table tbody tr td:nth-child(2)']
                                },
                                6: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(21) .column:nth-child(7) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(21) .column:nth-child(7) table tbody tr td:nth-child(2)']
                                },
                                7: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(21) .column:nth-child(8) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(21) .column:nth-child(8) table tbody tr td:nth-child(2)']
                                },
                                8: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(21) .column:nth-child(9) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(21) .column:nth-child(9) table tbody tr td:nth-child(2)']
                                }
                            },
                            21: {
                                name: ['#quick-play .row .row .js-stats:nth-child(22) .column table thead tr th'],
                                0: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(22) .column:first-child table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(22) .column:first-child table tbody tr td:nth-child(2)']
                                },
                                1: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(22) .column:nth-child(2) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(22) .column:nth-child(2) table tbody tr td:nth-child(2)']
                                },
                                2: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(22) .column:nth-child(3) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(22) .column:nth-child(3) table tbody tr td:nth-child(2)']
                                },
                                3: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(22) .column:nth-child(4) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(22) .column:nth-child(4) table tbody tr td:nth-child(2)']
                                },
                                4: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(22) .column:nth-child(5) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(22) .column:nth-child(5) table tbody tr td:nth-child(2)']
                                },
                                5: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(22) .column:nth-child(6) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(22) .column:nth-child(6) table tbody tr td:nth-child(2)']
                                },
                                6: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(22) .column:nth-child(7) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(22) .column:nth-child(7) table tbody tr td:nth-child(2)']
                                },
                                7: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(22) .column:nth-child(8) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(22) .column:nth-child(8) table tbody tr td:nth-child(2)']
                                },
                                8: {
                                    name: ['#quick-play .row .row .js-stats:nth-child(22) .column:nth-child(9) table tbody tr td:first-child'],
                                    value: ['#quick-play .row .row .js-stats:nth-child(22) .column:nth-child(9) table tbody tr td:nth-child(2)']
                                }
                            },
                        }

                    }
                },
                achievements: {
                    general: {
                        finished: {
                            name: ['#achievements-section .row .toggle-display:nth-child(4) .m-hoverable .content'],
                            img: ['#achievements-section .row .toggle-display:nth-child(4) .m-hoverable img@src']
                        },
                        notFinished: {
                            name: ['#achievements-section .row .toggle-display:nth-child(4) .m-disabled .content'],
                            img: ['#achievements-section .row .toggle-display:nth-child(4) .m-disabled img@src']
                        }
                    },
                    offense: {
                        finished: {
                            name: ['#achievements-section .row .toggle-display:nth-child(5) .m-hoverable .content'],
                            img: ['#achievements-section .row .toggle-display:nth-child(5) .m-hoverable img@src'],
                        },
                        notFinished: {
                            name: ['#achievements-section .row .toggle-display:nth-child(5) .m-disabled .content'],
                            img: ['#achievements-section .row .toggle-display:nth-child(5) .m-disabled img@src']
                        }
                    },
                    deffense: {
                        finished: {
                            name: ['#achievements-section .row .toggle-display:nth-child(6) .m-hoverable .content'],
                            img: ['#achievements-section .row .toggle-display:nth-child(6) .m-hoverable img@src'],
                        },
                        notFinished: {
                            name: ['#achievements-section .row .toggle-display:nth-child(6) .m-disabled .content'],
                            img: ['#achievements-section .row .toggle-display:nth-child(6) .m-disabled img@src']
                        }
                    },
                    tank: {
                        finished: {
                            name: ['#achievements-section .row .toggle-display:nth-child(7) .m-hoverable .content'],
                            img: ['#achievements-section .row .toggle-display:nth-child(7) .m-hoverable img@src'],
                        },
                        notFinished: {
                            name: ['#achievements-section .row .toggle-display:nth-child(7) .m-disabled .content'],
                            img: ['#achievements-section .row .toggle-display:nth-child(7) .m-disabled img@src']
                        }
                    },
                    support: {
                        finished: {
                            name: ['#achievements-section .row .toggle-display:nth-child(8) .m-hoverable .content'],
                            img: ['#achievements-section .row .toggle-display:nth-child(8) .m-hoverable img@src'],
                        },
                        notFinished: {
                            name: ['#achievements-section .row .toggle-display:nth-child(8) .m-disabled .content'],
                            img: ['#achievements-section .row .toggle-display:nth-child(8) .m-disabled img@src']
                        }
                    },
                    map: {
                        finished: {
                            name: ['#achievements-section .row .toggle-display:nth-child(9) .m-hoverable .content'],
                            img: ['#achievements-section .row .toggle-display:nth-child(9) .m-hoverable img@src'],
                        },
                        notFinished: {
                            name: ['#achievements-section .row .toggle-display:nth-child(9) .m-disabled .content'],
                            img: ['#achievements-section .row .toggle-display:nth-child(9) .m-disabled img@src']
                        }
                    }
                }
            })(function (err, data) {
                console.log(err);
                result.profileName = data.profileName;
                result.level = data.level;
                result.profile = data.profile;
                result.gameWins = data.gameWins;
                result.quickPlay = {};
                result.quickPlay.featuredStats = {};

                for (let i = 0; i < data.quickPlay.featuredStats.name.length; i++) {
                    result.quickPlay.featuredStats[data.quickPlay.featuredStats.name[i]] = data.quickPlay.featuredStats.value[i];
                }

                result.quickPlay.topHeros = {};

                swap("quickPlay", "timePlayed");
                swap("quickPlay", "gamesWon");
                swap("quickPlay", "winPercentage");
                swap("quickPlay", "weaponAccuracy");
                swap("quickPlay", "eliminationPerlife");
                swap("quickPlay", "killStreak");
                swap("quickPlay", "multiKill");
                swap("quickPlay", "objectiveKill");

                result.quickPlay.careerStats = {"allHeros": {}};

                swap1("quickPlay", "combat");
                swap1("quickPlay", "assists");
                swap1("quickPlay", "best");
                swap1("quickPlay", "average");
                swap1("quickPlay", "deaths");
                swap1("quickPlay", "matchAwards");
                swap1("quickPlay", "game");
                swap1("quickPlay", "miscellaneous");

                result.quickPlay.careerHeroStats = {};

                swap3("quickPlay");

                result.achievements = {};

                swap2("general");
                swap2("offense");
                swap2("deffense");
                swap2("tank");
                swap2("support");
                swap2("map");

                console.log(result);

                return;
            });
        }
        postMessage("dasdas");

        this.onmessage = function(event) {
            debugger;
            console.log(event.data);
            postMessage(getQuickPlay(event.data));
        }
    });


    var competitiveThread = new Worker(function() {

        var getCompetitivePlay = function(url) {
            xray(url, {
                competitivePlay: {
                    featuredStats: {
                        name: ['#competitive-play .card-copy'],
                        value: ['#competitive-play .card-heading']
                    },
                    topHeros: {
                        timePlayed: {
                            heroName: ['#competitive-play section:nth-child(2) .row .progress-category:nth-child(4) .title'],
                            heroImg: ['#competitive-play section:nth-child(2) .row .progress-category:nth-child(4) img@src'],
                            description: ['#competitive-play section:nth-child(2) .row .progress-category:nth-child(4) .description']
                        },
                        gamesWon: {
                            heroName: ['#competitive-play section:nth-child(2) .row .progress-category:nth-child(5) .title'],
                            heroImg: ['#competitive-play section:nth-child(2) .row .progress-category:nth-child(5) img@src'],
                            description: ['#competitive-play section:nth-child(2) .row .progress-category:nth-child(5) .description']
                        },
                        winPercentage: {
                            heroName: ['#competitive-play section:nth-child(2) .row .progress-category:nth-child(6) .title'],
                            heroImg: ['#competitive-play section:nth-child(2) .row .progress-category:nth-child(6) img@src'],
                            description: ['#competitive-play section:nth-child(2) .row .progress-category:nth-child(6) .description']
                        },
                        weaponAccuracy: {
                            heroName: ['#competitive-play section:nth-child(2) .row .progress-category:nth-child(7) .title'],
                            heroImg: ['#competitive-play section:nth-child(2) .row .progress-category:nth-child(7) img@src'],
                            description: ['#competitive-play section:nth-child(2) .row .progress-category:nth-child(7) .description']
                        },
                        eliminationPerlife: {
                            heroName: ['#competitive-play section:nth-child(2) .row .progress-category:nth-child(8) .title'],
                            heroImg: ['#competitive-play section:nth-child(2) .row .progress-category:nth-child(8) img@src'],
                            description: ['#competitive-play section:nth-child(2) .row .progress-category:nth-child(8) .description']
                        },
                        killStreak: {
                            heroName: ['#competitive-play section:nth-child(2) .row .progress-category:nth-child(9) .title'],
                            heroImg: ['#competitive-play section:nth-child(2) .row .progress-category:nth-child(9) img@src'],
                            description: ['#competitive-play section:nth-child(2) .row .progress-category:nth-child(9) .description']
                        },
                        multiKill: {
                            heroName: ['#competitive-play section:nth-child(2) .row .progress-category:nth-child(10) .title'],
                            heroImg: ['#competitive-play section:nth-child(2) .row .progress-category:nth-child(10) img@src'],
                            description: ['#competitive-play section:nth-child(2) .row .progress-category:nth-child(10) .description']
                        },
                        objectiveKill: {
                            heroName: ['#competitive-play section:nth-child(2) .row .progress-category:nth-child(11) .title'],
                            heroImg: ['#competitive-play section:nth-child(2) .row .progress-category:nth-child(11) img@src'],
                            description: ['#competitive-play section:nth-child(2) .row .progress-category:nth-child(11) .description']
                        }
                    },
                    careerStats: {
                        allHeros: {
                            combat: {
                                name: ['#competitive-play section:nth-child(3) .row .row .js-stats:first-child .column:first-child table tbody tr td:first-child'],
                                value: ['#competitive-play section:nth-child(3) .row .row .js-stats:first-child .column:first-child table tbody tr td:nth-child(2)']
                            },
                            assists: {
                                name: ['#competitive-play .row .row .js-stats:first-child .column:nth-child(2) table tbody tr td:first-child'],
                                value: ['#competitive-play .row .row .js-stats:first-child .column:nth-child(2) table tbody tr td:nth-child(2)']
                            },
                            best: {
                                name: ['#competitive-play .row .row .js-stats:first-child .column:nth-child(3) table tbody tr td:first-child'],
                                value: ['#competitive-play .row .row .js-stats:first-child .column:nth-child(3) table tbody tr td:nth-child(2)']
                            },
                            average: {
                                name: ['#competitive-play .row .row .js-stats:first-child .column:nth-child(4) table tbody tr td:first-child'],
                                value: ['#competitive-play .row .row .js-stats:first-child .column:nth-child(4) table tbody tr td:nth-child(2)']
                            },
                            deaths: {
                                name: ['#competitive-play .row .row .js-stats:first-child .column:nth-child(5) table tbody tr td:first-child'],
                                value: ['#competitive-play .row .row .js-stats:first-child .column:nth-child(5) table tbody tr td:nth-child(2)']
                            },
                            matchAwards: {
                                name: ['#competitive-play .row .row .js-stats:first-child .column:nth-child(6) table tbody tr td:first-child'],
                                value: ['#competitive-play .row .row .js-stats:first-child .column:nth-child(6) table tbody tr td:nth-child(2)']
                            },
                            game: {
                                name: ['#competitive-play .row .row .js-stats:first-child .column:nth-child(7) table tbody tr td:first-child'],
                                value: ['#competitive-play .row .row .js-stats:first-child .column:nth-child(7) table tbody tr td:nth-child(2)']
                            },
                            miscellaneous: {
                                name: ['#competitive-play .row .row .js-stats:first-child .column:nth-child(8) table tbody tr td:first-child'],
                                value: ['#competitive-play .row .row .js-stats:first-child .column:nth-child(8) table tbody tr td:nth-child(2)']
                            }
                        }
                    },
                    careerHeroStats: {
                        name: ['#competitive-play section:nth-child(3) .row  select option'],
                        value: {
                            1: {
                                name: ['#competitive-play .row .row .js-stats:nth-child(2) .column table thead tr th'],
                                0: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(2) .column:first-child table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(2) .column:first-child table tbody tr td:nth-child(2)']
                                },
                                1: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(2) .column:nth-child(2) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(2) .column:nth-child(2) table tbody tr td:nth-child(2)']
                                },
                                2: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(2) .column:nth-child(3) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(2) .column:nth-child(3) table tbody tr td:nth-child(2)']
                                },
                                3: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(2) .column:nth-child(4) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(2) .column:nth-child(4) table tbody tr td:nth-child(2)']
                                },
                                4: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(2) .column:nth-child(5) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(2) .column:nth-child(5) table tbody tr td:nth-child(2)']
                                },
                                5: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(2) .column:nth-child(6) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(2) .column:nth-child(6) table tbody tr td:nth-child(2)']
                                },
                                6: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(2) .column:nth-child(7) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(2) .column:nth-child(7) table tbody tr td:nth-child(2)']
                                },
                                7: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(2) .column:nth-child(8) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(2) .column:nth-child(8) table tbody tr td:nth-child(2)']
                                },
                                8: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(2) .column:nth-child(9) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(2) .column:nth-child(9) table tbody tr td:nth-child(2)']
                                },
                            },
                            2: {
                                name: ['#competitive-play .row .row .js-stats:nth-child(3) .column table thead tr th'],
                                0: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(3) .column:first-child table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(3) .column:first-child table tbody tr td:nth-child(2)']
                                },
                                1: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(3) .column:nth-child(2) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(3) .column:nth-child(2) table tbody tr td:nth-child(2)']
                                },
                                2: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(3) .column:nth-child(3) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(3) .column:nth-child(3) table tbody tr td:nth-child(2)']
                                },
                                3: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(3) .column:nth-child(4) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(3) .column:nth-child(4) table tbody tr td:nth-child(2)']
                                },
                                4: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(3) .column:nth-child(5) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(3) .column:nth-child(5) table tbody tr td:nth-child(2)']
                                },
                                5: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(3) .column:nth-child(6) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(3) .column:nth-child(6) table tbody tr td:nth-child(2)']
                                },
                                6: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(3) .column:nth-child(7) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(3) .column:nth-child(7) table tbody tr td:nth-child(2)']
                                },
                                7: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(3) .column:nth-child(8) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(3) .column:nth-child(8) table tbody tr td:nth-child(2)']
                                },
                                8: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(3) .column:nth-child(9) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(3) .column:nth-child(9) table tbody tr td:nth-child(2)']
                                }
                            },
                            3: {
                                name: ['#competitive-play .row .row .js-stats:nth-child(4) .column table thead tr th'],
                                0: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(4) .column:first-child table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(4) .column:first-child table tbody tr td:nth-child(2)']
                                },
                                1: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(4) .column:nth-child(2) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(4) .column:nth-child(2) table tbody tr td:nth-child(2)']
                                },
                                2: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(4) .column:nth-child(3) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(4) .column:nth-child(3) table tbody tr td:nth-child(2)']
                                },
                                3: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(4) .column:nth-child(4) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(4) .column:nth-child(4) table tbody tr td:nth-child(2)']
                                },
                                4: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(4) .column:nth-child(5) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(4) .column:nth-child(5) table tbody tr td:nth-child(2)']
                                },
                                5: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(4) .column:nth-child(6) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(4) .column:nth-child(6) table tbody tr td:nth-child(2)']
                                },
                                6: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(4) .column:nth-child(7) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(4) .column:nth-child(7) table tbody tr td:nth-child(2)']
                                },
                                7: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(4) .column:nth-child(8) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(4) .column:nth-child(8) table tbody tr td:nth-child(2)']
                                },
                                8: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(4) .column:nth-child(9) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(4) .column:nth-child(9) table tbody tr td:nth-child(2)']
                                }
                            },
                            4: {
                                name: ['#competitive-play .row .row .js-stats:nth-child(5) .column table thead tr th'],
                                0: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(5) .column:first-child table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(5) .column:first-child table tbody tr td:nth-child(2)']
                                },
                                1: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(5) .column:nth-child(2) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(5) .column:nth-child(2) table tbody tr td:nth-child(2)']
                                },
                                2: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(5) .column:nth-child(3) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(5) .column:nth-child(3) table tbody tr td:nth-child(2)']
                                },
                                3: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(5) .column:nth-child(4) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(5) .column:nth-child(4) table tbody tr td:nth-child(2)']
                                },
                                4: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(5) .column:nth-child(5) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(5) .column:nth-child(5) table tbody tr td:nth-child(2)']
                                },
                                5: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(5) .column:nth-child(6) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(5) .column:nth-child(6) table tbody tr td:nth-child(2)']
                                },
                                6: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(5) .column:nth-child(7) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(5) .column:nth-child(7) table tbody tr td:nth-child(2)']
                                },
                                7: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(5) .column:nth-child(8) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(5) .column:nth-child(8) table tbody tr td:nth-child(2)']
                                },
                                8: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(5) .column:nth-child(9) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(5) .column:nth-child(9) table tbody tr td:nth-child(2)']
                                },
                            },
                            5: {
                                name: ['#competitive-play .row .row .js-stats:nth-child(6) .column table thead tr th'],
                                0: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(6) .column:first-child table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(6) .column:first-child table tbody tr td:nth-child(2)']
                                },
                                1: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(6) .column:nth-child(2) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(6) .column:nth-child(2) table tbody tr td:nth-child(2)']
                                },
                                2: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(6) .column:nth-child(3) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(6) .column:nth-child(3) table tbody tr td:nth-child(2)']
                                },
                                3: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(6) .column:nth-child(4) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(6) .column:nth-child(4) table tbody tr td:nth-child(2)']
                                },
                                4: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(6) .column:nth-child(5) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(6) .column:nth-child(5) table tbody tr td:nth-child(2)']
                                },
                                5: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(6) .column:nth-child(6) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(6) .column:nth-child(6) table tbody tr td:nth-child(2)']
                                },
                                6: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(6) .column:nth-child(7) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(6) .column:nth-child(7) table tbody tr td:nth-child(2)']
                                },
                                7: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(6) .column:nth-child(8) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(6) .column:nth-child(8) table tbody tr td:nth-child(2)']
                                },
                                8: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(6) .column:nth-child(9) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(6) .column:nth-child(9) table tbody tr td:nth-child(2)']
                                }
                            },
                            6: {
                                name: ['#competitive-play .row .row .js-stats:nth-child(7) .column table thead tr th'],
                                0: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(7) .column:first-child table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(7) .column:first-child table tbody tr td:nth-child(2)']
                                },
                                1: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(7) .column:nth-child(2) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(7) .column:nth-child(2) table tbody tr td:nth-child(2)']
                                },
                                2: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(7) .column:nth-child(3) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(7) .column:nth-child(3) table tbody tr td:nth-child(2)']
                                },
                                3: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(7) .column:nth-child(4) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(7) .column:nth-child(4) table tbody tr td:nth-child(2)']
                                },
                                4: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(7) .column:nth-child(5) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(7) .column:nth-child(5) table tbody tr td:nth-child(2)']
                                },
                                5: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(7) .column:nth-child(6) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(7) .column:nth-child(6) table tbody tr td:nth-child(2)']
                                },
                                6: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(7) .column:nth-child(7) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(7) .column:nth-child(7) table tbody tr td:nth-child(2)']
                                },
                                7: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(7) .column:nth-child(8) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(7) .column:nth-child(8) table tbody tr td:nth-child(2)']
                                },
                                8: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(7) .column:nth-child(9) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(7) .column:nth-child(9) table tbody tr td:nth-child(2)']
                                }
                            },
                            7: {
                                name: ['#competitive-play .row .row .js-stats:nth-child(8) .column table thead tr th'],
                                0: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(8) .column:first-child table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(8) .column:first-child table tbody tr td:nth-child(2)']
                                },
                                1: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(8) .column:nth-child(2) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(8) .column:nth-child(2) table tbody tr td:nth-child(2)']
                                },
                                2: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(8) .column:nth-child(3) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(8) .column:nth-child(3) table tbody tr td:nth-child(2)']
                                },
                                3: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(8) .column:nth-child(4) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(8) .column:nth-child(4) table tbody tr td:nth-child(2)']
                                },
                                4: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(8) .column:nth-child(5) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(8) .column:nth-child(5) table tbody tr td:nth-child(2)']
                                },
                                5: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(8) .column:nth-child(6) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(8) .column:nth-child(6) table tbody tr td:nth-child(2)']
                                },
                                6: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(8) .column:nth-child(7) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(8) .column:nth-child(7) table tbody tr td:nth-child(2)']
                                },
                                7: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(8) .column:nth-child(8) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(8) .column:nth-child(8) table tbody tr td:nth-child(2)']
                                },
                                8: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(8) .column:nth-child(9) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(8) .column:nth-child(9) table tbody tr td:nth-child(2)']
                                }
                            },
                            8: {
                                name: ['#competitive-play .row .row .js-stats:nth-child(9) .column table thead tr th'],
                                0: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(9) .column:first-child table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(9) .column:first-child table tbody tr td:nth-child(2)']
                                },
                                1: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(9) .column:nth-child(2) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(9) .column:nth-child(2) table tbody tr td:nth-child(2)']
                                },
                                2: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(9) .column:nth-child(3) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(9) .column:nth-child(3) table tbody tr td:nth-child(2)']
                                },
                                3: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(9) .column:nth-child(4) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(9) .column:nth-child(4) table tbody tr td:nth-child(2)']
                                },
                                4: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(9) .column:nth-child(5) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(9) .column:nth-child(5) table tbody tr td:nth-child(2)']
                                },
                                5: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(9) .column:nth-child(6) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(9) .column:nth-child(6) table tbody tr td:nth-child(2)']
                                },
                                6: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(9) .column:nth-child(7) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(9) .column:nth-child(7) table tbody tr td:nth-child(2)']
                                },
                                7: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(9) .column:nth-child(8) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(9) .column:nth-child(8) table tbody tr td:nth-child(2)']
                                },
                                8: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(9) .column:nth-child(9) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(9) .column:nth-child(9) table tbody tr td:nth-child(2)']
                                }
                            },
                            9: {
                                name: ['#competitive-play .row .row .js-stats:nth-child(10) .column table thead tr th'],
                                0: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(10) .column:first-child table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(10) .column:first-child table tbody tr td:nth-child(2)']
                                },
                                1: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(10) .column:nth-child(2) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(10) .column:nth-child(2) table tbody tr td:nth-child(2)']
                                },
                                2: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(10) .column:nth-child(3) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(10) .column:nth-child(3) table tbody tr td:nth-child(2)']
                                },
                                3: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(10) .column:nth-child(4) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(10) .column:nth-child(4) table tbody tr td:nth-child(2)']
                                },
                                4: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(10) .column:nth-child(5) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(10) .column:nth-child(5) table tbody tr td:nth-child(2)']
                                },
                                5: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(10) .column:nth-child(6) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(10) .column:nth-child(6) table tbody tr td:nth-child(2)']
                                },
                                6: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(10) .column:nth-child(7) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(10) .column:nth-child(7) table tbody tr td:nth-child(2)']
                                },
                                7: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(10) .column:nth-child(8) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(10) .column:nth-child(8) table tbody tr td:nth-child(2)']
                                },
                                8: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(10) .column:nth-child(9) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(10) .column:nth-child(9) table tbody tr td:nth-child(2)']
                                }
                            },
                            10: {
                                name: ['#competitive-play .row .row .js-stats:nth-child(11) .column table thead tr th'],
                                0: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(11) .column:first-child table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(11) .column:first-child table tbody tr td:nth-child(2)']
                                },
                                1: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(11) .column:nth-child(2) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(11) .column:nth-child(2) table tbody tr td:nth-child(2)']
                                },
                                2: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(11) .column:nth-child(3) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(11) .column:nth-child(3) table tbody tr td:nth-child(2)']
                                },
                                3: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(11) .column:nth-child(4) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(11) .column:nth-child(4) table tbody tr td:nth-child(2)']
                                },
                                4: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(11) .column:nth-child(5) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(11) .column:nth-child(5) table tbody tr td:nth-child(2)']
                                },
                                5: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(11) .column:nth-child(6) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(11) .column:nth-child(6) table tbody tr td:nth-child(2)']
                                },
                                6: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(11) .column:nth-child(7) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(11) .column:nth-child(7) table tbody tr td:nth-child(2)']
                                },
                                7: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(11) .column:nth-child(8) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(11) .column:nth-child(8) table tbody tr td:nth-child(2)']
                                },
                                8: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(11) .column:nth-child(9) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(11) .column:nth-child(9) table tbody tr td:nth-child(2)']
                                }
                            },
                            11: {
                                name: ['#competitive-play .row .row .js-stats:nth-child(12) .column table thead tr th'],
                                0: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(12) .column:first-child table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(12) .column:first-child table tbody tr td:nth-child(2)']
                                },
                                1: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(12) .column:nth-child(2) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(12) .column:nth-child(2) table tbody tr td:nth-child(2)']
                                },
                                2: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(12) .column:nth-child(3) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(12) .column:nth-child(3) table tbody tr td:nth-child(2)']
                                },
                                3: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(12) .column:nth-child(4) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(12) .column:nth-child(4) table tbody tr td:nth-child(2)']
                                },
                                4: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(12) .column:nth-child(5) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(12) .column:nth-child(5) table tbody tr td:nth-child(2)']
                                },
                                5: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(12) .column:nth-child(6) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(12) .column:nth-child(6) table tbody tr td:nth-child(2)']
                                },
                                6: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(12) .column:nth-child(7) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(12) .column:nth-child(7) table tbody tr td:nth-child(2)']
                                },
                                7: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(12) .column:nth-child(8) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(12) .column:nth-child(8) table tbody tr td:nth-child(2)']
                                },
                                8: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(12) .column:nth-child(8) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(12) .column:nth-child(8) table tbody tr td:nth-child(2)']
                                }
                            },
                            12: {
                                name: ['#competitive-play .row .row .js-stats:nth-child(13) .column table thead tr th'],
                                0: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(13) .column:first-child table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(13) .column:first-child table tbody tr td:nth-child(2)']
                                },
                                1: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(13) .column:nth-child(2) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(13) .column:nth-child(2) table tbody tr td:nth-child(2)']
                                },
                                2: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(13) .column:nth-child(3) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(13) .column:nth-child(3) table tbody tr td:nth-child(2)']
                                },
                                3: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(13) .column:nth-child(4) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(13) .column:nth-child(4) table tbody tr td:nth-child(2)']
                                },
                                4: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(13) .column:nth-child(5) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(13) .column:nth-child(5) table tbody tr td:nth-child(2)']
                                },
                                5: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(13) .column:nth-child(6) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(13) .column:nth-child(6) table tbody tr td:nth-child(2)']
                                },
                                6: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(13) .column:nth-child(7) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(13) .column:nth-child(7) table tbody tr td:nth-child(2)']
                                },
                                7: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(13) .column:nth-child(8) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(13) .column:nth-child(8) table tbody tr td:nth-child(2)']
                                },
                                8: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(13) .column:nth-child(9) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(13) .column:nth-child(9) table tbody tr td:nth-child(2)']
                                }
                            },
                            13: {
                                name: ['#competitive-play .row .row .js-stats:nth-child(14) .column table thead tr th'],
                                0: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(14) .column:first-child table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(14) .column:first-child table tbody tr td:nth-child(2)']
                                },
                                1: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(14) .column:nth-child(2) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(14) .column:nth-child(2) table tbody tr td:nth-child(2)']
                                },
                                2: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(14) .column:nth-child(3) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(14) .column:nth-child(3) table tbody tr td:nth-child(2)']
                                },
                                3: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(14) .column:nth-child(4) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(14) .column:nth-child(4) table tbody tr td:nth-child(2)']
                                },
                                4: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(14) .column:nth-child(5) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(14) .column:nth-child(5) table tbody tr td:nth-child(2)']
                                },
                                5: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(14) .column:nth-child(6) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(14) .column:nth-child(6) table tbody tr td:nth-child(2)']
                                },
                                6: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(14) .column:nth-child(7) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(14) .column:nth-child(7) table tbody tr td:nth-child(2)']
                                },
                                7: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(14) .column:nth-child(8) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(14) .column:nth-child(8) table tbody tr td:nth-child(2)']
                                },
                                8: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(14) .column:nth-child(8) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(14) .column:nth-child(8) table tbody tr td:nth-child(2)']
                                }
                            },
                            14: {
                                name: ['#competitive-play .row .row .js-stats:nth-child(15) .column table thead tr th'],
                                0: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(15) .column:first-child table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(15) .column:first-child table tbody tr td:nth-child(2)']
                                },
                                1: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(15) .column:nth-child(2) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(15) .column:nth-child(2) table tbody tr td:nth-child(2)']
                                },
                                2: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(15) .column:nth-child(3) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(15) .column:nth-child(3) table tbody tr td:nth-child(2)']
                                },
                                3: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(15) .column:nth-child(4) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(15) .column:nth-child(4) table tbody tr td:nth-child(2)']
                                },
                                4: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(15) .column:nth-child(5) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(15) .column:nth-child(5) table tbody tr td:nth-child(2)']
                                },
                                5: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(15) .column:nth-child(6) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(15) .column:nth-child(6) table tbody tr td:nth-child(2)']
                                },
                                6: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(15) .column:nth-child(7) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(15) .column:nth-child(7) table tbody tr td:nth-child(2)']
                                },
                                7: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(15) .column:nth-child(8) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(15) .column:nth-child(8) table tbody tr td:nth-child(2)']
                                },
                                8: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(15) .column:nth-child(9) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(15) .column:nth-child(9) table tbody tr td:nth-child(2)']
                                }
                            },
                            15: {
                                name: ['#competitive-play .row .row .js-stats:nth-child(16) .column table thead tr th'],
                                0: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(16) .column:first-child table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(16) .column:first-child table tbody tr td:nth-child(2)']
                                },
                                1: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(16) .column:nth-child(2) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(16) .column:nth-child(2) table tbody tr td:nth-child(2)']
                                },
                                2: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(16) .column:nth-child(3) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(16) .column:nth-child(3) table tbody tr td:nth-child(2)']
                                },
                                3: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(16) .column:nth-child(4) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(16) .column:nth-child(4) table tbody tr td:nth-child(2)']
                                },
                                4: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(16) .column:nth-child(5) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(16) .column:nth-child(5) table tbody tr td:nth-child(2)']
                                },
                                5: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(16) .column:nth-child(6) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(16) .column:nth-child(6) table tbody tr td:nth-child(2)']
                                },
                                6: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(16) .column:nth-child(7) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(16) .column:nth-child(7) table tbody tr td:nth-child(2)']
                                },
                                7: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(16) .column:nth-child(8) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(16) .column:nth-child(8) table tbody tr td:nth-child(2)']
                                },
                                8: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(16) .column:nth-child(9) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(16) .column:nth-child(9) table tbody tr td:nth-child(2)']
                                }
                            },
                            16: {
                                name: ['#competitive-play .row .row .js-stats:nth-child(17) .column table thead tr th'],
                                0: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(17) .column:first-child table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(17) .column:first-child table tbody tr td:nth-child(2)']
                                },
                                1: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(17) .column:nth-child(2) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(17) .column:nth-child(2) table tbody tr td:nth-child(2)']
                                },
                                2: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(17) .column:nth-child(3) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(17) .column:nth-child(3) table tbody tr td:nth-child(2)']
                                },
                                3: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(17) .column:nth-child(4) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(17) .column:nth-child(4) table tbody tr td:nth-child(2)']
                                },
                                4: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(17) .column:nth-child(5) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(17) .column:nth-child(5) table tbody tr td:nth-child(2)']
                                },
                                5: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(17) .column:nth-child(6) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(17) .column:nth-child(6) table tbody tr td:nth-child(2)']
                                },
                                6: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(17) .column:nth-child(7) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(17) .column:nth-child(7) table tbody tr td:nth-child(2)']
                                },
                                7: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(17) .column:nth-child(8) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(17) .column:nth-child(8) table tbody tr td:nth-child(2)']
                                },
                                8: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(17) .column:nth-child(9) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(17) .column:nth-child(9) table tbody tr td:nth-child(2)']
                                }
                            },
                            17: {
                                name: ['#competitive-play .row .row .js-stats:nth-child(18) .column table thead tr th'],
                                0: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(18) .column:first-child table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(18) .column:first-child table tbody tr td:nth-child(2)']
                                },
                                1: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(18) .column:nth-child(2) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(18) .column:nth-child(2) table tbody tr td:nth-child(2)']
                                },
                                2: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(18) .column:nth-child(3) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(18) .column:nth-child(3) table tbody tr td:nth-child(2)']
                                },
                                3: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(18) .column:nth-child(4) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(18) .column:nth-child(4) table tbody tr td:nth-child(2)']
                                },
                                4: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(18) .column:nth-child(5) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(18) .column:nth-child(5) table tbody tr td:nth-child(2)']
                                },
                                5: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(18) .column:nth-child(6) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(18) .column:nth-child(6) table tbody tr td:nth-child(2)']
                                },
                                6: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(18) .column:nth-child(7) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(18) .column:nth-child(7) table tbody tr td:nth-child(2)']
                                },
                                7: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(18) .column:nth-child(8) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(18) .column:nth-child(8) table tbody tr td:nth-child(2)']
                                },
                                8: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(18) .column:nth-child(9) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(18) .column:nth-child(9) table tbody tr td:nth-child(2)']
                                }
                            },
                            18: {
                                name: ['#competitive-play .row .row .js-stats:nth-child(19) .column table thead tr th'],
                                0: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(19) .column:first-child table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(19) .column:first-child table tbody tr td:nth-child(2)']
                                },
                                1: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(19) .column:nth-child(2) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(19) .column:nth-child(2) table tbody tr td:nth-child(2)']
                                },
                                2: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(19) .column:nth-child(3) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(19) .column:nth-child(3) table tbody tr td:nth-child(2)']
                                },
                                3: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(19) .column:nth-child(4) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(19) .column:nth-child(4) table tbody tr td:nth-child(2)']
                                },
                                4: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(19) .column:nth-child(5) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(19) .column:nth-child(5) table tbody tr td:nth-child(2)']
                                },
                                5: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(19) .column:nth-child(6) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(19) .column:nth-child(6) table tbody tr td:nth-child(2)']
                                },
                                6: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(19) .column:nth-child(7) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(19) .column:nth-child(7) table tbody tr td:nth-child(2)']
                                },
                                7: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(19) .column:nth-child(8) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(19) .column:nth-child(8) table tbody tr td:nth-child(2)']
                                },
                                8: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(19) .column:nth-child(9) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(19) .column:nth-child(9) table tbody tr td:nth-child(2)']
                                }
                            },
                            19: {
                                name: ['#competitive-play .row .row .js-stats:nth-child(20) .column table thead tr th'],
                                0: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(20) .column:first-child table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(20) .column:first-child table tbody tr td:nth-child(2)']
                                },
                                1: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(20) .column:nth-child(2) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(20) .column:nth-child(2) table tbody tr td:nth-child(2)']
                                },
                                2: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(20) .column:nth-child(3) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(20) .column:nth-child(3) table tbody tr td:nth-child(2)']
                                },
                                3: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(20) .column:nth-child(4) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(20) .column:nth-child(4) table tbody tr td:nth-child(2)']
                                },
                                4: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(20) .column:nth-child(5) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(20) .column:nth-child(5) table tbody tr td:nth-child(2)']
                                },
                                5: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(20) .column:nth-child(6) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(20) .column:nth-child(6) table tbody tr td:nth-child(2)']
                                },
                                6: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(20) .column:nth-child(7) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(20) .column:nth-child(7) table tbody tr td:nth-child(2)']
                                },
                                7: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(20) .column:nth-child(8) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(20) .column:nth-child(8) table tbody tr td:nth-child(2)']
                                },
                                8: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(20) .column:nth-child(9) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(20) .column:nth-child(9) table tbody tr td:nth-child(2)']
                                }
                            },
                            20: {
                                name: ['#competitive-play .row .row .js-stats:nth-child(21) .column table thead tr th'],
                                0: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(21) .column:first-child table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(21) .column:first-child table tbody tr td:nth-child(2)']
                                },
                                1: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(21) .column:nth-child(2) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(21) .column:nth-child(2) table tbody tr td:nth-child(2)']
                                },
                                2: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(21) .column:nth-child(3) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(21) .column:nth-child(3) table tbody tr td:nth-child(2)']
                                },
                                3: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(21) .column:nth-child(4) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(21) .column:nth-child(4) table tbody tr td:nth-child(2)']
                                },
                                4: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(21) .column:nth-child(5) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(21) .column:nth-child(5) table tbody tr td:nth-child(2)']
                                },
                                5: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(21) .column:nth-child(6) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(21) .column:nth-child(6) table tbody tr td:nth-child(2)']
                                },
                                6: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(21) .column:nth-child(7) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(21) .column:nth-child(7) table tbody tr td:nth-child(2)']
                                },
                                7: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(21) .column:nth-child(8) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(21) .column:nth-child(8) table tbody tr td:nth-child(2)']
                                },
                                8: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(21) .column:nth-child(9) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(21) .column:nth-child(9) table tbody tr td:nth-child(2)']
                                }
                            },
                            21: {
                                name: ['#competitive-play .row .row .js-stats:nth-child(22) .column table thead tr th'],
                                0: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(22) .column:first-child table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(22) .column:first-child table tbody tr td:nth-child(2)']
                                },
                                1: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(22) .column:nth-child(2) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(22) .column:nth-child(2) table tbody tr td:nth-child(2)']
                                },
                                2: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(22) .column:nth-child(3) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(22) .column:nth-child(3) table tbody tr td:nth-child(2)']
                                },
                                3: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(22) .column:nth-child(4) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(22) .column:nth-child(4) table tbody tr td:nth-child(2)']
                                },
                                4: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(22) .column:nth-child(5) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(22) .column:nth-child(5) table tbody tr td:nth-child(2)']
                                },
                                5: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(22) .column:nth-child(6) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(22) .column:nth-child(6) table tbody tr td:nth-child(2)']
                                },
                                6: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(22) .column:nth-child(7) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(22) .column:nth-child(7) table tbody tr td:nth-child(2)']
                                },
                                7: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(22) .column:nth-child(8) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(22) .column:nth-child(8) table tbody tr td:nth-child(2)']
                                },
                                8: {
                                    name: ['#competitive-play .row .row .js-stats:nth-child(22) .column:nth-child(9) table tbody tr td:first-child'],
                                    value: ['#competitive-play .row .row .js-stats:nth-child(22) .column:nth-child(9) table tbody tr td:nth-child(2)']
                                }
                            },
                        }

                    }
                }
            })(function (err, competitivePlay) {
                console.log(err);
                if (err) {
                    return;
                }
                data.competitivePlay = competitivePlay.competitivePlay;

                result.competitivePlay = {};
                result.competitivePlay.featuredStats = {};

                console.log(data);
                for (let i = 0; i < data.competitivePlay.featuredStats.name.length; i++) {
                    result.competitivePlay.featuredStats[data.competitivePlay.featuredStats.name[i]] = data.competitivePlay.featuredStats.value[i];
                }

                result.competitivePlay.topHeros = {};

                swap("competitivePlay", "timePlayed");
                swap("competitivePlay", "gamesWon");
                swap("competitivePlay", "winPercentage");
                swap("competitivePlay", "weaponAccuracy");
                swap("competitivePlay", "eliminationPerlife");
                swap("competitivePlay", "killStreak");
                swap("competitivePlay", "multiKill");
                swap("competitivePlay", "objectiveKill");

                result.competitivePlay.careerStats = {"allHeros": {}};

                swap1("competitivePlay", "combat");
                swap1("competitivePlay", "assists");
                swap1("competitivePlay", "best");
                swap1("competitivePlay", "average");
                swap1("competitivePlay", "deaths");
                swap1("competitivePlay", "matchAwards");
                swap1("competitivePlay", "game");
                swap1("competitivePlay", "miscellaneous");

                result.competitivePlay.careerHeroStats = {};

                swap3("competitivePlay");
                return;
            });
        }


        this.onmessage = function(event) {
            postMessage(getCompetitivePlay(event.data));
        }
    });


    xray(url, {
        competitivePlay: {
            noData: '#competitive-play section:first-child .row ul:nth-child(3) h6'
        }
    })(function(err, competitiveData){
        if(!competitiveData.competitivePlay.noData){
            playThread.postMessage(url);
            competitiveThread.postMessage(url);
            var playData = null;
            var competitiveData = null;

            playThread.onmessage = function (event) {
                playData = event.data;
                if(competitiveData){
                    fs.writeFile('../Json/blizzard.json', JSON.stringify(result));
                }
            }
            
            competitiveThread.onmessage = function (event) {
                competitiveData = event.data;
                if(playData){
                    fs.writeFile('../Json/blizzard.json', JSON.stringify(result));
                }
            }
        }else{
            console.log("no data");
            console.log(playThread);
            playThread.postMessage(url);
            
            playThread.onmessage = function (event) {
                console.log(event.data);
                fs.writeFile('../Json/blizzard.json', JSON.stringify(result));
            }
        }
    });
})();

