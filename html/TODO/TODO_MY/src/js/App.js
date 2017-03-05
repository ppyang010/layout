var React=require('react');
var ReactDOM=require('react-dom');
var AppHeader=require('./AppHeader.js');
var AppMain=require('./AppMain.js');
var AppFooter=require('./AppFooter.js');
var util=require('./storageUtil.js');
module.exports=React.createClass({
    getInitialState:function(){
        var todoItems=[{
            key:1,
            title:'sad',
            state:'completed',
        },{
            key:2,
            title:'good',
            state:'active',
        }];
        // return {
        //     todoItems:todoItems,
        // }
        return {
            displayState:'all',//显示的分类
        }
    },
    changeState:function(key){//修改状态
        var todoItems=this.state.todoItems||[];
        var index=this.getItem(key);
        if(index>-1){
            todoItems[index].state= todoItems[index].state=='active' ? 'completed' : 'active';
            this.setState({
                todoItems:todoItems,
            })
        }
    },
    changeAllState:function(e){//全选或全不选
        var todoItems=this.state.todoItems||[];
        if(e.target.checked){
            todoItems.forEach((item,index)=>{
                item.state='completed';
            });
        }else{
            todoItems.forEach((item,index)=>{
                item.state='active';
            });
        }

        this.setState({
            todoItems:todoItems,
        })
    },
    addTodoItem:function(newItem){//添加todoitem
        var todoItems=this.state.todoItems||[];
        if(todoItems.length==0){
            newItem.key=0;
        }else{
            newItem.key=(todoItems[0].key+1) || 0;
        }
        todoItems[todoItems.length]=newItem;
        todoItems.sort((a,b)=>{
            return b.key-a.key;
        });
        this.setState({
            todoItems:todoItems,
        });
    },
    delTodoItem:function(key){
        var index=this.getItem(key);
        var todoItems=this.state.todoItems||[];
        console.log(index);
        if(index>-1){
            todoItems.splice(index,1);
            this.setState({
                todoItems:todoItems,
            })
        }else{
            console.log('key 不存在');
        }
    },
    changeDisplayState:function(state){//修改显示状态
        this.setState({
            displayState:state,
        })
    },
    getItem:function(key){//根据key获取item
        var todoItems=this.state.todoItems||[];
        var _index=-1;
        todoItems.every((item,index)=>{
            if(item.key==key){
                _index=index;
                return false;
            }
            return true;
        })
        return _index;
    },
    getItemCountByState:function(state){//获取activeitem数量
        var todoItems=this.state.todoItems||[];
        var count=0;
        if(state=='all'){
            return todoItems.length;
        }else{
            todoItems.forEach((item,index)=>{
                if(item.state==state){
                    count++;
                }
            })
            return count;
        }

    },
    getShowTodoItems:function(){//获取需要显示的todoitem
        var todoItems=this.state.todoItems||[];
        var displayState=this.state.displayState||'all';
        if(displayState=='all'){
            return todoItems;
        }else{
            var showTodoItems=todoItems.filter((item,index)=>{
                if(item.state==displayState){
                    return true;
                }
                return false;
            });
            return showTodoItems;
        }
    },
    clearCompletedHandle:function(){
        var todoItems=this.state.todoItems||[];
        var newList=todoItems.filter((item,index)=>{
            if(item.state=="active"){
                return true;
            }else{
                return false;
            }
        });
        this.setState({
            todoItems:newList,
        });
    },
    componentWillMount:function(){//插入真实dom前
        var todoItems=util.getItem('todoItems')||[];
        this.setState({
            todoItems:todoItems,
        })
    },
    componentDidUpdate:function(){//更新dom后
        util.setItem('todoItems',this.state.todoItems);
    },
    render:function(){
        var todoItems=this.state.todoItems||[];
        var showTodoItems=this.getShowTodoItems();
        var activeItemCount=this.getItemCountByState('active');
        var completedItemCount=this.getItemCountByState('completed');
        if(todoItems.length>0){
            return (
                <div>
                    <AppHeader addTodoItem={this.addTodoItem}/>
                    <AppMain todoItems={showTodoItems} changeState={this.changeState}  changeAllState={this.changeAllState}
                    delTodoItem={this.delTodoItem} />
                    <AppFooter activeItemCount={activeItemCount} displayState={this.state.displayState}  changeDisplayState={this.changeDisplayState}
                        completedItemCount={completedItemCount} clearCompletedHandle={this.clearCompletedHandle}/>
                </div>
            )
        }else{
            return (
                <div>
                    <AppHeader addTodoItem={this.addTodoItem}/>
                </div>
            )
        }

    }
});
