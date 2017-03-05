var React=require('react');

module.exports=React.createClass({
    getInitialState:function(){
        return {
            className:"",
        }
    },
    changeHandle:function(e){//修改状态
        if(this.props.changeState){
            this.props.changeState(this.props.itemKey);
            this.setState({
                className:this.state.className =='completed' ? '':'completed',
            });
        }
    },
    delHandle:function(e){//删除
        if(this.props.delTodoItem){
            this.props.delTodoItem(this.props.itemKey);
        }
    },
    dbclickHandle:function(e){//进入编辑界面
        this.setState({
            className:this.state.className =='editing' ? '':'editing',
        })
    },
    componentDidUpdate:function(nextProp){
        if(this.state.className=='editing'){
            this.refs['edit'].focus();
        }
    },
    render:function(){
        var state=this.props.state;
        // var className= state=='completed' ? 'completed':'';
        var className= this.state.className;
        var checked=  false;
        var editInput="";
        if(state=='completed'){
            className='completed';
            checked=true;
        }
        if(className=="editing"){
            editInput= <input type="text" ref="edit" className="edit" defaultValue={this.props.title} onBlur={this.dbclickHandle}/>;
        }
        return (
            <li className={className}  >
              <div className="view"  >
                <input type="checkbox" className="toggle"  checked={checked} onChange={this.changeHandle} />
                <label htmlFor onDoubleClick={this.dbclickHandle}  >{this.props.title}</label>
                <button className="destroy" onClick={this.delHandle} />
              </div>
              {editInput}
            </li>
        )
    }

})
