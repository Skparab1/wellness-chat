// wellness chat
 
const sleep = ms => new Promise(res => setTimeout(res, ms));
 
 
// universal random id
var pname = g('name').value;
var randnum = Math.floor(Math.random()*1000);
 
var linking = false;
var gottenonline = [];
 
var id = pname+'00'+randnum;
console.log(id);
 
var connected = false;
var connectedtarget = '';
 
var starttime = 0;
var targetmessages = [];
var targettimes = [];
var storedlastmsgs = [];
 
var openedconnect4 = false;
var mycolor = -1;
 
var combid = '';
var myturn = false;

var chatopen = true;
var musicopen = false;

var audio = new Audio('sad_piano.mp3');
 
var justplayed = 0;
 
var currentgrid = [[0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0]]
 
const canvas = document.querySelector('.myCanvas');
const ctx = canvas.getContext('2d');
const width = canvas.width = g('connect-4').offsetWidth;
const height = canvas.height = g('connect-4').offsetHeight;
 
ctx.fillStyle = 'rgb(230,230,230)';
ctx.fillRect(width*0.1,height*0.1,width*0.8,height*0.5);
 
ctx.fillStyle = 'rgb(255,255,255)';
// 7*6 devide height 0.4/6
let w = 1;
while (w <= 7){
 let h = 1;
 while (h <= 7){
   ctx.beginPath();
   ctx.arc(width*0.1+w*0.8/8*width, height*0.1+h*0.4/6*height, 0.28/8*width,0, Math.PI*2);
   ctx.fill();
   h += 1;
 }
 w += 1;
}
 
let cx = g('connect-4').offsetLeft;
let cy = g('connect-4').offsetTop;
 
g('connect-4').style.position = 'absolute';
g('connect-4').style.left = cx+'px';
g('connect-4').style.top = cy+'px';
 
(async () => {
 
 while (true){
  
   // we can have the fetcher in here
 
   if (linking){ // then we need to poll and stuff
 
           // lets get a time
     var d = new Date();
     if (d.getSeconds() % 5 == 0){ // check every 5 sec to link
       (async () => {
         fetch((`https://pst652.deta.dev/?CHATGET=linker`))
           .then(response => {
               return response.json();
           })
           .then(data => {
               console.log(data);
               gottenonline = data.messages;
 
               // now we can process
               if (gottenonline.length >= 2){ // verry likely we have a connection
 
                 let u = 0;
                 while (u < gottenonline.length){
                   if (gottenonline[u] != id){ // not urself
                     // we have a target
                     linking = false;
                     connected = true;
                     g('name-getter').style.display = 'none';
 
                     starttime = new Date();
  
                     g('c4').style.display = 'block';
                     g('name-getter').style.height = g('connector').offsetHeight;
 
                     // now clear the thing if u have the higher id
                     let otherid = parseInt(gottenonline[u].replace('%20',' ').split('00')[1]);
                     console.log('otherid'+otherid+' ourid'+randnum);
 
                     connectedtarget = gottenonline[u].replace('%20',' ');

                     let name = gottenonline[u].replace('%20',' ').split('00')[0];
                     g('connector').textContent = 'Connected to '+ name;
                     g('chat-name').textContent = name;

                     if (randnum > otherid){ // we can clear
                       clearlinker();
                       myturn = true;
                       g('bt').textContent = 'Your Turn!';
                       combid = id+connectedtarget;
                       mycolor = 1;
                     } else {
                       g('bt').textContent = "Opponent's Turn!";
                       combid = connectedtarget+id;
                       mycolor = 2;
                     }
 
 
                     g('connector').textContent = 'Connected to '+gottenonline[u].replace('%20',' ').split('00')[0];
 
                     break; // so that you dont try to link to others
                     // in theory this wud break simultaenous linking
 
                   }
                   u += 1;
                 }
               }
           })
       })();
     }
   }
 
   console.log(currentgrid);
 
   // now if ur connected
   if (connected){ //and cpnnectedtarget is the person
     // we need to poll the db for the data
     var d = new Date();
     if (d.getSeconds() % 1 == 0){ // check every 5 sec but dont overlap with other call
       // lets poll a bit faster
 
       (async () => {
         //      https://pst652.deta.dev/?ADDMSG=person1&msg=shubham&time=200
         fetch((`https://pst652.deta.dev/?CHATGET=${connectedtarget}`))
           .then(response => {
               return response.json();
           })
           .then(data => {
               console.log(data);
               targetmessages = data.messages;
               targettimes = data.timestamps;
              
              
               let diff = targetmessages.length-storedlastmsgs.length; // this is th e differnce of how many more messages
               // so start at targetmsgs.length-diff-1
               // 0 1 2 3 4
               // 0 1 2 3 4 5
 
               let u = targetmessages.length-diff;
               while (u < targetmessages.length){
                 addothermsg(connectedtarget,targetmessages[u]);
                 u += 1;
               }
               storedlastmsgs = targetmessages;
           })
       })();
 
       let nowtime = new Date();
       if (openedconnect4){
         fetch((`https://pst652.deta.dev/?CHATGET=${combid}`))
         .then(response => {
             return response.json();
         })
         .then(data => {
             let nd = data.messages;
             nd = nd.substring(1,nd.length-1);
             nd = nd.split('ba');
             let t = 0;
             let ye = [];
             while (t < nd.length){
               ye.push(nd[t].split('a'));
               t += 1;
             }
             console.log(ye);
 
             console.log('MYTURN'+currentgrid,ye);
             //currentgrid = [currentgrid[0],currentgrid[1],currentgrid[2],currentgrid[3],currentgrid[4],currentgrid[5]];
             if (ye != currentgrid && nowtime-justplayed >= 3000){ // 1 sec gap
               currentgrid = ye;
               g('bt').textContent = 'Your Turn!';
               redrawc4();
               myturn = true;
             }
         })
       }
     }
 
 
   }
  
   await sleep(1000); // garuntee not to call 2 times
 }
})();
 
 
(async () => {
 window.addEventListener("keydown", function(event) {
   if (event.defaultPrevented) {
     return;
   }
    let actkey = event.code.replace('Key','').replace('Digit','')
   console.log(actkey);
 
   if (actkey == 'Enter'){
     sendmsg();
   }
 
 }, true);
})();
 
 

