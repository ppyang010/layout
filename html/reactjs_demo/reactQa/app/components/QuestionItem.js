var React =require('react');

module.exports=React.createClass({
    voteUp:function(){
        var newCount=+this.props.voteCount+1;
        this.props.voteChange(this.props.questionKey,newCount);
    },
    voteDown:function(){
        var newCount=+this.props.voteCount-1;
        this.props.voteChange(this.props.questionKey,newCount);
    },
    render:function(){
        return (
            <div className="media">
              <div className="media-left">
                <button className="btn btn-default" onClick={this.voteUp} >
                  <span className="glyphicon glyphicon-chevron-up" />
                  <span className="vote-count">{this.props.voteCount}</span>
                </button>
                <button className="btn btn-default"  onClick={this.voteDown}>
                  <span className="glyphicon glyphicon-chevron-down" />
                </button>
              </div>
              <div className="media-body">
                <h4 className="media-heading">{this.props.title}</h4>
                <p>{this.props.description}</p>
              </div>
            </div>
        )
    }
})
