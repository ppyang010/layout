/**通用级联下拉款
*version 1.0
*
**/
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
            //获取第一个下拉框所需数据
            dataList=getDataList(allData);
            //为空下拉款添加默认选项
            selects.forEach(function(item){
                addDefaultOption(item);
            })
            //填充第一个select的数据
            this.fillSelect(selects[0],dataList);
            //初始化select事件
            this._initEvent();
            //重置全部select
            this.resetSelectAll();
        },
        //初始化事件
        _initEvent:function(){
            var selects=this._selects;
            var data=this._data;//存放筛选过的数据

            for(var i=0,len=selects.length;i<len;i++){
                (function(index,max,allData){
                    addEvent(selects[index],'change',function(){//change事件
                        changeHandle(index,max,allData);
                    });
                    addEvent(selects[index],'focus',function(){//focus事件  用于解决重复选中相同内容怎么触发onChage事件  //主要用于只有一个数据的时候点击不会触发change事件
                        this.selectedIndex=-1;
                    });
                })(i,len,data);
            }
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
        //重置全部下拉框
        resetSelectAll:function(){
            if(this._selects.length>0){
                this._selects[0].selectedIndex=0;
                // dispatchEvent(selects[0],'change');
                changeHandle(0,this._selects.length,this._data);
            }
        }
    }

    //添加默认选项
    function addDefaultOption(select){
        if(select.options.length==0){
            var opt=new Option('请选择','请选择');
            select.appendChild(opt);
        }
    }
    //change事件处理函数
    function changeHandle(index,max,allData){
        //判断是否还有下一个下拉框
        if(index+1<max){
            //  console.log('change');
            // selects[index+1]
            var key=[];//下拉框选择值数组
            var data=allData;
            for(var i=0;i<index+1;i++){
                key[key.length]=selects[i].value;
            }
            //筛选数据
            for(var j in key){
                var flag=data.some(function(item){
                    if(item['name']==key[j]){//TODO
                        data=item['city'];//TODO
                        return true;
                    }
                    return false;
                });
                //如果没有下一级的数据
                if(!flag){
                    data=[];
                    Cascade.prototype.fillSelect(selects[index+1],['无数据']);
                }
            }
            //判断有无下一级数据
            if(data.length>0){
                //将筛选过后数据中的 name/text获取出来
                var dataList=[];
                if(typeof data[0] !='object'){//当前json数据接口问题 兼容方式
                    dataList=data;
                }else{
                    dataList=getDataList(data);
                }
                //更新下拉框
                Cascade.prototype.fillSelect(selects[index+1],dataList);
            }

            //重置index+2及以后的下拉框数据
            for(var i=index+2;i<max;i++){
                Cascade.prototype.fillSelect(selects[i],['请选择']);
            }

        }
    }
    //获取用于填充到select中的数据
    function getDataList(data){
        var dataList=[];
        for(var i=0,len=data.length;i<len;i++){
            dataList[dataList.length]=data[i]['name'];//TODO
        }
        return dataList;
    }
    //添加事件
    function addEvent(dom,type,fn){
        if(dom.addEventListener){
            dom.addEventListener(type,fn);
        }else if(dom.attachEvent){
            dom.attachEvent('on'+type,fn);
        }else{
            dom['on'+type]=fn;
        }
    }
    //触发事件
    // function dispatchEvent(dom,type){
    //     if(dom.dispatchEvent){
    //         console.dir(dom);
    //         dom.dispatchEvent(type);
    //     }else{
    //         dom.fireEvent('on'+type);
    //     }
    // }

window.Cascade=Cascade;
}();
