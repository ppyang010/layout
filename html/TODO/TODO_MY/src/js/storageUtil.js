var util={
    setItem:function(key,value){
        if(typeof value =="object"){
            value=JSON.stringify(value);
        }
        localStorage.setItem(key,value);
    },
    getItem:function(key){
        var item=localStorage.getItem(key)||null;
        if(item){
            item=JSON.parse(item);
        }
        return item;
    }
}

module.exports=util;
