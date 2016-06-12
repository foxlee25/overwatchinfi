/**
 * Created by jinz2 on 6/7/16.
 */
var React = require('react');
var AjaxService = require('../service/AjaxService');
var CommentsLib= require('../side-comments/release/side-comments.js');
var $ = require('jquery');
var Comment = React.createClass({
    getInitialState: function(){
        return {

        };
    },

    render: function(){
        return (
            <div id="commentable-container" className="container commentable-container">

        <div data-section-id="1" className="commentable-section">
            Each paragraph tag has the "commentable-section" class, making it a section which can be commented on after you've initialized a new SideComments object and pointed it at the parent element, which is "#commentable-container" for this demo.
        </div>
        <div data-section-id="2" className="commentable-section">
            Clicking on the markers on the right will show the SideComments. Sections without any comments only show their marker on hover.
        </div>
        <div data-section-id="3" className="commentable-section">
            This is the default theme that comes with SideComments.js. You can easily theme SideComments to your liking by not including "default-theme.css" and just styling it all yourself.
        </div>
        </div>
        );
    },
    componentDidMount: function(){
        var existingComments = [
            {
                "sectionId": "1",
                "comments": [
                    {
                        "id": 88,
                        "authorName": "Jon Sno",
                        "authorId": 1,
                        "authorUrl": "http://en.wikipedia.org/wiki/Kit_Harington",
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
    }
});

module.exports = Comment;
