import ElementUI from 'element-ui'
const All = {}
var is = function(obj, type) {
  let className = Object.prototype.toString.call(obj).slice(8, -1)
  return obj !== undefined && obj !== null && className === type
}
All.Copy= function(e){
  const input = document.createElement("input");
  document.body.appendChild(input);
  input.setAttribute("value", e);
  input.select();
  if (document.execCommand("copy")) {
    document.execCommand("copy");
    ElementUI.Message('成功复制单号')
  }else{
    ElementUI.Message.error('单号复制失败')
  }
  document.body.removeChild(input);
}
All.randomRgb= function(item){
  let R = Math.floor(Math.random() * 100);
  let G = Math.floor(Math.random() * 100);
  let B = Math.floor(Math.random() * 255);
  if(R==G==B==255){
    R=G=B=0
  }
  return {
    background: 'rgb(' + R + ',' + G + ',' + B + ')'
  };
}
All.tofixed= function(a){
  var aa = a?a.toString():''
  var b = ''
  if(aa&&aa!='0.00'){
    var b = (aa.match(/^\d*(\.?\d{0,2})/g)[0]) || null 
  }else{
    b=aa
  }
  return b
}
All.goTop= function(){
    // 回到顶部
  let top = document.documentElement.scrollTop || document.body.scrollTop;
  // 实现滚动效果 
  const timeTop = setInterval(() => {
    document.body.scrollTop = document.documentElement.scrollTop = top -= 50;
    if (top <= 0) {
      clearInterval(timeTop);
    }
  }, 10);
}
All.getDate = function(time,is_hours){
  if(time){
    const date = new Date(time);
    var y = date.getFullYear()
    var m = date.getMonth() + 1
    var d = date.getDate()
    var h = date.getHours().toString()==='0'?'00':date.getHours().toString()
    var f = date.getMinutes().toString()==='0'?'00':date.getMinutes().toString()
    var s = date.getSeconds().toString()==='0'?'00':date.getSeconds().toString()
    if (m < 10) {
      m = "0" + m;
    }
    if (d < 10) {
      d = "0" + d;
    }
    if(!is_hours){
      return y+'-'+m+'-'+d
    }else{
      return y+'-'+m+'-'+d+' '+h+':'+f+':'+s
    }
  }else{
    return ''
  }
}
All.getEnumValue = function(enums, pid, keyName) {
  // eslint-disable-next-line valid-typeof
  if(!keyName){
    keyName='name'
  }
  if (is(enums, 'Object')) {
    return enums.hasOwnProperty(pid) && enums[pid].hasOwnProperty(keyName) ? enums[pid][keyName] : ''
  }
  if (!is(pid, 'Number')) {
    return ''
  }
  if (is(enums, 'Array')) {
    for (var i = 0; i < enums.length; i++) {
      // eslint-disable-next-line eqeqeq
      if (enums[i].hasOwnProperty('pid') && enums[i].hasOwnProperty(keyName) && enums[i].pid === pid) {
        return enums[i][keyName]
      }
      // return (enums[i].hasOwnProperty('id') && enums[i].hasOwnProperty('name') && enums[i].id == id) ? enums[i].name : '';
    }
  }
  return ''
}
All.checkNumber = function(theObj) {
  if(theObj){
    var reg = /^[0-9]+.?[0-9]*$/;
    if (reg.test(theObj)) {
      return true;
    }else{
      return false;
    }
  }else{
    return true;
  }
}
All.URL = process.env.API_BASEURL
export default All