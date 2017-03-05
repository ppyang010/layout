var React =require('react');

module.exports=React.createClass({
    formHandle:function(event){
        event.preventDefault();
        console.dir(this);
        var newQuestion={
            title:this.refs['qtitle'].value,
            description:this.refs['qtextarea'].value,
            voteCount: 0,
        };
        this.refs['qform'].reset();
        if(this.props.onNewQuestion){
            this.props.onNewQuestion(newQuestion)
        }
    },
    reset:function(){
        this.refs['qform'].reset();
        this.props.onToggleForm();
    },
    render:function(){
        var styleObj={
            display:this.props.formDisplayed? 'block' : 'none',
        };
        // console.log(styleObj);
        return (
            <form name="addQuestion" ref="qform" className="clearfix" style={styleObj} onSubmit={this.formHandle} >
              <div className="form-group">
                <label htmlFor="qtitle">问题</label>
                <input type="text" ref="qtitle" className="form-control" id="qtitle" placeholder="您的问题的标题" />
              </div>
              <textarea className="form-control"  ref="qtextarea" rows={3} placeholder="问题的描述" defaultValue={""} />
              <button className="btn btn-success pull-right"  >确认</button>
              <a className="btn btn-default pull-right" onClick={this.reset}>取消</a>
            </form>
        )
    }
})
