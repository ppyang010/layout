var React=require('react');
var ReactDOM=require('react-dom');

module.exports=React.createClass({
    keyDownHandle:function(e){
        if(e.keyCode==13){
            var input=this.refs['newItem'];
            if(input.value.length!=0 ){
                var newItem={
                    title:input.value,
                    state:'active',
                };
                if(this.props.addTodoItem){
                    this.props.addTodoItem(newItem);
                    input.value='';
                }
            }
        }
    },
    render:function(){
        return (
            <header className="header">
                <h1>todos</h1>
                <input type="text" ref="newItem" className="new-todo" placeholder="有什么事情需要去做？" onKeyDown={this.keyDownHandle} />
            </header>
        )
    }
});
