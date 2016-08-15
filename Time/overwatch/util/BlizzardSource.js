'use strict'

const xRay = require('x-ray');
const xray = new xRay();
const properties = require('./properties');

var blizzardSource = {
    basicInfo: (resolve, reject, region, platform, battleTag) => {
        var url = `${properties.blizzardCareer}${platform}/${region}/${battleTag}`;

        xray(url, {
            profileName: '.masthead-player h1',
            level: '.player-level .u-vertical-center',
            platform: '#profile-platforms a',
            profileImage: '#overview-section .u-relative .row .column .masthead .masthead-player img@src',
            gameWins: '.masthead-detail span'})( (err, data) => {
            if(err){
                reject();
                return;
            }

            resolve(data);
        });
    },
    featureStats: (resolve, reject, region, platform, battleTag, type) => {
        var url = `${properties.blizzardCareer}${platform}/${region}/${battleTag}`;

        if(type === '0'){
            var switcher = '#quick-play';
        }else if(type === '1'){
            var switcher = '#competitive-play';
        }

        xray(url, {
                name: [`${switcher} .card-copy`],
                value: [`${switcher} .card-heading`]
        })( (err, data) => {
            if(err){
                reject();
                return;
            }

            resolve(data);
        });
    },
    heros: (resolve, reject, region, platform, battleTag, type) => {
        var url = `${properties.blizzardCareer}${platform}/${region}/${battleTag}`;

        if(type === '0'){
            var switcher = '#quick-play';
        }else if(type === '1'){
            var switcher = '#competitive-play';
        }

        xray(url, {
                heroName: [`${switcher} section:nth-child(2) .row .progress-category:nth-child(6) .title`],
                heroImg: [`${switcher} section:nth-child(2) .row .progress-category:nth-child(6) img@src`],
                description: [`${switcher} section:nth-child(2) .row .progress-category:nth-child(6) .description`]
        })( (err, data) => {
            if(err){
                reject();
                return;
            }

            resolve(data);
        });
    },
    careerBest: (resolve, reject, region, platform, battleTag, type) => {
        var url = `${properties.blizzardCareer}${platform}/${region}/${battleTag}`;

        if(type === '0'){
            var switcher = '#quick-play';
        }else if(type === '1'){
            var switcher = '#competitive-play';
        }

        xray(url, {
                name: [`${switcher} section:nth-child(3) .row .row:nth-child(4) .column:nth-child(3) table tbody tr td:first-child`],
                value: [`${switcher} section:nth-child(3) .row .row:nth-child(4) .column:nth-child(3) table tbody tr td:nth-child(2)`]
        })( (err, data) => {
            if(err){
                reject();
                return;
            }

            resolve(data);
        });
    },
    achievements: (resolve, reject, region, platform, battleTag, type) => {
        var url = `${properties.blizzardCareer}${platform}/${region}/${battleTag}`;

        xray(url, {
            achievements: {
                general: {
                    finished: {
                        name: ['#achievements-section .row .toggle-display:nth-child(4) .column .tooltip .media-card-caption .media-card-title'],
                        img: ['#achievements-section .row .toggle-display:nth-child(4) .column .tooltip img@src']
                    },
                    notFinished: {
                        name: ['#achievements-section .row .toggle-display:nth-child(4) .column .m-disabled .media-card-caption .media-card-title'],
                        img: ['#achievements-section .row .toggle-display:nth-child(4) .column .m-disabled img@src']
                    }
                },
                offense: {
                    finished: {
                        name: ['#achievements-section .row .toggle-display:nth-child(5) .column .tooltip .media-card-caption .media-card-title'],
                        img: ['#achievements-section .row .toggle-display:nth-child(5) .column .tooltip img@src'],
                    },
                    notFinished: {
                        name: ['#achievements-section .row .toggle-display:nth-child(5) .column .m-disabled .media-card-caption .media-card-title'],
                        img: ['#achievements-section .row .toggle-display:nth-child(5) .column .m-disabled img@src']
                    }
                },
                deffense: {
                    finished: {
                        name: ['#achievements-section .row .toggle-display:nth-child(6) .column .tooltip .media-card-caption .media-card-title'],
                        img: ['#achievements-section .row .toggle-display:nth-child(6) .column .tooltip img@src'],
                    },
                    notFinished: {
                        name: ['#achievements-section .row .toggle-display:nth-child(6) .column .m-disabled .media-card-caption .media-card-title'],
                        img: ['#achievements-section .row .toggle-display:nth-child(6) .column .m-disabled img@src']
                    }
                },
                tank: {
                    finished: {
                        name: ['#achievements-section .row .toggle-display:nth-child(7) .column .tooltip .media-card-caption .media-card-title'],
                        img: ['#achievements-section .row .toggle-display:nth-child(7) .column .tooltip img@src'],
                    },
                    notFinished: {
                        name: ['#achievements-section .row .toggle-display:nth-child(7) .column .m-disabled .media-card-caption .media-card-title'],
                        img: ['#achievements-section .row .toggle-display:nth-child(7) .column .m-disabled img@src']
                    }
                },
                support: {
                    finished: {
                        name: ['#achievements-section .row .toggle-display:nth-child(8) .column .tooltip .media-card-caption .media-card-title'],
                        img: ['#achievements-section .row .toggle-display:nth-child(8) .column .tooltip img@src'],
                    },
                    notFinished: {
                        name: ['#achievements-section .row .toggle-display:nth-child(8) .column .m-disabled .media-card-caption .media-card-title'],
                        img: ['#achievements-section .row .toggle-display:nth-child(8) .column .m-disabled img@src']
                    }
                },
                map: {
                    finished: {
                        name: ['#achievements-section .row .toggle-display:nth-child(9) .column .tooltip .media-card-caption .media-card-title'],
                        img: ['#achievements-section .row .toggle-display:nth-child(9) .column .tooltip img@src'],
                    },
                    notFinished: {
                        name: ['#achievements-section .row .toggle-display:nth-child(9) .column .m-disabled .media-card-caption .media-card-title'],
                        img: ['#achievements-section .row .toggle-display:nth-child(9) .column .m-disabled img@src']
                    }
                }
            },
        })( (err, data) => {
            if(err){
                reject();
                return;
            }

            resolve(data);
        });
    }
};

module.exports = blizzardSource;