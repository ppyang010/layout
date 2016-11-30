!function(){
    // selects 下拉框dom数组
    function Cascade(selects,data){
        this._selects=Array.prototype.slice.call(selects,0)||[]
        this._data=data;
        this._init();
    }
    Cascade.prototype={
        //初始化
        _init:function(){
            var allData=this._data;
            var selects=this._selects;
            var dataList=[];
            //解析数据
            for(var i=0,len=allData.length;i<len;i++){
                dataList[dataList.length]=allData[i]['name'];
            }
            console.log(dataList);
            this.fillSelect(selects[0],dataList);
            this._initEvent();
        },
        //初始化事件
        _initEvent:function(){
            var selects=this._selects
            selects.forEach(function(item){
                addEvent(item,'change',function(){
                    console.log('change');
                })
            })
        },
        //更新下拉框数据
        fillSelect:function(select,list){
            //清空原有数据
            for(var i=select.options.length-1;i>=0;i--){
                select.remove(i);
            }
            list.forEach(function(item){
                var option=new Option(item,item);
                select.appendChild(option);
                //select.add(option);
            })

        },
        //重置下拉框
        resetSelect:function(select){
            select.selectedIndex=0;
        }
    }

    function addEvent(dom,type,fn){
        if(dom.addEventListener){
            dom.addEventListener(type,fn);
        }else if(dom.attachEvent){
            dom.attachEvent('on'+type,fn);
        }else{
            dom['on'+type]=fn;
        }
    }
window.Cascade=Cascade;
}()
