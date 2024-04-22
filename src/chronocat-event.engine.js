"use strict";var w=Object.defineProperty;var A=Object.getOwnPropertyDescriptor;var V=Object.getOwnPropertyNames;var G=Object.prototype.hasOwnProperty;var D=(e,o)=>{for(var n in o)w(e,n,{get:o[n],enumerable:!0})},K=(e,o,n,r)=>{if(o&&typeof o=="object"||typeof o=="function")for(let t of V(o))!G.call(e,t)&&t!==n&&w(e,t,{get:()=>o[t],enumerable:!(r=A(o,t))||r.enumerable});return e};var z=e=>K(w({},"__esModule",{value:!0}),e);var ee={};D(ee,{apply:()=>Z,name:()=>B,version:()=>Y});module.exports=z(ee);var f=require("electron"),L=e=>{let o=async s=>{if(!e.filter){e.handler(s);return}await e.filter(s)&&e.handler(s)},n=Symbol(),r=0,t=f.ipcMain.emit.bind(f.ipcMain);f.ipcMain.emit=function(s,d,...c){let m=d.sender;if(!m[n]){m[n]=!0;let T=m.send.bind(m);m.send=function(g,...y){T.call(this,g,...y);let N=e.getId?.(y);o(N?{type:"wrapped-response",channel:g,method:e.getMethod?.(y),args:y,id:N}:{type:"event",channel:g,method:e.getMethod?.(y),args:y})}}t.call(this,s,d,...c);let h=e.getId?.(c);return o(h?{type:"wrapped-request",channel:s,method:e.getMethod?.(c),args:c,id:h}:{type:"request",channel:s,method:e.getMethod?.(c),args:c}),!1};let a=f.ipcMain.handle.bind(f.ipcMain);return f.ipcMain.handle=function(s,d){let c=async(m,...h)=>{let T=`IPCMAN_HANDLE_${r++}`;o({type:"handle-request",channel:s,method:e.getMethod?.(h),args:h,id:T});let g=await Promise.resolve(d(m,...h));return o({type:"handle-response",channel:s,method:e.getMethod?.(h),args:[g],id:T}),g};a.call(this,s,c)},{emit:t,senderExcludeSymbol:n}};var l;(function(e){e[e.Private=1]="Private",e[e.Group=2]="Group",e[e.Guild=4]="Guild",e[e.MsgBox=7]="MsgBox"})(l||(l={}));var i;(function(e){e[e.Value1=1]="Value1",e[e.Normal=2]="Normal",e[e.Value3=3]="Value3",e[e.System=5]="System",e[e.Ptt=6]="Ptt",e[e.Video=7]="Video",e[e.Value8=8]="Value8",e[e.WithRecords=9]="WithRecords",e[e.Wallet=10]="Wallet",e[e.Ark=11]="Ark",e[e.Vaule17=17]="Vaule17"})(i||(i={}));var u;(function(e){e[e.Normal=0]="Normal",e[e.System=3]="System"})(u||(u={}));var p;(function(e){e[e.Normal1=1]="Normal1",e[e.Normal2=2]="Normal2",e[e.Super=3]="Super",e[e.MarketEmoticon=4]="MarketEmoticon",e[e.PCPoke=5]="PCPoke"})(p||(p={}));var C;(function(e){e[e.None=0]="None",e[e.All=1]="All",e[e.Normal=2]="Normal"})(C||(C={}));var O;(function(e){e[e.Normal=1]="Normal",e[e.MsgBox=2]="MsgBox"})(O||(O={}));var I={},U=[],b=[];var E=require("node:buffer");var q=e=>({chatType:e.chatType,msgType:e.msgType,subMsgType:{text:!!(e.subMsgType&1),pic:!!(e.subMsgType&2),face:!!(e.subMsgType&16),link:!!(e.subMsgType&128),multiForward:!!(e.subMsgType&8),reply:e.msgType===i.WithRecords&&!!(e.subMsgType&32),marketFace:e.msgType==i.Vaule17&&!!(e.subMsgType&8),file:e.msgType===i.Value3&&!!(e.subMsgType&512)},sendType:e.sendType});var M=(e,o)=>n=>W(e,o,n),W=async(e,o,n)=>{let r=e.chronocat.l,t=await H(e,o,n);if(!t)return;let a=[];for(let s of t){if(!s.message?.id&&!s.user?.id){r.warn("satori: parser: \u4E22\u5F03\u4E86\u4E00\u6761\u6D88\u606F",{code:2127});continue}else s.message?.id?s.user?.id?!s.user?.name&&!s.member?.nick&&r.warn(`satori: parser: \u6D88\u606F ${s.message.id} \u4E0D\u5E26\u6709 userName\uFF0C\u8BF7\u6CE8\u610F\u3002`,{code:2130}):r.warn(`satori: parser: \u6D88\u606F ${s.message.id} \u4E0D\u5E26\u6709 userId\uFF0C\u8BF7\u6CE8\u610F\u3002`,{code:2129}):r.warn(`satori: parser: \u6765\u81EA ${s.user?.name} (${s.user?.id}) \u7684\u6D88\u606F\u4E0D\u5E26\u6709 messageId\uFF0C\u8BF7\u6CE8\u610F\u3002`,{code:2128});a.push(s)}return a},H=async(e,o,n)=>{let r={id:void 0,type:void 0,platform:void 0,self_id:void 0,timestamp:Number(n.msgTime)*1e3};r.user={id:n.senderUin,name:n.sendNickName||void 0,avatar:`http://thirdqq.qlogo.cn/headimg_dl?dst_uin=${n.senderUin}&spec=640`};let t=q(n);switch(r.channel={},t.chatType){case l.Private:r.channel.type=1,r.channel.id=`private:${n.peerUin}`,r.channel.name=n.peerName;break;case l.Group:r.guild={},r.member={},n.sendMemberName&&(r.member.nick=n.sendMemberName),r.channel.type=0,r.channel.id=r.guild.id=n.peerUid,r.channel.name=r.guild.name=n.peerName,r.guild.avatar=`https://p.qlogo.cn/gh/${n.peerUid}/${n.peerUid}/640`;break}if(!(t.msgType===i.Ark&&n.subMsgType===0&&t.sendType===u.Normal)){if(t.msgType===i.Normal||t.msgType===i.Value3||t.msgType===i.Ptt||t.msgType===i.Video||t.msgType===i.WithRecords||t.msgType===i.Vaule17)return S(e,o,r,n).then(a=>[a[0],...a[1]]);if(t.msgType===i.System&&n.subMsgType===8&&t.sendType===u.System&&n.elements[0].elementType===8&&n.elements[0].grayTipElement.subElementType===4&&n.elements[0].grayTipElement.groupElement.type===1)return await j(e,o,r,n);if(t.msgType===i.System&&n.subMsgType===8&&t.sendType===u.System&&n.elements[0].elementType===8&&n.elements[0].grayTipElement.subElementType===4&&n.elements[0].grayTipElement.groupElement.type===8)return await J(e,o,r,n);if(t.msgType===i.System&&n.subMsgType===8&&t.sendType===u.System&&n.elements[0].elementType===8&&n.elements[0].grayTipElement.subElementType===4&&n.elements[0].grayTipElement.groupElement.type===5)return;if(t.msgType===i.System&&n.subMsgType===12&&t.sendType===u.System&&n.elements[0].elementType===8&&n.elements[0].grayTipElement.subElementType===12&&n.elements[0].grayTipElement.xmlElement.busiType==="1"&&n.elements[0].grayTipElement.xmlElement.busiId==="10145")return await F(e,o,r,n);if(t.msgType===i.System&&n.subMsgType===17&&t.sendType===u.System)return}};async function S(e,o,n,r){let[t,a]=await P(e,o,r);return n.type="message-created",n.message={id:r.msgId,content:t.join("")},[n,a]}async function j(e,o,n,r){let[t,a]=await S(e,o,n,r);return t.type="guild-member-added",t.operator={id:r.elements[0].grayTipElement.groupElement.adminUin,name:void 0},t.user={id:r.elements[0].grayTipElement.groupElement.memberUin,name:r.elements[0].grayTipElement.groupElement.memberNick,avatar:`http://thirdqq.qlogo.cn/headimg_dl?dst_uin=${r.elements[0].grayTipElement.groupElement.memberUin}&spec=640`},t.member||(t.member={}),[t,...a]}async function J(e,o,n,r){let[t,a]=await S(e,o,n,r);return Number(r.elements[0].grayTipElement.groupElement.shutUp.duration)?t.type="unsafe-guild-mute":t.type="unsafe-guild-unmute",t.operator={id:r.elements[0].grayTipElement.groupElement.shutUp.admin.uin,name:void 0},t.user={id:r.elements[0].grayTipElement.groupElement.shutUp.member.uin,name:r.elements[0].grayTipElement.groupElement.shutUp.member.name,avatar:`http://thirdqq.qlogo.cn/headimg_dl?dst_uin=${r.elements[0].grayTipElement.groupElement.shutUp.member.uin}&spec=640`},t.member&&delete t.member,[t,...a]}var Q=/jp="(\d+)".*jp="(\d+)"/gim;async function F(e,o,n,r){let[t,a]=await S(e,o,n,r);t.type="guild-member-added";let s=Q.exec(r.elements[0].grayTipElement.xmlElement.content);if(!Array.isArray(s)||s.length<3)return;let[d,c,m]=s;return t.operator={id:c,name:void 0},t.user={id:m,name:void 0,avatar:`http://thirdqq.qlogo.cn/headimg_dl?dst_uin=${m}&spec=640`},t.member||(t.member={}),[t,...a]}async function P(e,o,n){let r=e.chronocat.l,t=[],a=[];for(let s of n.elements)switch(s.elementType){case 1:{switch(s.textElement.atType){case C.None:{t.push(e.chronocat.h.text(s.textElement.content.replaceAll(`\r
`,`
`).replaceAll("\r",`
`)));break}case C.Normal:{e.chronocat.uix.add(s.textElement.atNtUid,s.textElement.atUid);let d=s.textElement.atUid;d==="0"&&(d=void 0),d||=e.chronocat.uix.getUin(s.textElement.atNtUid);let c=s.textElement.content.slice(1);if(!d){r.warn(`satori: parser: at \u76EE\u6807 ${c} \u4E0D\u5E26\u6709 id\uFF0C\u5C06\u8DF3\u8FC7\u8BE5\u5143\u7D20\u3002`,{code:2131});break}t.push(e.chronocat.h("at",{id:d,name:c}));break}}break}case 2:{t.push(e.chronocat.h("img",{src:`${o.self_url}/v1/assets/${E.Buffer.from(JSON.stringify({msgId:n.msgId,chatType:n.chatType,peerUid:n.peerUid,elementId:s.elementId,thumbSize:s.picElement.thumbFileSize})).toString("base64url")}`}));break}case 3:{t.push(e.chronocat.h("file",{src:`${o.self_url}/v1/assets/${E.Buffer.from(JSON.stringify({msgId:n.msgId,chatType:n.chatType,peerUid:n.peerUid,elementId:s.elementId,thumbSize:s.fileElement.thumbFileSize})).toString("base64url")}`}));break}case 4:{t.push(e.chronocat.h("audio",{src:`${o.self_url}/v1/assets/${E.Buffer.from(JSON.stringify({msgId:n.msgId,chatType:n.chatType,peerUid:n.peerUid,elementId:s.elementId,thumbSize:0})).toString("base64url")}`}));break}case 5:{t.push(e.chronocat.h("video",{src:`${o.self_url}/v1/assets/${E.Buffer.from(JSON.stringify({msgId:n.msgId,chatType:n.chatType,peerUid:n.peerUid,elementId:s.elementId,thumbSize:s.videoElement.thumbSize})).toString("base64url")}`}));break}case 6:{switch(s.faceElement.faceType){case p.PCPoke:{t.push(e.chronocat.h(`${e.chronocat.platform}:pcpoke`,{id:s.faceElement.pokeType}));break}case p.Normal1:case p.Normal2:case p.Super:{t.push(e.chronocat.h(`${e.chronocat.platform}:face`,{id:s.faceElement.faceIndex,name:`[${(await e.chronocat.api["chronocat.internal.qface.get"](`${s.faceElement.faceIndex}`)).QDes.slice(1)}]`,platform:e.chronocat.platform,"unsafe-super":s.faceElement.faceType===p.Super?!0:void 0,"unsafe-result-id":s.faceElement.resultId,"unsafe-chain-count":s.faceElement.chainCount}));break}case p.MarketEmoticon:{t.push(e.chronocat.h(`${e.chronocat.platform}:face`,{id:s.faceElement.faceIndex,platform:e.chronocat.platform,"unsafe-market-emoticon":!0}));break}}break}case 7:{let d=n.records.find(c=>c.msgId===s.replyElement.sourceMsgIdInRecords);t.push(e.chronocat.h("quote",{"chronocat:seq":s.replyElement.replayMsgSeq},[await X(e,d),...(await P(e,o,d))[0]]));break}default:break}return[t,a]}async function X(e,o){return e.chronocat.h("author",{id:o.senderUin,name:o.sendMemberName||o.sendNickName,avatar:`http://thirdqq.qlogo.cn/headimg_dl?dst_uin=${o.senderUin}&spec=640`})}var v=class{constructor(o){this.messages=o}type="satori";toSatori=async(o,n)=>(await Promise.all(this.messages.map(M(o,n)))).filter(Boolean).flat().filter(Boolean)},R=class{constructor(o){this.messages=o}type="satori";toSatori=async(o,n)=>(await Promise.all(this.messages.map(M(o,n)))).filter(Boolean).flat().filter(Boolean).map(r=>(r.type="message-deleted",r))},k=class{constructor(o,n){this.buddyReq=o;this.uin=n}type="satori";toSatori=async(o,n)=>{let r={id:void 0,type:"friend-request",platform:o.chronocat.platform,self_id:void 0,timestamp:Number(this.buddyReq.reqTime)*1e3};return r.user={id:`${this.uin}`,name:this.buddyReq.friendNick,avatar:`http://thirdqq.qlogo.cn/headimg_dl?dst_uin=${this.uin}&spec=640`},[r]}};var $=e=>o=>{switch(o.type){case"event":{if(!o.args[1]||!Array.isArray(o.args[1]))return;let n=o.args[1];if(!n.length)return;let r=n[0];if(!r||!("cmdName"in r))return;x(e,r.cmdName,r.payload);return}case"wrapped-request":{I[o.id]=o.args[1][0];return}case"wrapped-response":{let n=I[o.id];if(!n)return;delete I[o.id],x(e,n,o.args[1]);return}}},x=async(e,o,n)=>{switch(o){case"nodeIKernelMsgListener/onRecvActiveMsg":case"nodeIKernelMsgListener/onRecvMsg":{let{msgList:r}=n;for(let a of r)e.chronocat.uix.add(a.senderUid,a.senderUin),a.chatType===l.Private&&e.chronocat.uix.add(a.peerUid,a.peerUin);let t=await Promise.all(r.filter(_).map(async a=>a));t.length&&e.chronocat.emit(new v(t));return}case"nodeIKernelProfileListener/onProfileSimpleChanged":case"nodeIKernelProfileListener/onProfileDetailInfoChanged":case"nodeIKernelGroupListener/onSearchMemberChange":case"nodeIKernelGroupService/getNextMemberList":{let{profiles:r,infos:t}=n,a=r??t;for(let[s,{uin:d}]of a)e.chronocat.uix.add(s,d);return}case"nodeIKernelGroupListener/onMemberInfoChange":{let{members:r}=n;for(let[t,{uin:a}]of r)e.chronocat.uix.add(t,a);return}case"nodeIKernelGroupListener/onMemberListChange":{let{info:r}=n;if(!r.sceneId.split("_")[0])return;for(let[a,{uin:s}]of r.infos)e.chronocat.uix.add(a,s);return}case"nodeIKernelRecentContactListener/onRecentContactListChangedVer2":{let{changedRecentContactLists:r}=n;for(let t of r)for(let a of t.changedList)e.chronocat.uix.add(a.senderUid,a.senderUin),a.chatType===l.Private&&e.chronocat.uix.add(a.peerUid,a.peerUin);return}case"onOpenParamChange":{let{data:r}=n;for(let t of r)e.chronocat.uix.add(t.senderUid,t.senderUin),t.chatType===l.Private&&e.chronocat.uix.add(t.peerUid,t.peerUin);return}case"nodeIKernelMsgService/getMsgsIncludeSelf":{let{msgList:r}=n;for(let t of r)e.chronocat.uix.add(t.senderUid,t.senderUin),t.chatType===l.Private&&e.chronocat.uix.add(t.peerUid,t.peerUin);return}case"onBuddyListChange":case"nodeIKernelBuddyListener/onBuddyListChange":{let{data:r}=n;for(let t of r)for(let a of t.buddyList)e.chronocat.uix.add(a.uid,a.uin);return}case"nodeIKernelBuddyListener/onBuddyReqChange":{let{buddyReqs:r}=n;r.forEach(t=>{if(t.reqType!==1||t.reqSubType!==1)return;let a=e.chronocat.uix.getUin(t.friendUid);if(!a)return;let s=`${a}:${t.reqTime}`;U.includes(s)||(U.push(s),e.chronocat.emit(new k(t,a)))});return}case"nodeIKernelMsgListener/onAddSendMsg":{let{msgRecord:r}=n;b.push(r.msgId);return}case"nodeIKernelMsgListener/onMsgInfoListUpdate":{let{msgList:r}=n;for(let a of r)e.chronocat.uix.add(a.senderUid,a.senderUin),a.chatType===l.Private&&e.chronocat.uix.add(a.peerUid,a.peerUin);r.filter(a=>a.sendStatus>1&&b.find(s=>a.msgId===s)).forEach(a=>{b.splice(b.indexOf(a.msgId),1),e.chronocat.emit(new v([a]))});let t=await Promise.all(r.filter(a=>a.msgType===i.System&&a.subMsgType===4&&!a.isOnlineMsg&&Number(a.recallTime)&&a.elements[0].elementType===8&&a.elements[0].grayTipElement?.subElementType===1).filter(_).map(async a=>a));t.length&&e.chronocat.emit(new R(t));return}}},_=e=>"peer"in e?!e.elements.some(o=>o.walletElement||o.arkElement):!(e.msgType===i.Ark||e.msgType===i.Wallet||e.msgType===i.System&&e.subMsgType===17&&e.sendType===u.System&&e.elements[0].elementType===8&&e.elements[0].grayTipElement.subElementType===16&&e.elements[0].grayTipElement.jsonGrayTipElement.busiId==="81");var B="engine-chronocat-event",Y="0.2.9",Z=async e=>{L({handler:$(e),getId:n=>n?.[0]?.callbackId}),e.chronocat.api.register(B)("chronocat.internal.red.message.parse",(n,r)=>M(e,r)(n)),await e.chronocat.whenReady()};0&&(module.exports={apply,name,version});
