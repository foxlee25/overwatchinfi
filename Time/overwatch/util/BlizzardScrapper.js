'use strict'
var xRay = require('x-ray');

var xray = new xRay();

var scrapper = {
    getBattleTagMainData: function(resolve, reject, region, platform, battleTag){
        var url = 'https://playoverwatch.com/en-us/career/'+platform+'/'+region+'/'+battleTag;
        xray(url, {
            profileName: '.masthead-player h1',
            level: '.player-level .u-vertical-center',
            platform: '#profile-platforms a',
            gameWins: '.masthead-detail span',
            featuredStats: {
                name: ['#highlights-section .card-copy'],
                value: ['#highlights-section .card-heading']
            },
            topHeros: {
                timePlayed: {
                    heroName: ['#top-heroes-section .row .progress-category:nth-child(4) .title'],
                    heroImg: ['#top-heroes-section .row .progress-category:nth-child(4) img@src'],
                    description: ['#top-heroes-section .row .progress-category:nth-child(4) .description']
                },
                gamesWon: {
                    heroName: ['#top-heroes-section .row .progress-category:nth-child(5) .title'],
                    heroImg: ['#top-heroes-section .row .progress-category:nth-child(5) img@src'],
                    description: ['#top-heroes-section .row .progress-category:nth-child(5) .description']
                },
                winPercentage: {
                    heroName: ['#top-heroes-section .row .progress-category:nth-child(6) .title'],
                    heroImg: ['#top-heroes-section .row .progress-category:nth-child(6) img@src'],
                    description: ['#top-heroes-section .row .progress-category:nth-child(6) .description']
                },
                weaponAccuracy: {
                    heroName: ['#top-heroes-section .row .progress-category:nth-child(7) .title'],
                    heroImg: ['#top-heroes-section .row .progress-category:nth-child(7) img@src'],
                    description: ['#top-heroes-section .row .progress-category:nth-child(7) .description']
                },
                eliminationPerlife: {
                    heroName: ['#top-heroes-section .row .progress-category:nth-child(8) .title'],
                    heroImg: ['#top-heroes-section .row .progress-category:nth-child(8) img@src'],
                    description: ['#top-heroes-section .row .progress-category:nth-child(8) .description']
                },
                killStreak: {
                    heroName: ['#top-heroes-section .row .progress-category:nth-child(9) .title'],
                    heroImg: ['#top-heroes-section .row .progress-category:nth-child(9) img@src'],
                    description: ['#top-heroes-section .row .progress-category:nth-child(9) .description']
                },
                multiKill: {
                    heroName: ['#top-heroes-section .row .progress-category:nth-child(10) .title'],
                    heroImg: ['#top-heroes-section .row .progress-category:nth-child(10) img@src'],
                    description: ['#top-heroes-section .row .progress-category:nth-child(10) .description']
                },
                objectiveKill: {
                    heroName: ['#top-heroes-section .row .progress-category:nth-child(11) .title'],
                    heroImg: ['#top-heroes-section .row .progress-category:nth-child(11) img@src'],
                    description: ['#top-heroes-section .row .progress-category:nth-child(11) .description']
                }
            },
            careerStats: {
                allHeros: {
                    combat: {
                        name: ['#stats-section .row .row .js-stats:first-child .column:first-child table tbody tr td:first-child'],
                        value: ['#stats-section .row .row .js-stats:first-child .column:first-child table tbody tr td:nth-child(2)']
                    },
                    assists: {
                        name: ['#stats-section .row .row .js-stats:first-child .column:nth-child(2) table tbody tr td:first-child'],
                        value: ['#stats-section .row .row .js-stats:first-child .column:nth-child(2) table tbody tr td:nth-child(2)']
                    },
                    best: {
                        name: ['#stats-section .row .row .js-stats:first-child .column:nth-child(3) table tbody tr td:first-child'],
                        value: ['#stats-section .row .row .js-stats:first-child .column:nth-child(3) table tbody tr td:nth-child(2)']
                    },
                    average: {
                        name: ['#stats-section .row .row .js-stats:first-child .column:nth-child(4) table tbody tr td:first-child'],
                        value: ['#stats-section .row .row .js-stats:first-child .column:nth-child(4) table tbody tr td:nth-child(2)']
                    },
                    deaths: {
                        name: ['#stats-section .row .row .js-stats:first-child .column:nth-child(5) table tbody tr td:first-child'],
                        value: ['#stats-section .row .row .js-stats:first-child .column:nth-child(5) table tbody tr td:nth-child(2)']
                    },
                    matchAwards: {
                        name: ['#stats-section .row .row .js-stats:first-child .column:nth-child(6) table tbody tr td:first-child'],
                        value: ['#stats-section .row .row .js-stats:first-child .column:nth-child(6) table tbody tr td:nth-child(2)']
                    },
                    game: {
                        name: ['#stats-section .row .row .js-stats:first-child .column:nth-child(7) table tbody tr td:first-child'],
                        value: ['#stats-section .row .row .js-stats:first-child .column:nth-child(7) table tbody tr td:nth-child(2)']
                    },
                    miscellaneous: {
                        name: ['#stats-section .row .row .js-stats:first-child .column:nth-child(8) table tbody tr td:first-child'],
                        value: ['#stats-section .row .row .js-stats:first-child .column:nth-child(8) table tbody tr td:nth-child(2)']
                    }
                }
            },
            careerHeroStats: {
                name: ['#stats-section .row select option'],
                value: {
                    1: {
                        name: ['#stats-section .row .row .js-stats:nth-child(2) .column table thead tr th'],
                        0: {
                            name: ['#stats-section .row .row .js-stats:nth-child(2) .column:first-child table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(2) .column:first-child table tbody tr td:nth-child(2)']
                        },
                        1: {
                            name: ['#stats-section .row .row .js-stats:nth-child(2) .column:nth-child(2) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(2) .column:nth-child(2) table tbody tr td:nth-child(2)']
                        },
                        2: {
                            name: ['#stats-section .row .row .js-stats:nth-child(2) .column:nth-child(3) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(2) .column:nth-child(3) table tbody tr td:nth-child(2)']
                        },
                        3: {
                            name: ['#stats-section .row .row .js-stats:nth-child(2) .column:nth-child(4) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(2) .column:nth-child(4) table tbody tr td:nth-child(2)']
                        },
                        4: {
                            name: ['#stats-section .row .row .js-stats:nth-child(2) .column:nth-child(5) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(2) .column:nth-child(5) table tbody tr td:nth-child(2)']
                        },
                        5: {
                            name: ['#stats-section .row .row .js-stats:nth-child(2) .column:nth-child(6) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(2) .column:nth-child(6) table tbody tr td:nth-child(2)']
                        },
                        6: {
                            name: ['#stats-section .row .row .js-stats:nth-child(2) .column:nth-child(7) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(2) .column:nth-child(7) table tbody tr td:nth-child(2)']
                        },
                        7: {
                            name: ['#stats-section .row .row .js-stats:nth-child(2) .column:nth-child(8) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(2) .column:nth-child(8) table tbody tr td:nth-child(2)']
                        },
                        8: {
                            name: ['#stats-section .row .row .js-stats:nth-child(2) .column:nth-child(9) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(2) .column:nth-child(9) table tbody tr td:nth-child(2)']
                        },
                    },
                    2: {
                        name: ['#stats-section .row .row .js-stats:nth-child(3) .column table thead tr th'],
                        0: {
                            name: ['#stats-section .row .row .js-stats:nth-child(3) .column:first-child table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(3) .column:first-child table tbody tr td:nth-child(2)']
                        },
                        1: {
                            name: ['#stats-section .row .row .js-stats:nth-child(3) .column:nth-child(2) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(3) .column:nth-child(2) table tbody tr td:nth-child(2)']
                        },
                        2: {
                            name: ['#stats-section .row .row .js-stats:nth-child(3) .column:nth-child(3) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(3) .column:nth-child(3) table tbody tr td:nth-child(2)']
                        },
                        3: {
                            name: ['#stats-section .row .row .js-stats:nth-child(3) .column:nth-child(4) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(3) .column:nth-child(4) table tbody tr td:nth-child(2)']
                        },
                        4: {
                            name: ['#stats-section .row .row .js-stats:nth-child(3) .column:nth-child(5) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(3) .column:nth-child(5) table tbody tr td:nth-child(2)']
                        },
                        5: {
                            name: ['#stats-section .row .row .js-stats:nth-child(3) .column:nth-child(6) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(3) .column:nth-child(6) table tbody tr td:nth-child(2)']
                        },
                        6: {
                            name: ['#stats-section .row .row .js-stats:nth-child(3) .column:nth-child(7) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(3) .column:nth-child(7) table tbody tr td:nth-child(2)']
                        },
                        7: {
                            name: ['#stats-section .row .row .js-stats:nth-child(3) .column:nth-child(8) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(3) .column:nth-child(8) table tbody tr td:nth-child(2)']
                        },
                        8: {
                            name: ['#stats-section .row .row .js-stats:nth-child(3) .column:nth-child(9) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(3) .column:nth-child(9) table tbody tr td:nth-child(2)']
                        }
                    },
                    3: {
                        name: ['#stats-section .row .row .js-stats:nth-child(4) .column table thead tr th'],
                        0: {
                            name: ['#stats-section .row .row .js-stats:nth-child(4) .column:first-child table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(4) .column:first-child table tbody tr td:nth-child(2)']
                        },
                        1: {
                            name: ['#stats-section .row .row .js-stats:nth-child(4) .column:nth-child(2) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(4) .column:nth-child(2) table tbody tr td:nth-child(2)']
                        },
                        2: {
                            name: ['#stats-section .row .row .js-stats:nth-child(4) .column:nth-child(3) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(4) .column:nth-child(3) table tbody tr td:nth-child(2)']
                        },
                        3: {
                            name: ['#stats-section .row .row .js-stats:nth-child(4) .column:nth-child(4) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(4) .column:nth-child(4) table tbody tr td:nth-child(2)']
                        },
                        4: {
                            name: ['#stats-section .row .row .js-stats:nth-child(4) .column:nth-child(5) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(4) .column:nth-child(5) table tbody tr td:nth-child(2)']
                        },
                        5: {
                            name: ['#stats-section .row .row .js-stats:nth-child(4) .column:nth-child(6) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(4) .column:nth-child(6) table tbody tr td:nth-child(2)']
                        },
                        6: {
                            name: ['#stats-section .row .row .js-stats:nth-child(4) .column:nth-child(7) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(4) .column:nth-child(7) table tbody tr td:nth-child(2)']
                        },
                        7: {
                            name: ['#stats-section .row .row .js-stats:nth-child(4) .column:nth-child(8) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(4) .column:nth-child(8) table tbody tr td:nth-child(2)']
                        },
                        8: {
                            name: ['#stats-section .row .row .js-stats:nth-child(4) .column:nth-child(9) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(4) .column:nth-child(9) table tbody tr td:nth-child(2)']
                        }
                    },
                    4: {
                        name: ['#stats-section .row .row .js-stats:nth-child(5) .column table thead tr th'],
                        0: {
                            name: ['#stats-section .row .row .js-stats:nth-child(5) .column:first-child table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(5) .column:first-child table tbody tr td:nth-child(2)']
                        },
                        1: {
                            name: ['#stats-section .row .row .js-stats:nth-child(5) .column:nth-child(2) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(5) .column:nth-child(2) table tbody tr td:nth-child(2)']
                        },
                        2: {
                            name: ['#stats-section .row .row .js-stats:nth-child(5) .column:nth-child(3) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(5) .column:nth-child(3) table tbody tr td:nth-child(2)']
                        },
                        3: {
                            name: ['#stats-section .row .row .js-stats:nth-child(5) .column:nth-child(4) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(5) .column:nth-child(4) table tbody tr td:nth-child(2)']
                        },
                        4: {
                            name: ['#stats-section .row .row .js-stats:nth-child(5) .column:nth-child(5) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(5) .column:nth-child(5) table tbody tr td:nth-child(2)']
                        },
                        5: {
                            name: ['#stats-section .row .row .js-stats:nth-child(5) .column:nth-child(6) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(5) .column:nth-child(6) table tbody tr td:nth-child(2)']
                        },
                        6: {
                            name: ['#stats-section .row .row .js-stats:nth-child(5) .column:nth-child(7) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(5) .column:nth-child(7) table tbody tr td:nth-child(2)']
                        },
                        7: {
                            name: ['#stats-section .row .row .js-stats:nth-child(5) .column:nth-child(8) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(5) .column:nth-child(8) table tbody tr td:nth-child(2)']
                        },
                        8: {
                            name: ['#stats-section .row .row .js-stats:nth-child(5) .column:nth-child(9) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(5) .column:nth-child(9) table tbody tr td:nth-child(2)']
                        },
                    },
                    5: {
                        name: ['#stats-section .row .row .js-stats:nth-child(6) .column table thead tr th'],
                        0: {
                            name: ['#stats-section .row .row .js-stats:nth-child(6) .column:first-child table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(6) .column:first-child table tbody tr td:nth-child(2)']
                        },
                        1: {
                            name: ['#stats-section .row .row .js-stats:nth-child(6) .column:nth-child(2) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(6) .column:nth-child(2) table tbody tr td:nth-child(2)']
                        },
                        2: {
                            name: ['#stats-section .row .row .js-stats:nth-child(6) .column:nth-child(3) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(6) .column:nth-child(3) table tbody tr td:nth-child(2)']
                        },
                        3: {
                            name: ['#stats-section .row .row .js-stats:nth-child(6) .column:nth-child(4) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(6) .column:nth-child(4) table tbody tr td:nth-child(2)']
                        },
                        4: {
                            name: ['#stats-section .row .row .js-stats:nth-child(6) .column:nth-child(5) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(6) .column:nth-child(5) table tbody tr td:nth-child(2)']
                        },
                        5: {
                            name: ['#stats-section .row .row .js-stats:nth-child(6) .column:nth-child(6) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(6) .column:nth-child(6) table tbody tr td:nth-child(2)']
                        },
                        6: {
                            name: ['#stats-section .row .row .js-stats:nth-child(6) .column:nth-child(7) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(6) .column:nth-child(7) table tbody tr td:nth-child(2)']
                        },
                        7: {
                            name: ['#stats-section .row .row .js-stats:nth-child(6) .column:nth-child(8) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(6) .column:nth-child(8) table tbody tr td:nth-child(2)']
                        },
                        8: {
                            name: ['#stats-section .row .row .js-stats:nth-child(6) .column:nth-child(9) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(6) .column:nth-child(9) table tbody tr td:nth-child(2)']
                        }
                    },
                    6: {
                        name: ['#stats-section .row .row .js-stats:nth-child(7) .column table thead tr th'],
                        0: {
                            name: ['#stats-section .row .row .js-stats:nth-child(7) .column:first-child table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(7) .column:first-child table tbody tr td:nth-child(2)']
                        },
                        1: {
                            name: ['#stats-section .row .row .js-stats:nth-child(7) .column:nth-child(2) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(7) .column:nth-child(2) table tbody tr td:nth-child(2)']
                        },
                        2: {
                            name: ['#stats-section .row .row .js-stats:nth-child(7) .column:nth-child(3) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(7) .column:nth-child(3) table tbody tr td:nth-child(2)']
                        },
                        3: {
                            name: ['#stats-section .row .row .js-stats:nth-child(7) .column:nth-child(4) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(7) .column:nth-child(4) table tbody tr td:nth-child(2)']
                        },
                        4: {
                            name: ['#stats-section .row .row .js-stats:nth-child(7) .column:nth-child(5) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(7) .column:nth-child(5) table tbody tr td:nth-child(2)']
                        },
                        5: {
                            name: ['#stats-section .row .row .js-stats:nth-child(7) .column:nth-child(6) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(7) .column:nth-child(6) table tbody tr td:nth-child(2)']
                        },
                        6: {
                            name: ['#stats-section .row .row .js-stats:nth-child(7) .column:nth-child(7) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(7) .column:nth-child(7) table tbody tr td:nth-child(2)']
                        },
                        7: {
                            name: ['#stats-section .row .row .js-stats:nth-child(7) .column:nth-child(8) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(7) .column:nth-child(8) table tbody tr td:nth-child(2)']
                        },
                        8: {
                            name: ['#stats-section .row .row .js-stats:nth-child(7) .column:nth-child(9) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(7) .column:nth-child(9) table tbody tr td:nth-child(2)']
                        }
                    },
                    7: {
                        name: ['#stats-section .row .row .js-stats:nth-child(8) .column table thead tr th'],
                        0: {
                            name: ['#stats-section .row .row .js-stats:nth-child(8) .column:first-child table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(8) .column:first-child table tbody tr td:nth-child(2)']
                        },
                        1: {
                            name: ['#stats-section .row .row .js-stats:nth-child(8) .column:nth-child(2) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(8) .column:nth-child(2) table tbody tr td:nth-child(2)']
                        },
                        2: {
                            name: ['#stats-section .row .row .js-stats:nth-child(8) .column:nth-child(3) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(8) .column:nth-child(3) table tbody tr td:nth-child(2)']
                        },
                        3: {
                            name: ['#stats-section .row .row .js-stats:nth-child(8) .column:nth-child(4) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(8) .column:nth-child(4) table tbody tr td:nth-child(2)']
                        },
                        4: {
                            name: ['#stats-section .row .row .js-stats:nth-child(8) .column:nth-child(5) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(8) .column:nth-child(5) table tbody tr td:nth-child(2)']
                        },
                        5: {
                            name: ['#stats-section .row .row .js-stats:nth-child(8) .column:nth-child(6) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(8) .column:nth-child(6) table tbody tr td:nth-child(2)']
                        },
                        6: {
                            name: ['#stats-section .row .row .js-stats:nth-child(8) .column:nth-child(7) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(8) .column:nth-child(7) table tbody tr td:nth-child(2)']
                        },
                        7: {
                            name: ['#stats-section .row .row .js-stats:nth-child(8) .column:nth-child(8) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(8) .column:nth-child(8) table tbody tr td:nth-child(2)']
                        },
                        8: {
                            name: ['#stats-section .row .row .js-stats:nth-child(8) .column:nth-child(9) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(8) .column:nth-child(9) table tbody tr td:nth-child(2)']
                        }
                    },
                    8: {
                        name: ['#stats-section .row .row .js-stats:nth-child(9) .column table thead tr th'],
                        0: {
                            name: ['#stats-section .row .row .js-stats:nth-child(9) .column:first-child table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(9) .column:first-child table tbody tr td:nth-child(2)']
                        },
                        1: {
                            name: ['#stats-section .row .row .js-stats:nth-child(9) .column:nth-child(2) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(9) .column:nth-child(2) table tbody tr td:nth-child(2)']
                        },
                        2: {
                            name: ['#stats-section .row .row .js-stats:nth-child(9) .column:nth-child(3) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(9) .column:nth-child(3) table tbody tr td:nth-child(2)']
                        },
                        3: {
                            name: ['#stats-section .row .row .js-stats:nth-child(9) .column:nth-child(4) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(9) .column:nth-child(4) table tbody tr td:nth-child(2)']
                        },
                        4: {
                            name: ['#stats-section .row .row .js-stats:nth-child(9) .column:nth-child(5) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(9) .column:nth-child(5) table tbody tr td:nth-child(2)']
                        },
                        5: {
                            name: ['#stats-section .row .row .js-stats:nth-child(9) .column:nth-child(6) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(9) .column:nth-child(6) table tbody tr td:nth-child(2)']
                        },
                        6: {
                            name: ['#stats-section .row .row .js-stats:nth-child(9) .column:nth-child(7) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(9) .column:nth-child(7) table tbody tr td:nth-child(2)']
                        },
                        7: {
                            name: ['#stats-section .row .row .js-stats:nth-child(9) .column:nth-child(8) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(9) .column:nth-child(8) table tbody tr td:nth-child(2)']
                        },
                        8: {
                            name: ['#stats-section .row .row .js-stats:nth-child(9) .column:nth-child(9) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(9) .column:nth-child(9) table tbody tr td:nth-child(2)']
                        }
                    },
                    9: {
                        name: ['#stats-section .row .row .js-stats:nth-child(10) .column table thead tr th'],
                        0: {
                            name: ['#stats-section .row .row .js-stats:nth-child(10) .column:first-child table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(10) .column:first-child table tbody tr td:nth-child(2)']
                        },
                        1: {
                            name: ['#stats-section .row .row .js-stats:nth-child(10) .column:nth-child(2) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(10) .column:nth-child(2) table tbody tr td:nth-child(2)']
                        },
                        2: {
                            name: ['#stats-section .row .row .js-stats:nth-child(10) .column:nth-child(3) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(10) .column:nth-child(3) table tbody tr td:nth-child(2)']
                        },
                        3: {
                            name: ['#stats-section .row .row .js-stats:nth-child(10) .column:nth-child(4) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(10) .column:nth-child(4) table tbody tr td:nth-child(2)']
                        },
                        4: {
                            name: ['#stats-section .row .row .js-stats:nth-child(10) .column:nth-child(5) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(10) .column:nth-child(5) table tbody tr td:nth-child(2)']
                        },
                        5: {
                            name: ['#stats-section .row .row .js-stats:nth-child(10) .column:nth-child(6) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(10) .column:nth-child(6) table tbody tr td:nth-child(2)']
                        },
                        6: {
                            name: ['#stats-section .row .row .js-stats:nth-child(10) .column:nth-child(7) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(10) .column:nth-child(7) table tbody tr td:nth-child(2)']
                        },
                        7: {
                            name: ['#stats-section .row .row .js-stats:nth-child(10) .column:nth-child(8) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(10) .column:nth-child(8) table tbody tr td:nth-child(2)']
                        },
                        8: {
                            name: ['#stats-section .row .row .js-stats:nth-child(10) .column:nth-child(9) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(10) .column:nth-child(9) table tbody tr td:nth-child(2)']
                        }
                    },
                    10: {
                        name: ['#stats-section .row .row .js-stats:nth-child(11) .column table thead tr th'],
                        0: {
                            name: ['#stats-section .row .row .js-stats:nth-child(11) .column:first-child table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(11) .column:first-child table tbody tr td:nth-child(2)']
                        },
                        1: {
                            name: ['#stats-section .row .row .js-stats:nth-child(11) .column:nth-child(2) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(11) .column:nth-child(2) table tbody tr td:nth-child(2)']
                        },
                        2: {
                            name: ['#stats-section .row .row .js-stats:nth-child(11) .column:nth-child(3) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(11) .column:nth-child(3) table tbody tr td:nth-child(2)']
                        },
                        3: {
                            name: ['#stats-section .row .row .js-stats:nth-child(11) .column:nth-child(4) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(11) .column:nth-child(4) table tbody tr td:nth-child(2)']
                        },
                        4: {
                            name: ['#stats-section .row .row .js-stats:nth-child(11) .column:nth-child(5) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(11) .column:nth-child(5) table tbody tr td:nth-child(2)']
                        },
                        5: {
                            name: ['#stats-section .row .row .js-stats:nth-child(11) .column:nth-child(6) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(11) .column:nth-child(6) table tbody tr td:nth-child(2)']
                        },
                        6: {
                            name: ['#stats-section .row .row .js-stats:nth-child(11) .column:nth-child(7) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(11) .column:nth-child(7) table tbody tr td:nth-child(2)']
                        },
                        7: {
                            name: ['#stats-section .row .row .js-stats:nth-child(11) .column:nth-child(8) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(11) .column:nth-child(8) table tbody tr td:nth-child(2)']
                        },
                        8: {
                            name: ['#stats-section .row .row .js-stats:nth-child(11) .column:nth-child(9) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(11) .column:nth-child(9) table tbody tr td:nth-child(2)']
                        }
                    },
                    11: {
                        name: ['#stats-section .row .row .js-stats:nth-child(12) .column table thead tr th'],
                        0: {
                            name: ['#stats-section .row .row .js-stats:nth-child(12) .column:first-child table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(12) .column:first-child table tbody tr td:nth-child(2)']
                        },
                        1: {
                            name: ['#stats-section .row .row .js-stats:nth-child(12) .column:nth-child(2) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(12) .column:nth-child(2) table tbody tr td:nth-child(2)']
                        },
                        2: {
                            name: ['#stats-section .row .row .js-stats:nth-child(12) .column:nth-child(3) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(12) .column:nth-child(3) table tbody tr td:nth-child(2)']
                        },
                        3: {
                            name: ['#stats-section .row .row .js-stats:nth-child(12) .column:nth-child(4) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(12) .column:nth-child(4) table tbody tr td:nth-child(2)']
                        },
                        4: {
                            name: ['#stats-section .row .row .js-stats:nth-child(12) .column:nth-child(5) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(12) .column:nth-child(5) table tbody tr td:nth-child(2)']
                        },
                        5: {
                            name: ['#stats-section .row .row .js-stats:nth-child(12) .column:nth-child(6) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(12) .column:nth-child(6) table tbody tr td:nth-child(2)']
                        },
                        6: {
                            name: ['#stats-section .row .row .js-stats:nth-child(12) .column:nth-child(7) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(12) .column:nth-child(7) table tbody tr td:nth-child(2)']
                        },
                        7: {
                            name: ['#stats-section .row .row .js-stats:nth-child(12) .column:nth-child(8) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(12) .column:nth-child(8) table tbody tr td:nth-child(2)']
                        },
                        8: {
                            name: ['#stats-section .row .row .js-stats:nth-child(12) .column:nth-child(8) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(12) .column:nth-child(8) table tbody tr td:nth-child(2)']
                        }
                    },
                    12: {
                        name: ['#stats-section .row .row .js-stats:nth-child(13) .column table thead tr th'],
                        0: {
                            name: ['#stats-section .row .row .js-stats:nth-child(13) .column:first-child table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(13) .column:first-child table tbody tr td:nth-child(2)']
                        },
                        1: {
                            name: ['#stats-section .row .row .js-stats:nth-child(13) .column:nth-child(2) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(13) .column:nth-child(2) table tbody tr td:nth-child(2)']
                        },
                        2: {
                            name: ['#stats-section .row .row .js-stats:nth-child(13) .column:nth-child(3) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(13) .column:nth-child(3) table tbody tr td:nth-child(2)']
                        },
                        3: {
                            name: ['#stats-section .row .row .js-stats:nth-child(13) .column:nth-child(4) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(13) .column:nth-child(4) table tbody tr td:nth-child(2)']
                        },
                        4: {
                            name: ['#stats-section .row .row .js-stats:nth-child(13) .column:nth-child(5) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(13) .column:nth-child(5) table tbody tr td:nth-child(2)']
                        },
                        5: {
                            name: ['#stats-section .row .row .js-stats:nth-child(13) .column:nth-child(6) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(13) .column:nth-child(6) table tbody tr td:nth-child(2)']
                        },
                        6: {
                            name: ['#stats-section .row .row .js-stats:nth-child(13) .column:nth-child(7) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(13) .column:nth-child(7) table tbody tr td:nth-child(2)']
                        },
                        7: {
                            name: ['#stats-section .row .row .js-stats:nth-child(13) .column:nth-child(8) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(13) .column:nth-child(8) table tbody tr td:nth-child(2)']
                        },
                        8: {
                            name: ['#stats-section .row .row .js-stats:nth-child(13) .column:nth-child(9) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(13) .column:nth-child(9) table tbody tr td:nth-child(2)']
                        }
                    },
                    13: {
                        name: ['#stats-section .row .row .js-stats:nth-child(14) .column table thead tr th'],
                        0: {
                            name: ['#stats-section .row .row .js-stats:nth-child(14) .column:first-child table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(14) .column:first-child table tbody tr td:nth-child(2)']
                        },
                        1: {
                            name: ['#stats-section .row .row .js-stats:nth-child(14) .column:nth-child(2) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(14) .column:nth-child(2) table tbody tr td:nth-child(2)']
                        },
                        2: {
                            name: ['#stats-section .row .row .js-stats:nth-child(14) .column:nth-child(3) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(14) .column:nth-child(3) table tbody tr td:nth-child(2)']
                        },
                        3: {
                            name: ['#stats-section .row .row .js-stats:nth-child(14) .column:nth-child(4) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(14) .column:nth-child(4) table tbody tr td:nth-child(2)']
                        },
                        4: {
                            name: ['#stats-section .row .row .js-stats:nth-child(14) .column:nth-child(5) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(14) .column:nth-child(5) table tbody tr td:nth-child(2)']
                        },
                        5: {
                            name: ['#stats-section .row .row .js-stats:nth-child(14) .column:nth-child(6) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(14) .column:nth-child(6) table tbody tr td:nth-child(2)']
                        },
                        6: {
                            name: ['#stats-section .row .row .js-stats:nth-child(14) .column:nth-child(7) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(14) .column:nth-child(7) table tbody tr td:nth-child(2)']
                        },
                        7: {
                            name: ['#stats-section .row .row .js-stats:nth-child(14) .column:nth-child(8) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(14) .column:nth-child(8) table tbody tr td:nth-child(2)']
                        },
                        8: {
                            name: ['#stats-section .row .row .js-stats:nth-child(14) .column:nth-child(8) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(14) .column:nth-child(8) table tbody tr td:nth-child(2)']
                        }
                    },
                    14: {
                        name: ['#stats-section .row .row .js-stats:nth-child(15) .column table thead tr th'],
                        0: {
                            name: ['#stats-section .row .row .js-stats:nth-child(15) .column:first-child table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(15) .column:first-child table tbody tr td:nth-child(2)']
                        },
                        1: {
                            name: ['#stats-section .row .row .js-stats:nth-child(15) .column:nth-child(2) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(15) .column:nth-child(2) table tbody tr td:nth-child(2)']
                        },
                        2: {
                            name: ['#stats-section .row .row .js-stats:nth-child(15) .column:nth-child(3) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(15) .column:nth-child(3) table tbody tr td:nth-child(2)']
                        },
                        3: {
                            name: ['#stats-section .row .row .js-stats:nth-child(15) .column:nth-child(4) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(15) .column:nth-child(4) table tbody tr td:nth-child(2)']
                        },
                        4: {
                            name: ['#stats-section .row .row .js-stats:nth-child(15) .column:nth-child(5) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(15) .column:nth-child(5) table tbody tr td:nth-child(2)']
                        },
                        5: {
                            name: ['#stats-section .row .row .js-stats:nth-child(15) .column:nth-child(6) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(15) .column:nth-child(6) table tbody tr td:nth-child(2)']
                        },
                        6: {
                            name: ['#stats-section .row .row .js-stats:nth-child(15) .column:nth-child(7) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(15) .column:nth-child(7) table tbody tr td:nth-child(2)']
                        },
                        7: {
                            name: ['#stats-section .row .row .js-stats:nth-child(15) .column:nth-child(8) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(15) .column:nth-child(8) table tbody tr td:nth-child(2)']
                        },
                        8: {
                            name: ['#stats-section .row .row .js-stats:nth-child(15) .column:nth-child(9) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(15) .column:nth-child(9) table tbody tr td:nth-child(2)']
                        }
                    },
                    15: {
                        name: ['#stats-section .row .row .js-stats:nth-child(16) .column table thead tr th'],
                        0: {
                            name: ['#stats-section .row .row .js-stats:nth-child(16) .column:first-child table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(16) .column:first-child table tbody tr td:nth-child(2)']
                        },
                        1: {
                            name: ['#stats-section .row .row .js-stats:nth-child(16) .column:nth-child(2) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(16) .column:nth-child(2) table tbody tr td:nth-child(2)']
                        },
                        2: {
                            name: ['#stats-section .row .row .js-stats:nth-child(16) .column:nth-child(3) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(16) .column:nth-child(3) table tbody tr td:nth-child(2)']
                        },
                        3: {
                            name: ['#stats-section .row .row .js-stats:nth-child(16) .column:nth-child(4) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(16) .column:nth-child(4) table tbody tr td:nth-child(2)']
                        },
                        4: {
                            name: ['#stats-section .row .row .js-stats:nth-child(16) .column:nth-child(5) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(16) .column:nth-child(5) table tbody tr td:nth-child(2)']
                        },
                        5: {
                            name: ['#stats-section .row .row .js-stats:nth-child(16) .column:nth-child(6) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(16) .column:nth-child(6) table tbody tr td:nth-child(2)']
                        },
                        6: {
                            name: ['#stats-section .row .row .js-stats:nth-child(16) .column:nth-child(7) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(16) .column:nth-child(7) table tbody tr td:nth-child(2)']
                        },
                        7: {
                            name: ['#stats-section .row .row .js-stats:nth-child(16) .column:nth-child(8) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(16) .column:nth-child(8) table tbody tr td:nth-child(2)']
                        },
                        8: {
                            name: ['#stats-section .row .row .js-stats:nth-child(16) .column:nth-child(9) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(16) .column:nth-child(9) table tbody tr td:nth-child(2)']
                        }
                    },
                    16: {
                        name: ['#stats-section .row .row .js-stats:nth-child(17) .column table thead tr th'],
                        0: {
                            name: ['#stats-section .row .row .js-stats:nth-child(17) .column:first-child table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(17) .column:first-child table tbody tr td:nth-child(2)']
                        },
                        1: {
                            name: ['#stats-section .row .row .js-stats:nth-child(17) .column:nth-child(2) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(17) .column:nth-child(2) table tbody tr td:nth-child(2)']
                        },
                        2: {
                            name: ['#stats-section .row .row .js-stats:nth-child(17) .column:nth-child(3) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(17) .column:nth-child(3) table tbody tr td:nth-child(2)']
                        },
                        3: {
                            name: ['#stats-section .row .row .js-stats:nth-child(17) .column:nth-child(4) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(17) .column:nth-child(4) table tbody tr td:nth-child(2)']
                        },
                        4: {
                            name: ['#stats-section .row .row .js-stats:nth-child(17) .column:nth-child(5) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(17) .column:nth-child(5) table tbody tr td:nth-child(2)']
                        },
                        5: {
                            name: ['#stats-section .row .row .js-stats:nth-child(17) .column:nth-child(6) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(17) .column:nth-child(6) table tbody tr td:nth-child(2)']
                        },
                        6: {
                            name: ['#stats-section .row .row .js-stats:nth-child(17) .column:nth-child(7) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(17) .column:nth-child(7) table tbody tr td:nth-child(2)']
                        },
                        7: {
                            name: ['#stats-section .row .row .js-stats:nth-child(17) .column:nth-child(8) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(17) .column:nth-child(8) table tbody tr td:nth-child(2)']
                        },
                        8: {
                            name: ['#stats-section .row .row .js-stats:nth-child(17) .column:nth-child(9) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(17) .column:nth-child(9) table tbody tr td:nth-child(2)']
                        }
                    },
                    17: {
                        name: ['#stats-section .row .row .js-stats:nth-child(18) .column table thead tr th'],
                        0: {
                            name: ['#stats-section .row .row .js-stats:nth-child(18) .column:first-child table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(18) .column:first-child table tbody tr td:nth-child(2)']
                        },
                        1: {
                            name: ['#stats-section .row .row .js-stats:nth-child(18) .column:nth-child(2) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(18) .column:nth-child(2) table tbody tr td:nth-child(2)']
                        },
                        2: {
                            name: ['#stats-section .row .row .js-stats:nth-child(18) .column:nth-child(3) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(18) .column:nth-child(3) table tbody tr td:nth-child(2)']
                        },
                        3: {
                            name: ['#stats-section .row .row .js-stats:nth-child(18) .column:nth-child(4) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(18) .column:nth-child(4) table tbody tr td:nth-child(2)']
                        },
                        4: {
                            name: ['#stats-section .row .row .js-stats:nth-child(18) .column:nth-child(5) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(18) .column:nth-child(5) table tbody tr td:nth-child(2)']
                        },
                        5: {
                            name: ['#stats-section .row .row .js-stats:nth-child(18) .column:nth-child(6) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(18) .column:nth-child(6) table tbody tr td:nth-child(2)']
                        },
                        6: {
                            name: ['#stats-section .row .row .js-stats:nth-child(18) .column:nth-child(7) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(18) .column:nth-child(7) table tbody tr td:nth-child(2)']
                        },
                        7: {
                            name: ['#stats-section .row .row .js-stats:nth-child(18) .column:nth-child(8) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(18) .column:nth-child(8) table tbody tr td:nth-child(2)']
                        },
                        8: {
                            name: ['#stats-section .row .row .js-stats:nth-child(18) .column:nth-child(9) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(18) .column:nth-child(9) table tbody tr td:nth-child(2)']
                        }
                    },
                    18: {
                        name: ['#stats-section .row .row .js-stats:nth-child(19) .column table thead tr th'],
                        0: {
                            name: ['#stats-section .row .row .js-stats:nth-child(19) .column:first-child table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(19) .column:first-child table tbody tr td:nth-child(2)']
                        },
                        1: {
                            name: ['#stats-section .row .row .js-stats:nth-child(19) .column:nth-child(2) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(19) .column:nth-child(2) table tbody tr td:nth-child(2)']
                        },
                        2: {
                            name: ['#stats-section .row .row .js-stats:nth-child(19) .column:nth-child(3) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(19) .column:nth-child(3) table tbody tr td:nth-child(2)']
                        },
                        3: {
                            name: ['#stats-section .row .row .js-stats:nth-child(19) .column:nth-child(4) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(19) .column:nth-child(4) table tbody tr td:nth-child(2)']
                        },
                        4: {
                            name: ['#stats-section .row .row .js-stats:nth-child(19) .column:nth-child(5) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(19) .column:nth-child(5) table tbody tr td:nth-child(2)']
                        },
                        5: {
                            name: ['#stats-section .row .row .js-stats:nth-child(19) .column:nth-child(6) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(19) .column:nth-child(6) table tbody tr td:nth-child(2)']
                        },
                        6: {
                            name: ['#stats-section .row .row .js-stats:nth-child(19) .column:nth-child(7) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(19) .column:nth-child(7) table tbody tr td:nth-child(2)']
                        },
                        7: {
                            name: ['#stats-section .row .row .js-stats:nth-child(19) .column:nth-child(8) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(19) .column:nth-child(8) table tbody tr td:nth-child(2)']
                        },
                        8: {
                            name: ['#stats-section .row .row .js-stats:nth-child(19) .column:nth-child(9) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(19) .column:nth-child(9) table tbody tr td:nth-child(2)']
                        }
                    },
                    19: {
                        name: ['#stats-section .row .row .js-stats:nth-child(20) .column table thead tr th'],
                        0: {
                            name: ['#stats-section .row .row .js-stats:nth-child(20) .column:first-child table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(20) .column:first-child table tbody tr td:nth-child(2)']
                        },
                        1: {
                            name: ['#stats-section .row .row .js-stats:nth-child(20) .column:nth-child(2) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(20) .column:nth-child(2) table tbody tr td:nth-child(2)']
                        },
                        2: {
                            name: ['#stats-section .row .row .js-stats:nth-child(20) .column:nth-child(3) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(20) .column:nth-child(3) table tbody tr td:nth-child(2)']
                        },
                        3: {
                            name: ['#stats-section .row .row .js-stats:nth-child(20) .column:nth-child(4) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(20) .column:nth-child(4) table tbody tr td:nth-child(2)']
                        },
                        4: {
                            name: ['#stats-section .row .row .js-stats:nth-child(20) .column:nth-child(5) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(20) .column:nth-child(5) table tbody tr td:nth-child(2)']
                        },
                        5: {
                            name: ['#stats-section .row .row .js-stats:nth-child(20) .column:nth-child(6) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(20) .column:nth-child(6) table tbody tr td:nth-child(2)']
                        },
                        6: {
                            name: ['#stats-section .row .row .js-stats:nth-child(20) .column:nth-child(7) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(20) .column:nth-child(7) table tbody tr td:nth-child(2)']
                        },
                        7: {
                            name: ['#stats-section .row .row .js-stats:nth-child(20) .column:nth-child(8) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(20) .column:nth-child(8) table tbody tr td:nth-child(2)']
                        },
                        8: {
                            name: ['#stats-section .row .row .js-stats:nth-child(20) .column:nth-child(9) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(20) .column:nth-child(9) table tbody tr td:nth-child(2)']
                        }
                    },
                    20: {
                        name: ['#stats-section .row .row .js-stats:nth-child(21) .column table thead tr th'],
                        0: {
                            name: ['#stats-section .row .row .js-stats:nth-child(21) .column:first-child table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(21) .column:first-child table tbody tr td:nth-child(2)']
                        },
                        1: {
                            name: ['#stats-section .row .row .js-stats:nth-child(21) .column:nth-child(2) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(21) .column:nth-child(2) table tbody tr td:nth-child(2)']
                        },
                        2: {
                            name: ['#stats-section .row .row .js-stats:nth-child(21) .column:nth-child(3) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(21) .column:nth-child(3) table tbody tr td:nth-child(2)']
                        },
                        3: {
                            name: ['#stats-section .row .row .js-stats:nth-child(21) .column:nth-child(4) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(21) .column:nth-child(4) table tbody tr td:nth-child(2)']
                        },
                        4: {
                            name: ['#stats-section .row .row .js-stats:nth-child(21) .column:nth-child(5) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(21) .column:nth-child(5) table tbody tr td:nth-child(2)']
                        },
                        5: {
                            name: ['#stats-section .row .row .js-stats:nth-child(21) .column:nth-child(6) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(21) .column:nth-child(6) table tbody tr td:nth-child(2)']
                        },
                        6: {
                            name: ['#stats-section .row .row .js-stats:nth-child(21) .column:nth-child(7) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(21) .column:nth-child(7) table tbody tr td:nth-child(2)']
                        },
                        7: {
                            name: ['#stats-section .row .row .js-stats:nth-child(21) .column:nth-child(8) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(21) .column:nth-child(8) table tbody tr td:nth-child(2)']
                        },
                        8: {
                            name: ['#stats-section .row .row .js-stats:nth-child(21) .column:nth-child(9) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(21) .column:nth-child(9) table tbody tr td:nth-child(2)']
                        }
                    },
                    21: {
                        name: ['#stats-section .row .row .js-stats:nth-child(22) .column table thead tr th'],
                        0: {
                            name: ['#stats-section .row .row .js-stats:nth-child(22) .column:first-child table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(22) .column:first-child table tbody tr td:nth-child(2)']
                        },
                        1: {
                            name: ['#stats-section .row .row .js-stats:nth-child(22) .column:nth-child(2) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(22) .column:nth-child(2) table tbody tr td:nth-child(2)']
                        },
                        2: {
                            name: ['#stats-section .row .row .js-stats:nth-child(22) .column:nth-child(3) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(22) .column:nth-child(3) table tbody tr td:nth-child(2)']
                        },
                        3: {
                            name: ['#stats-section .row .row .js-stats:nth-child(22) .column:nth-child(4) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(22) .column:nth-child(4) table tbody tr td:nth-child(2)']
                        },
                        4: {
                            name: ['#stats-section .row .row .js-stats:nth-child(22) .column:nth-child(5) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(22) .column:nth-child(5) table tbody tr td:nth-child(2)']
                        },
                        5: {
                            name: ['#stats-section .row .row .js-stats:nth-child(22) .column:nth-child(6) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(22) .column:nth-child(6) table tbody tr td:nth-child(2)']
                        },
                        6: {
                            name: ['#stats-section .row .row .js-stats:nth-child(22) .column:nth-child(7) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(22) .column:nth-child(7) table tbody tr td:nth-child(2)']
                        },
                        7: {
                            name: ['#stats-section .row .row .js-stats:nth-child(22) .column:nth-child(8) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(22) .column:nth-child(8) table tbody tr td:nth-child(2)']
                        },
                        8: {
                            name: ['#stats-section .row .row .js-stats:nth-child(22) .column:nth-child(9) table tbody tr td:first-child'],
                            value: ['#stats-section .row .row .js-stats:nth-child(22) .column:nth-child(9) table tbody tr td:nth-child(2)']
                        }
                    },
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
        })(function(err, data){
            if(err){
                resolve({});
            }
            var result = {};
            result.profileName = data.profileName;
            result.level = data.level;
            result.gameWins = data.gameWins;
            result.featuredStats = {};
            for(let i=0; i<data.featuredStats.name.length; i++){
                result.featuredStats[data.featuredStats.name[i]] = data.featuredStats.value[i];
            }
            result.topHeros = {};
            var swap = function(name){
                result.topHeros[name] = {};
                for(let i=0; i<data.topHeros[name].heroName.length; i++){
                    result.topHeros[name][data.topHeros[name].heroName[i]] = {};
                    result.topHeros[name][data.topHeros[name].heroName[i]].img = data.topHeros[name].heroImg[i];
                    result.topHeros[name][data.topHeros[name].heroName[i]].desc = data.topHeros[name].description[i];
                }
            }
            swap("timePlayed");
            swap("gamesWon");
            swap("winPercentage");
            swap("weaponAccuracy");
            swap("eliminationPerlife");
            swap("killStreak");
            swap("multiKill");
            swap("objectiveKill");
            result.careerStats = {"allHeros": {}};
            var swap1 = function(name){
                result.careerStats.allHeros[name] = {};
                for(let i=0; i<data.careerStats.allHeros[name].name.length; i++){
                    result.careerStats.allHeros[name][data.careerStats.allHeros[name].name[i]] = data.careerStats.allHeros[name].value[i];
                }
            }
            swap1("combat");
            swap1("assists");
            swap1("best");
            swap1("average");
            swap1("deaths");
            swap1("matchAwards");
            swap1("game");
            swap1("miscellaneous");
            result.careerHeroStats = {};
            var swap3 = function(){
                let nestSwap = function(heroName, index){
                    for(let key = 0; key<data.careerHeroStats.value[index].name.length; key++){
                        result.careerHeroStats[heroName][data.careerHeroStats.value[index].name[key]] = {};
                        for(let i=0; i<data.careerHeroStats.value[index][key].name.length; i++){
                            result.careerHeroStats[heroName][data.careerHeroStats.value[index].name[key]][data.careerHeroStats.value[index][key].name[i]] = data.careerHeroStats.value[index][key].value[i];
                        }
                    }
                };

                for(let i=1; i<data.careerHeroStats.name.length; i++){
                    result.careerHeroStats[data.careerHeroStats.name[i]] = {};
                    let heroName = data.careerHeroStats.name[i];
                    nestSwap(heroName, i);
                }
            }
            swap3();
            result.achievements = {};
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
            swap2("general");
            swap2("offense");
            swap2("deffense");
            swap2("tank");
            swap2("support");
            swap2("map");

            resolve(result);
        });
    }
};

module.exports = scrapper;