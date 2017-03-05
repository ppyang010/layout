!function(){
    var fn={
        /*
         * 获取光标位置
         * @Method getCursorPosition
         * @param input element
         * @return number
         */
        getCursorPosition: function(input){
            input=this.getDom(input);
            if (document.selection) {
                t.focus();
                var ds = document.selection;
                var range = ds.createRange();
                var stored_range = range.duplicate();
                stored_range.moveToElementText(input);
                stored_range.setEndPoint("EndToEnd", range);
                input.selectionStart = stored_range.text.length - range.text.length;
                input.selectionEnd = input.selectionStart + range.text.length;
                return input.selectionStart;
            } else return input.selectionStart
        },
        /*
         * 设置光标位置
         * @Method setCursorPosition
         * @param input element
         * @param p number
         * @return
         */
        setCursorPosition:function(input, start){
            input=this.getDom(input);
            input.selectionStart=start;
            input.selectionEnd=start;
            input.focus();
        },
        /*
         * 插入到光标后面
         * @Method add
         * @param t element
         * @param txt String
         * @return
         */
        add:function(input,text){
            input=this.getDom(input);
            var val = input.value;
            if(document.selection){
                input.focus()
                document.selection.createRange().text = txt;
            } else {
                var cp = input.selectionStart;
                var ubbLength =input.value.length;
                var s = input.scrollTop;
                input.value = input.value.slice(0,input.selectionStart) + text + input.value.slice(input.selectionStart, ubbLength);
                this.setCursorPosition(input, cp + text.length);
                firefox=navigator.userAgent.toLowerCase().match(/firefox\/([\d\.]+)/) && setTimeout(function(){
                    if(input.scrollTop != s) input.scrollTop=s;
                },0)

            };
        },
        /*
         * 删除光标 前面或者后面的 n 个字符
         * @Method del
         * @param t element
         * @param n number  n>0 后面 n<0 前面
         * @return
         * 重新设置 value 的时候 scrollTop 的值会被清0
         */
        del:function(input, n){
            input=this.getDom(input);
            var p = this.getCursorPosition(input);
            var s = input.scrollTop;
            var val = input.value;
            input.value = n > 0 ? val.slice(0, p - n) + val.slice(p):
                            val.slice(0, p) + val.slice(p - n);
            this.setCursorPosition(input ,p - (n < 0 ? 0 : n));
            firefox=navigator.userAgent.toLowerCase().match(/firefox\/([\d\.]+)/) && setTimeout(function(){
                if(input.scrollTop != s) input.scrollTop=s;
            },10)
        },
        /*
         * 选中一个字符串
         * @Method sel
         * @param t element
         * @param s String
         * @return
         */
        selString:function(t, s){
            t=this.getDom(t);
            var index = t.value.indexOf(s);
            index != -1 ? this.sel(t, index, index + s.length) : false;
        },
        /*
         * 选中 s 到 z 位置的文字
         * @Method sel
         * @param t element
         * @param s number
         * @param z number
         * @return
         */
        sel:function(input,start,end){
            input=this.getDom(input);
            if(input.setSelectionRange){
                input.setSelectionRange(start,end);
            }else if (input.createTextRange) { //兼容IE8-
                var range = input.createTextRange();
                range.collapse(true);
                range.moveStart("character", start);
                range.moveEnd("character", end);
                range.select();
            }
            input.focus();

        },
        getDom:function(input){
            if(! (input instanceof HTMLElement)){
                input=document.getElementById(input);
            }
            return input;
        }
    }
    window.TT=fn;
}()
