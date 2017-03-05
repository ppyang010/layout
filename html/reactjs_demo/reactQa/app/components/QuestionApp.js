var React=require('react');
var QuestionForm=require('./QuestionForm.js');
var QuestionList=require('./QuestionList.js');
var QuestionButton=require('./QuestionButton.js');
// var ReactDOM=require('react-dom');
module.exports= React.createClass({
    getInitialState:function(){
        return {
            formDisplayed:false,
        }
    },
    getDefaultProps:function(){
        var questions=[{
            key: 1,
            title:'产品经理与程序员矛盾的本质是什么1？',
            description:'理性探讨，请勿撕逼。产品经理的主要工作职责是产品设计。接受来自其他部门的需求，经过设计后交付研发。但这里有好些职责不清楚的地方。',
            voteCount: 10,
        },{
            key: 2,
            title:'热爱编程是一种怎样的体验？',
            description:'别人对玩游戏感兴趣，我对写代码、看技术文章感兴趣；把泡github、stackoverflow、v2ex、reddit、csdn当做是兴趣爱好；遇到重复的工作，总想着能不能通过程序实现自动化；喝酒的时候把写代码当下酒菜，边喝边想边敲；不给工资我也会来加班；做梦都在写代码。',
            voteCount: 8,
        }
        ]
        return {
            questions:questions
        }
    },
    componentWillMount:function(){
        //模拟重外部获取数据
        if(!!this.props.questions){
            this.setState({
                questions:this.props.questions,
            })
        }
    },
    onToggleForm:function(){
        this.setState({
            formDisplayed:!this.state.formDisplayed,
        })
    },
    onNewQuestion:function(newQuestion){
        var questions=this.state.questions;
        newQuestion.key=questions.length+1;
        questions=questions.concat(newQuestion);
        questions.sort(function(a,b){
            return b.key-a.key
        });
        console.log('end');
        this.setState({
            questions:questions,
        })
    },
    voteChange:function(key,newCount){//顶 踩
        var questions=this.state.questions;
        var _index;
        questions.every(function(item,index){
            if(item.key=key){
                _index=index;
                return false;
            }else{
                return true;
            }
        });
        questions[_index].voteCount=newCount;
        this.setState({
            questions:questions,
        })

    },
    render: function() {
    return (
    <div>
        <div className="jumbotron text-center">
          <div className="container">
            <h1>React问答</h1>
            <QuestionButton onToggleForm={this.onToggleForm}/>
          </div>
        </div>
        <div className="main container">
          <QuestionForm
           onNewQuestion={this.onNewQuestion}
           formDisplayed={this.state.formDisplayed}
           onToggleForm={this.onToggleForm} />

          <QuestionList questions={this.state.questions} voteChange={this.voteChange}/>

        </div>
    </div>
    );
    }
});
