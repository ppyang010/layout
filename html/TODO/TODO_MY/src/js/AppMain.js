var React=require('react');
var AppItem=require('./AppItem.js');

module.exports=React.createClass({
    render:function(){
        var self=this;
        var todoItems=this.props.todoItems||[];
        var AppItems=todoItems.map((item,index)=>{
            return <AppItem key={item.key} itemKey={item.key} title={item.title} state={item.state}
            changeState={self.props.changeState} delTodoItem={self.props.delTodoItem} />
        })
        return (
            <section className="main">
                <input type="checkbox" className="toggle-all" onChange={this.props.changeAllState}/>
                <ul className="todo-list">
                    {AppItems}
                </ul>
          </section>
        )
    }
});
