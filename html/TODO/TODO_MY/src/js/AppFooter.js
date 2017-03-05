var React=require('react');

module.exports=React.createClass({
    clickHandle:function(state){
        this.props.changeDisplayState(state);
    },
    render:function(){
        var displayState=this.props.displayState||'all';
        var completedItemCount=this.props.completedItemCount|| 0;
        var button="";
        if(completedItemCount>0){
            button=<button className="clear-completed" onClick={this.props.clearCompletedHandle}>Clear completed</button>;
        }
        return (
            <footer className="footer">
                <span className="todo-count">
                  <strong>{this.props.activeItemCount}</strong>
                  <span />
                  <span>items</span>
                  <span>left</span>
                </span>
                <ul className="filters">
                  <li><a href="#/" className={displayState=='all' ? 'selected' : ''} onClick={()=>{
                      this.clickHandle('all')
                  }}>All</a></li>

                  <li><a href="#/active" className={displayState=='active' ? 'selected' : ''} onClick={this.clickHandle.bind(this,'active')}>Active</a></li>
                  <li><a href="#/completed" className={displayState=='completed' ? 'selected' : ''} onClick={this.clickHandle.bind(this,'completed')} >Completed</a></li>
                </ul>
                {button}
          </footer>
        )
    }
});
