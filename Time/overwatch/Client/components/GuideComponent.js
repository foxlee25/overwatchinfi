/**
 * Created by jinz2 on 6/5/16.
 */
var React = require('react');
var AjaxService = require('../service/AjaxService');
var CommentsLib= require('../side-comments/release/side-comments.js');
//var SideComments=require('./CommentComponent.js');
var $ = require('jquery');
var Underscore = require('underscore');
var AppStore = require('../flux/Store.js');
var GuideCard = require('../views/GuideCard');
var properties = require('../i18/AppProps');
import { Router, Route, Link } from 'react-router'
var newest = 'newest';
var mostagree = 'mostagree';
var oldest = 'oldest';

var Guide = React.createClass({
    getInitialState: function(){
        return {
            guides: [],
            userId: null,
            currentSortType: 'newest'
        };
    },
    getGuides: function(control){
        var url = '/guide/allGuides';
        var currentPageIndex = this.state.currentPageIndex;
        if(control==='pre'){
            if (currentPageIndex > 1)
                currentPageIndex--;
        }else if(control==='next') {
            if (currentPageIndex <  this.state.totalNum)
                currentPageIndex++;
        }else if(control==='first'){
            currentPageIndex=1;
        }else if(control==='last'){
            currentPageIndex=this.state.totalNum;
        }
        this.state.currentPageIndex = currentPageIndex;
        AjaxService.post(url,{data :{sortType :this.state.currentSortType,pageIndex: currentPageIndex, guideNum : 10}},function(response){
            this.state.guides = response.data;
            this.forceUpdate();
            this.loadComments();
            window.scrollTo(0, 0);
        }.bind(this));
    },
    updateSort : function(sort){
        this.state.currentPageIndex = 1;
        this.state.currentSortType = sort;
        this.getGuides('first');

    },
    componentWillMount: function(){
        //check if user is login
        this.state.userId = window.sessionStorage.getItem('userId');
        this.state.currentPageIndex = 1;
        this.state.totalNum = 0;
        this.state.currentSortType = newest;
    },
    componentDidMount: function(){
        var userId = window.sessionStorage.getItem('userId');
        if(userId){
            var currentUser = {
                "id": userId,
                "name": userId
            };
        }else{
            var currentUser = {
                "id": 'Anonymous',
                "name": 'Anonymous'
            };
        }
        var SideComments = CommentsLib.addFile('side-comments');
        this.state.comments = new SideComments('#commentable-container', currentUser);
        this.state.comments.on('commentPosted', function( comment ) {
                var date = new Date();
                var dateIso = date.toISOString();
                comment.commentId = dateIso;
                this.state.comments.insertComment(comment);
                var url = '/guide/postComment';
                AjaxService.post(url,{data:comment},function(response){
                }.bind(this));
        }.bind(this));
        this.getGuides('first');
        var url = '/guide/getTotalGuideNum';
        AjaxService.post(url,{},function(response){
            this.state.totalNum = Math.ceil((response.data.guideNum / 10));
            this.forceUpdate();
        }.bind(this));
    },
    loadComments: function(){
        var existingComments = [];
        for(var i=0 ; i<this.state.guides.length ; i++){
            var guide = this.state.guides[i];
            if(guide.guideComment.length>0){
                var guideCommentModel = {};
                guideCommentModel.comments = [];
                for(var j= 0; j<guide.guideComment.length ; j++){
                     var guideCommentdb = guide.guideComment[j];
                     guideCommentModel.sectionId = guideCommentdb.sectionId;
                      var commentModel = {}
                    commentModel.comment = guideCommentdb.comment;
                    commentModel.authorName = guideCommentdb.authorName;
                    commentModel.authorId = guideCommentdb.authorId;
                    commentModel.id = guideCommentdb.commentId;
                    guideCommentModel.comments.push(commentModel);
                }
                existingComments.push(guideCommentModel);
            }
        };
        this.state.comments.initialize(existingComments);

    },
    render: function(){
        return (
            <div className="container-fluid">
        {this.state.userId?
        <div className="goToBuildGuide">
            <span className="buildLink buildLink-compact guide-header-button"><Link to={'/buildGuide'}>{properties.buildGuide}</Link></span>
        </div>
        :<div>
        <span className="buildLink buildLink-compact guide-header-button"><Link to={'/login'}>{properties.loginToBuildGuid}</Link></span>

        </div>}
              <div id="guideComponent" className="row">
                <div className="btn-group  guideSortButtonGroup">
                {this.state.currentSortType != 'newest' ? <a onClick={this.updateSort.bind(this,newest)}  className="btn btn-info" >Newest</a> : <a onClick={this.updateSort.bind(this,newest)}    className="btn btn-info active">Newest</a>}
                 {this.state.currentSortType != 'mostagree' ? <a onClick={this.updateSort.bind(this,mostagree)} className="btn btn-info" >Most Agree</a> : <a onClick={this.updateSort.bind(this,mostagree)} className="btn btn-info active">Most Agree</a>}
                {this.state.currentSortType != 'oldest' ? <a onClick={this.updateSort.bind(this,oldest)}  className="btn btn-info"  >Oldest</a> :<a onClick={this.updateSort.bind(this,oldest)} className="btn btn-info active">Oldest</a> }
                </div>
                <div id="commentable-container" className="container commentable-container">
                    {Underscore.map(this.state.guides, function(guide,index){
                        return( <div id={guide.createTime} data-section-id={guide.createTime} className="commentable-section"><GuideCard key={guide.createTime} guide={guide} /><div className="commentable-section-last"></div></div>);
                    }.bind(this))}
                </div>

                <nav className="pagin guide-pagin col-lg-12">
                    <ul className="pagination">
                        <li><a onClick={this.getGuides.bind(this,'first')}>First</a></li>
                        <li><a onClick={this.getGuides.bind(this,'pre')}>Pre</a></li>
                        <li><a href="#">{this.state.currentPageIndex} of {this.state.totalNum}</a></li>
                        <li><a onClick={this.getGuides.bind(this,'next')}>Next</a></li>
                        <li><a onClick={this.getGuides.bind(this,'last')}>Last</a></li>
                    </ul>
                </nav>

              </div>

            </div>
        );
    }
});

module.exports = Guide;