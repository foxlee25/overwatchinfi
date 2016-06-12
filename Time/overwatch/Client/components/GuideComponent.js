/**
 * Created by jinz2 on 6/5/16.
 */
var React = require('react');
var AjaxService = require('../service/AjaxService');
var CommentsLib= require('../side-comments/release/side-comments.js');
var $ = require('jquery');
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
            this.loadComments();
        }.bind(this));
    },
    componentWillMount: function(){
        //check if user is login
        this.state.userId = window.sessionStorage.getItem('userId');
    },
    componentDidMount: function(){
        this.getGuides();
    },
    loadComments: function(){
        var existingComments = [
            {
                "sectionId": "1",
                "comments": [
                    {
                        "id": 88,
                        "authorName": "Jon Sno",
                        "authorId": 1,
                        "comment": "I'm Ned Stark's bastard. Related: I know nothing."
                    },
                    {
                        "id": 112,
                        "authorName": "Donald Draper",
                        "authorId": 2,
                        "comment": "I need a scotch."
                    }
                ]
            },
            {
                "sectionId": "3",
                "comments": [
                    {
                        "id": 66,
                        "authorName": "Senator Clay Davis",
                        "authorId": 3,
                        "comment": "These Side Comments are incredible. Sssshhhiiiiieeeee."
                    }
                ]
            }
        ];
        var currentUser = {
            "id": 4,
            "authorUrl": "http://google.com/",
            "name": "You"
        };
        var SideComments = CommentsLib.addFile('side-comments');
        var comments = new SideComments('#commentable-container', currentUser, existingComments);
        comments.on('commentPosted', function( comment ) {
            comment.id = parseInt(Math.random() * (100000 - 1) + 1);
            comments.insertComment(comment);
        });
        comments.on('commentDeleted', function( comment ) {
            comments.removeComment(comment.sectionId, comment.id);
        });
    },
    render: function(){
        return (
            <div className="container-fluid">
        {this.state.userId?
        <div className="goToBuildGuide">
            <Link to={'/buildGuide'}><button className="btn btn-lg btn-block btn-info ">{properties.buildGuide}</button></Link>
        </div>
        :<div>
        <Link to={'/login'}> <button className="btn btn-lg btn-block btn-info">{properties.loginToBuildGuid}</button></Link>
        </div>}
              <div id="guideComponent" className="row">
               <div id="commentable-container" className="container commentable-container">
                    {Underscore.map(this.state.guides, function(guide,index){
                        return( <div data-section-id={index} className="commentable-section"><GuideCard key={guide.createTime} guide={guide} /><div className="commentable-section-last"></div></div>);
                    }.bind(this))}
                </div>
              </div>

            </div>
        );
    }
});

module.exports = Guide;