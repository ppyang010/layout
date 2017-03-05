var React =require('react');
var QuestionItem=require('././QuestionItem.js');
module.exports=React.createClass({


    render:function(){
        var self=this;
        var questions=this.props.questions||[];
        if(questions instanceof Array){
            var questionComps=questions.map(function(item){
                return <QuestionItem key={item.key} questionKey={item.key} title={item.title} description={item.description} voteCount={item.voteCount}
                        voteChange={self.props.voteChange} />
            });
        }else{
            throw Error("questions不是数组");
        }

        return (
            <div id="questions" className>
                {questionComps}
            </div>
        )
    }
})
