(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-b6d46304"],{"0473":function(e,t,a){"use strict";a("7605")},1276:function(e,t,a){"use strict";var n=a("d784"),i=a("44e7"),l=a("825a"),r=a("1d80"),s=a("4840"),c=a("8aa5"),o=a("50c4"),d=a("14c3"),u=a("9263"),p=a("d039"),h=[].push,f=Math.min,g=4294967295,b=!p((function(){return!RegExp(g,"y")}));n("split",2,(function(e,t,a){var n;return n="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||".".split(/()()/).length>1||"".split(/.?/).length?function(e,a){var n=String(r(this)),l=void 0===a?g:a>>>0;if(0===l)return[];if(void 0===e)return[n];if(!i(e))return t.call(n,e,l);var s,c,o,d=[],p=(e.ignoreCase?"i":"")+(e.multiline?"m":"")+(e.unicode?"u":"")+(e.sticky?"y":""),f=0,b=new RegExp(e.source,p+"g");while(s=u.call(b,n)){if(c=b.lastIndex,c>f&&(d.push(n.slice(f,s.index)),s.length>1&&s.index<n.length&&h.apply(d,s.slice(1)),o=s[0].length,f=c,d.length>=l))break;b.lastIndex===s.index&&b.lastIndex++}return f===n.length?!o&&b.test("")||d.push(""):d.push(n.slice(f)),d.length>l?d.slice(0,l):d}:"0".split(void 0,0).length?function(e,a){return void 0===e&&0===a?[]:t.call(this,e,a)}:t,[function(t,a){var i=r(this),l=void 0==t?void 0:t[e];return void 0!==l?l.call(t,i,a):n.call(String(i),t,a)},function(e,i){var r=a(n,e,this,i,n!==t);if(r.done)return r.value;var u=l(e),p=String(this),h=s(u,RegExp),v=u.unicode,m=(u.ignoreCase?"i":"")+(u.multiline?"m":"")+(u.unicode?"u":"")+(b?"y":"g"),w=new h(b?u:"^(?:"+u.source+")",m),y=void 0===i?g:i>>>0;if(0===y)return[];if(0===p.length)return null===d(w,p)?[p]:[];var x=0,k=0,_=[];while(k<p.length){w.lastIndex=b?k:0;var L,S=d(w,b?p:p.slice(k));if(null===S||(L=f(o(w.lastIndex+(b?0:k)),p.length))===x)k=c(p,k,v);else{if(_.push(p.slice(x,k)),_.length===y)return _;for(var C=1;C<=S.length-1;C++)if(_.push(S[C]),_.length===y)return _;k=x=L}}return _.push(p.slice(x)),_}]}),!b)},"129f":function(e,t){e.exports=Object.is||function(e,t){return e===t?0!==e||1/e===1/t:e!=e&&t!=t}},"12d1":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[a("div",[a("el-row",[a("el-col",{attrs:{span:6}},[e._v(" 激活码批次："),a("el-input",{staticStyle:{width:"150px"},attrs:{clearable:"",placeholder:"激活码批次"},model:{value:e.filename,callback:function(t){e.filename=t},expression:"filename"}})],1),a("el-col",{attrs:{span:6}},[e._v(" 实例等级： "),a("el-select",{ref:"optionRef",staticStyle:{width:"200px"},attrs:{clearable:"",placeholder:"请选择"},on:{change:e.selectlevel},model:{value:e.searchlevel,callback:function(t){e.searchlevel=t},expression:"searchlevel"}},e._l(e.leveloptions,(function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.name}})})),1)],1),a("el-col",{staticClass:"text-center",attrs:{span:5}},[e._v(" 备注: "),a("el-input",{staticStyle:{width:"150px"},attrs:{clearable:"",placeholder:"备注"},model:{value:e.remark,callback:function(t){e.remark=t},expression:"remark"}})],1),a("el-button",{attrs:{type:""},on:{click:e.ClickSearch}},[e._v(" 清空 ")]),a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.activateList("search")}}},[e._v(" 搜索 ")]),a("el-button",{attrs:{type:"primary"},on:{click:e.handleAdd}},[e._v(" 新增 ")])],1)],1),a("el-table",{staticStyle:{width:"100%","margin-top":"30px"},attrs:{data:e.rolesList,border:""}},[a("el-table-column",{attrs:{type:"selection",align:"center"}}),a("el-table-column",{attrs:{align:"center",label:"激活码批次",width:"220"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(t.row.batchCode)+" ")]}}])}),a("el-table-column",{attrs:{align:"center",label:"到期时间",width:"220"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(t.row.expireTime)+" ")]}}])}),a("el-table-column",{attrs:{align:"center",label:"使用天数",width:"220"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(t.row.useDay)+" ")]}}])}),a("el-table-column",{attrs:{align:"center",label:"实例等级"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(t.row.levelName)+" ")]}}])}),a("el-table-column",{attrs:{align:"center",label:"有效范围"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" 开始时间："+e._s(t.row.createTime)),a("br"),e._v(" 结束时间："+e._s(t.row.expireTime)),a("br")]}}])}),a("el-table-column",{attrs:{align:"center",label:"备注"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(t.row.remark)+" ")]}}])}),a("el-table-column",{attrs:{align:"center",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){return e.handleEdit(t.row)}}},[e._v("详情")])]}}])})],1),a("el-dialog",{attrs:{visible:e.dialogVisible,title:"新增激活码批次","append-to-body":""},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("el-form",{attrs:{"label-width":"120px","label-position":"left"}},[a("el-form-item",{attrs:{label:"激活码批次"}},[a("el-input",{staticStyle:{width:"150px"},attrs:{clearable:"",placeholder:"激活码批次"},model:{value:e.addList.batchCode,callback:function(t){e.$set(e.addList,"batchCode",t)},expression:"addList.batchCode"}})],1),a("el-form-item",{attrs:{label:"到期时长"}},[a("el-date-picker",{staticStyle:{width:"150px"},attrs:{type:"date",placeholder:"选择时长","value-format":"yyyy-MM-dd","picker-options":e.pickerOptions},model:{value:e.addList.expireTime,callback:function(t){e.$set(e.addList,"expireTime",t)},expression:"addList.expireTime"}})],1),a("el-form-item",{attrs:{label:"使用时长"}},[a("el-input",{staticStyle:{width:"150px"},attrs:{clearable:""},model:{value:e.addList.useDay,callback:function(t){e.$set(e.addList,"useDay",t)},expression:"addList.useDay"}})],1),a("el-form-item",{attrs:{label:"激活数量"}},[a("el-input",{staticStyle:{width:"150px"},attrs:{clearable:"",placeholder:"激活数量"},model:{value:e.addList.num,callback:function(t){e.$set(e.addList,"num",t)},expression:"addList.num"}})],1),a("el-form-item",{attrs:{label:"实例等级"}},[a("el-select",{ref:"optionRef",staticStyle:{width:"250px"},attrs:{clearable:"",placeholder:"请选择"},on:{change:e.selectChange1},model:{value:e.instanceLevel,callback:function(t){e.instanceLevel=t},expression:"instanceLevel"}},e._l(e.leveloptions,(function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.name}})})),1)],1),a("el-form-item",{attrs:{label:"备注"}},[a("el-input",{attrs:{clearable:"",placeholder:"备注",autosize:{minRows:2,maxRows:4},type:"textarea"},model:{value:e.addList.remark,callback:function(t){e.$set(e.addList,"remark",t)},expression:"addList.remark"}})],1),a("el-button",{staticStyle:{margin:"20px 0 0px 20px"},attrs:{loading:e.btnLoading,type:"primary"},on:{click:e.Addactivate}},[e._v(" 提交 ")]),a("el-button",{staticStyle:{margin:"20px 0 0px 20px"},on:{click:function(t){e.dialogVisible=!1}}},[e._v(" 取消 ")])],1)],1),a("el-dialog",{attrs:{visible:e.dialogdetail,title:"激活码详情","append-to-body":"",width:"80%"},on:{"update:visible":function(t){e.dialogdetail=t}}},[a("div",[a("el-row",[a("el-col",{attrs:{span:5}},[e._v(" 使用方式: "),a("el-select",{ref:"optionRef",staticStyle:{width:"150px"},attrs:{clearable:"",placeholder:"请选择"},on:{change:e.selectChange2},model:{value:e.isRenew,callback:function(t){e.isRenew=t},expression:"isRenew"}},e._l(e.statusoptions,(function(e){return a("el-option",{key:e.status,attrs:{label:e.name,value:e.name}})})),1)],1),a("el-col",{attrs:{span:5}},[e._v(" 激活码: "),a("el-input",{staticStyle:{width:"150px"},attrs:{clearable:"",placeholder:"激活码"},model:{value:e.search.batchCode,callback:function(t){e.$set(e.search,"batchCode",t)},expression:"search.batchCode"}})],1),a("el-button",{attrs:{type:""},on:{click:e.ClickDetailSearch}},[e._v(" 清空 ")]),a("el-button",{attrs:{type:"primary"},on:{click:e.handleSearch}},[e._v(" 搜索 ")]),a("el-button",{attrs:{type:"primary",loading:e.btnLoading},on:{click:function(t){return e.handleUse(!0)}}},[e._v(" 更新已使用 ")]),a("el-button",{attrs:{type:"primary",loading:e.btnLoading},on:{click:function(t){return e.handleUse(!1)}}},[e._v(" 更新未使用 ")]),a("el-button",{attrs:{type:"primary",loading:e.btnLoading},on:{click:e.handleDownload}},[e._v(" 导出 ")])],1)],1),a("el-table",{staticStyle:{width:"100%","margin-top":"30px"},attrs:{data:e.detailsList,border:""},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",align:"center"}}),a("el-table-column",{attrs:{align:"center",label:"激活码"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(t.row.code)+" ")]}}])}),a("el-table-column",{attrs:{align:"center",label:"创建时间",width:"220"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(t.row.createTime)+" ")]}}])}),a("el-table-column",{attrs:{align:"center",label:"激活操作类型"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(e._f("relateIdtype")(t.row.relateId))),a("br")]}}])}),a("el-table-column",{attrs:{align:"center",label:"启用状态"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" 激活状态："+e._s(e._f("capitalize")(t.row.isBind))+" "),a("br"),e._v(" 是否启用："+e._s(e._f("capitalize")(t.row.isBind))+" "),a("br"),e._v(" 是否已使用："+e._s(e._f("capitalize")(t.row.isUse))+" "),a("br")]}}])})],1),a("pagination",e._g({directives:[{name:"show",rawName:"v-show",value:e.total1>0,expression:"total1>0"}],attrs:{total:e.total1,page:e.page1,limit:e.limit1},on:{"update:page":function(t){e.page1=t},"update:limit":function(t){e.limit1=t},pagination:e.refresh1}},e.$listeners))],1),a("pagination",e._g({directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total>0"}],attrs:{total:e.total,page:e.page,limit:e.limit},on:{"update:page":function(t){e.page=t},"update:limit":function(t){e.limit=t},pagination:e.refresh}},e.$listeners))],1)},i=[],l=a("c7eb"),r=a("1da1"),s=(a("7db0"),a("d81d"),a("b0c0"),a("d3b7"),a("ac1f"),a("3ca3"),a("841c"),a("1276"),a("ddb0"),a("2b3d"),a("bf19"),a("9861"),a("333d")),c=a("1446"),o={components:{Pagination:s["a"]},filters:{capitalize:function(e){return e?"是":"否"},relateIdtype:function(e){return e?"续费":"购买"}},data:function(){return{total:1,page:1,limit:10,total1:1,page1:1,limit1:10,filename:"",remark:"",rolesList:[],addList:{},dialogVisible:!1,pickerOptions:{disabledDate:function(e){return e.getTime()<Date.now()}},batchCode:"",level:"",detailsList:[],dialogdetail:!1,row:{},searchlevel:"",leveloptions:[],search:{batchCode:""},isRenew:"",statusoptions:[{name:"续费",status:!0},{name:"购买",status:!1}],instanceLevel:"",targetSelectArr:[],btnLoading:!1}},created:function(){this.levelList(),this.activateList()},methods:{handleSelectionChange:function(e){this.targetSelectArr=e},refresh:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.limit=e.limit,this.page=e.page,this.activateList(),console.log("refresh:",e)},refresh1:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.limit1=e.limit,this.page1=e.page,this.handleEdit(this.row),console.log("refresh:",e)},levelList:function(){var e=this;return Object(r["a"])(Object(l["a"])().mark((function t(){var a;return Object(l["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(c["q"])();case 2:a=t.sent,e.leveloptions=a.data;case 4:case"end":return t.stop()}}),t)})))()},handleAdd:function(){this.dialogVisible=!0},Addactivate:function(){var e=this;return Object(r["a"])(Object(l["a"])().mark((function t(){var a;return Object(l["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.btnLoading=!0,t.next=3,Object(c["l"])({batchCode:e.addList.batchCode,expireTime:Date.parse(new Date(e.addList.expireTime)),useDay:e.addList.useDay,num:e.addList.num,level:e.addList.level,remark:e.addList.remark});case 3:if(a=t.sent,200!==a.code){t.next=11;break}return e.activateList(),e.dialogVisible=!1,e.addList={},e.btnLoading=!1,e.$message(a.message),t.abrupt("return");case 11:e.btnLoading=!1,e.$message(a.message);case 13:case"end":return t.stop()}}),t)})))()},activateList:function(){var e=this;return Object(r["a"])(Object(l["a"])().mark((function t(){var a,n,i,r;return Object(l["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(c["c"])({page:e.page,pageSize:e.limit,batchCode:e.filename,remark:e.remark,level:e.level});case 2:for(a=t.sent,n=a.data.records,i=0;i<n.length;i++)for(r=0;r<e.leveloptions.length;r++)n[i].level===e.leveloptions[r].id&&(n[i].levelName=e.leveloptions[r].name);e.rolesList=n,e.total=a.data.records.length,e.$forceUpdate(),console.log(a);case 9:case"end":return t.stop()}}),t)})))()},handleSearch:function(){var e=this;return Object(r["a"])(Object(l["a"])().mark((function t(){var a,n;return Object(l["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a=[],console.log(e.search.batchCode),0!==e.search.batchCode.length&&(a=e.search.batchCode.split(/\s+/)),t.next=5,Object(c["f"])({page:e.page1,pageSize:e.limit1,isRenew:e.search.isRenew,codeList:a,batchId:e.row.id});case 5:n=t.sent,e.detailsList=n.data.records,e.total1=n.data.total,e.$forceUpdate();case 9:case"end":return t.stop()}}),t)})))()},handleDownload:function(){var e=this;return Object(r["a"])(Object(l["a"])().mark((function t(){var a,n,i,r,s;return Object(l["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.btnLoading=!0,window.localStorage.setItem("type","exp"),a=[],console.log(e.search.batchCode),0!==e.search.batchCode.length&&(a=e.search.batchCode.split(/\s+/)),t.next=7,Object(c["j"])({page:1,pageSize:5e3,batchId:e.row.id,isRenew:e.search.isRenew,codeList:a});case 7:n=t.sent,i=new Blob([n],{type:"application/vnd.ms-excel"}),r=window.URL.createObjectURL(i),s=document.createElement("a"),s.href=r,s.download="激活码",s.click(),e.btnLoading=!1,URL.revokeObjectURL(r),e.$forceUpdate();case 17:case"end":return t.stop()}}),t)})))()},handleEdit:function(e){var t=this;return Object(r["a"])(Object(l["a"])().mark((function a(){var n;return Object(l["a"])().wrap((function(a){while(1)switch(a.prev=a.next){case 0:return t.row=e,t.dialogdetail=!0,a.next=4,Object(c["f"])({page:t.page1,pageSize:t.limit1,batchId:e.id});case 4:n=a.sent,t.detailsList=n.data.records,t.total1=n.data.total;case 7:case"end":return a.stop()}}),a)})))()},selectlevel:function(){var e=this,t=this.leveloptions.find((function(t){return t.name===e.searchlevel}));this.level=t.id},selectChange1:function(){var e=this,t=this.leveloptions.find((function(t){return t.name===e.instanceLevel}));this.addList.level=t.id},selectChange2:function(){var e=this,t=this.statusoptions.find((function(t){return t.name===e.isRenew}));this.search.isRenew=t.status},ClickSearch:function(){this.level="",this.filename="",this.searchlevel="",this.activateList()},ClickDetailSearch:function(){this.search.batchCode="",this.search.isRenew="",this.isRenew="",this.handleSearch()},handleUse:function(e){var t=this;return Object(r["a"])(Object(l["a"])().mark((function a(){var n,i;return Object(l["a"])().wrap((function(a){while(1)switch(a.prev=a.next){case 0:return t.btnLoading=!0,n=t.targetSelectArr.map((function(e){return e.id})),a.next=4,Object(c["D"])({idList:n,isUse:e});case 4:i=a.sent,200===i.code?(t.btnLoading=!1,t.$message(i.message),t.handleEdit(t.row)):(t.btnLoading=!1,t.$message(i.message));case 6:case"end":return a.stop()}}),a)})))()}}},d=o,u=a("2877"),p=Object(u["a"])(d,n,i,!1,null,"de334218",null);t["default"]=p.exports},"333d":function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"pagination-container",class:{hidden:e.hidden}},[a("el-pagination",e._b({attrs:{background:e.background,"current-page":e.currentPage,"page-size":e.pageSize,layout:e.layout,"page-sizes":e.pageSizes,total:e.total},on:{"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t},"update:pageSize":function(t){e.pageSize=t},"update:page-size":function(t){e.pageSize=t},"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}},"el-pagination",e.$attrs,!1))],1)},i=[],l=(a("a9e3"),{name:"Pagination",props:{total:{required:!0,type:Number},page:{type:Number,default:1},limit:{type:Number,default:20},pageSizes:{type:Array,default:function(){return[10,20,30,50,100]}},layout:{type:String,default:"total, sizes, prev, pager, next, jumper"},background:{type:Boolean,default:!0},autoScroll:{type:Boolean,default:!0},hidden:{type:Boolean,default:!1}},computed:{currentPage:{get:function(){return this.page},set:function(e){this.$emit("update:page",e)}},pageSize:{get:function(){return this.limit},set:function(e){this.$emit("update:limit",e)}}},methods:{handleSizeChange:function(e){this.$emit("pagination",{page:this.currentPage,limit:e}),this.autoScroll},handleCurrentChange:function(e){this.$emit("pagination",{page:e,limit:this.pageSize}),this.autoScroll}}}),r=l,s=(a("0473"),a("2877")),c=Object(s["a"])(r,n,i,!1,null,"fbdb47ac",null);t["a"]=c.exports},7605:function(e,t,a){},"7db0":function(e,t,a){"use strict";var n=a("23e7"),i=a("b727").find,l=a("44d2"),r=a("ae40"),s="find",c=!0,o=r(s);s in[]&&Array(1)[s]((function(){c=!1})),n({target:"Array",proto:!0,forced:c||!o},{find:function(e){return i(this,e,arguments.length>1?arguments[1]:void 0)}}),l(s)},"841c":function(e,t,a){"use strict";var n=a("d784"),i=a("825a"),l=a("1d80"),r=a("129f"),s=a("14c3");n("search",1,(function(e,t,a){return[function(t){var a=l(this),n=void 0==t?void 0:t[e];return void 0!==n?n.call(t,a):new RegExp(t)[e](String(a))},function(e){var n=a(t,e,this);if(n.done)return n.value;var l=i(e),c=String(this),o=l.lastIndex;r(o,0)||(l.lastIndex=0);var d=s(l,c);return r(l.lastIndex,o)||(l.lastIndex=o),null===d?-1:d.index}]}))}}]);