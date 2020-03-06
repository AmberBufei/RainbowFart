/*
彩虹屁结构简单分析
段落-句子
彩虹屁
n个大段落

句子前后有垫话

前垫话填充名字
彩虹屁本身
后垫话


类型1

前垫话填充名字
土味简单情话
后垫话

两种句子

随机取两种句子来组成段落


段落开头垫话
句子句子句子句子句子
结尾垫话

 */
let partStart=[
    "我有的时候总有这样的感觉，",
    "你总是给我这样的感觉，",
    "每天一个人的时候，我就在想，",
    "NAME，我想我是爱着你的，",
    "我会不由自主的去设想我们的未来，",
    "我每天晚上都彻夜难眠，总是在想，",
    "我不知道该怎么说了，我从没有过这样的感觉，",
    "NAME，",
    "NAME,这些话我从来没有对其他人说过，",
    "我现在只想对你说，",
    "你听着，我有一句话想对你说，"

];
let sentenceStart=[
    "",
    "NAME！",
    "NAME，",
    "说老实话，",
    "小宝贝，",
    "我有句话想说很久了，",

];
let sentenceEnd=[
    "，NAME，这就是我对你的感觉。",
    "，你一定不能想象。",
    "，你就是我的一切了。",
    "，这都是我的心里话。",
    ",这些感情可以说无时无刻不在折磨我",
    ""

];
let partEnd=[
    "NAME,一辈子那么长，没想到，我真的只喜欢你一个人。",
    "我就是这么爱你。",
    "像这样的话，我给你讲一年都不会腻。",
];

let pasagetEnd=[
    "原谅我冒昧地代表你的命中注定的TA，给你献上这赞美与爱慕~ 希望你能早日遇到那个他，遇到满满的爱意，亲口给你诉说真正动人的情话~ ",
    "原谅我冒昧地代表你的命中注定的TA，给你献上这赞美与爱慕~ 在今天这个神圣、庄严而隆重的节日里，如果他没亲自表达，那还不快快让他补上！得比这个好听一万倍才够！！",
];
const startProb=30;
const endProb=30;
let caihongpi=CHP;
let qinghua=QH;
// let qinghua=CHP;



var clipboard = new ClipboardJS('#copy');
clipboard.on('success', function(e) {
    M.toast({html: '复制成功！'});

    e.clearSelection();
});


function getRandomThing(arr,name) {
    let min=0;
    let max=arr.length-1;
    if(max===-1){
        return "";
    }
    let random=getRandom(parseInt(min),parseInt(max));
    let result=replaceAll(arr[random],"XXX",name);
    return replaceAll(result,"NAME",name);
}
function getRandomItem(arr) {
    return arr[getRandom(0,arr.length-1)];
}
function generateSentence(name) {
    let sentence="";
    if(getRandom(0,100)>startProb){
        sentence+=getRandomThing(sentenceStart,name);
    }
    let mainPart=getRandomItem([caihongpi,qinghua]);
    sentence+=getRandomThing(mainPart,name);
    if(getRandom(0,100)>endProb){
        sentence+=getRandomThing(sentenceEnd,name);
    }
    return addDot(sentence);
}
function addDot(str) {
    if(str[str.length-1]!=="。"){
      //  console.log(str[str.length-1]);
        str+="。";
    }
    return str;
}
function generatePart(name) {
    let part="<p class='flow-text'>";
    if(getRandom(0,100)>startProb){
        part+=getRandomThing(partStart,name);
    }
    let sentenceCount=getRandom(8,40);
    for(let i=0;i<sentenceCount;i++){
       // console.log("句子" +i);
        part+=generateSentence(name);
    }
    if(getRandom(0,100)>endProb){
        part+=getRandomThing(partEnd,name);
    }
    part+="</p>";
    return part;

}
function generateContent(name, num = getRandom(2, 7)) {

    let content=`<div style="text-align: center;"><h4>给<span class="orange-text">${name}</span>一个人的彩虹屁❤</h4></div> `;
    // let content=`<h4>给<span class="orange-text">${name}</span>一个人的彩虹屁❤</h4>`;
    for(let i=0;i<num;i++){
        //console.log("段落"+i);
        content+=generatePart(name);
    }
    content+=`<h3 class="flow-text">${name}, ${addDot(getRandomThing(qinghua,name))}</h3>`;
    content+=`<br><h3 class="flow-text"> ———${name}, ${getRandomThing(pasagetEnd,name)}</h3>`;
    return content;
}
// let name ="";
// let is_first_time = true;
function buttonClick() {
    let name =findElement('name').value;
    $('#card').addClass('hide');
    // $('#card').css("height", "1100px");
    // if (name == "")name = findElement('name').value;
    // $("#card").remove();
    // var
    //     contentFather = findElement("contentFather"),
    //     ref = findElement("btnRegenerate"),
    //     content = findElement("content");

    // contentFather.removeChild(content);
    // content = document.createElement('div');
    // content.id = "content";
    // content.innerHTML=generateContent(name);
    // contentFather.insertBefore(content, ref);
    $('#contentContainer').removeClass('hide');
    // if (is_first_time) {
    //     findElement('content').innerHTML=generateContent(name, 1);
    //     is_first_time = false;
    // }
    // else
        findElement('content').innerHTML=generateContent(name);
}