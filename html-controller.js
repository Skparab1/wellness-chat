let playing;

async function connectperson(){
  // ok absically we have an id right
  
  pname = g('name').value;
  id = pname+'00'+randnum;
  
  id = id.replaceAll(' ','');
  
  if (!linking && pname != '' && !connected){ // dont link twice, cant do with no name
    linking = true;
  
    const connectButton = g('connector')
    connectButton.firstChild.textContent = 'Connecting...';
    console.log(connectButton);
    connectButton.children[0].style.display = 'inline-block';
  
    // and then put in the person
    (async () => {
      fetch((`https://pst652.deta.dev/?ADDLINKER=${id}`))
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
    })();
  
  } else if (pname == ''){
    alert('please enter a name first');
    g('name-getter').style.border = '3px solid red';
  }
 }
  
 function clearlinker(){
  (async () => {
    fetch((`https://pst652.deta.dev/?LINKCLEAR`))
      .then(response => {
          return response.json();
      })
      .then(data => {
          console.log(data);
      })
  })();
 }
  
 async function sendmsg(){
  
  let msg = g('msg').value;
  if (connected && msg.replaceAll(' ','') != ''){ // connected to somone, not empty message
    // first get the message
  
    let endtime = new Date();
    let elapsedtime = endtime - starttime;
  
    g('msg').value = '';
     addyourmsg(msg);
  
    msg = encodeURI(msg);
  
    (async () => {
      //      https://pst652.deta.dev/?ADDMSG=person1&msg=shubham&time=200
      fetch((`https://pst652.deta.dev/?ADDMSG=${id}&msg=${msg}&time=${elapsedtime}`))
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
    })();
  
  }
  
 }
  
 function g(el){
  return document.getElementById(el);
 }
  
function addyourmsg(msg){
  let d = g('messages');

  const div = document.createElement('div');
  div.classList.add("message");
  div.classList.add("your-message");
  div.innerHTML = `  <h6>${msg}</h6>`;
  d.appendChild(div);
}

function addothermsg(ct, msg){
  let d = g('messages');

  const div = document.createElement('div');
  div.classList.add("message");
  div.classList.add("other-message");
  div.innerHTML = `  <h6>${ decodeURI(msg.replaceAll('%20',' '))}</h6>`;
  d.appendChild(div);
}
  
 function openelement(el){
  let ps = document.getElementById(el);
  ps.style.display = 'block';
  const sleep = ms => new Promise(res => setTimeout(res, ms));
  (async () => {
    dimmer = 0;
    while (dimmer <= 100){
      ps.style.opacity = dimmer/100;
      dimmer += 1;
      await sleep(2);
    }
  })();
 }
  
 async function closedialogue(el){
  let ps = document.getElementById(el);
  ps.style.display = 'block';
  const sleep = ms => new Promise(res => setTimeout(res, ms));
  (async () => {
    dimmer = 0;
    while (dimmer <= 100){
      ps.style.opacity = 1-dimmer/100;
      dimmer += 1;
      await sleep(2);
    }
    ps.style.display = 'none';
  })();
 }
  
 function playc4(){
  g('connect-4').style.opacity = 1;
  openedconnect4 = true;
 }
  
 function hoverboard(){
  var e = window.event;
  
  var x = e.clientX;
  var y = e.clientY+window.scrollY-185;//-window.innerHeight;
  
  //console.log(x,y,width*0.1+1*0.8/8*width+cx, width*0.1+1*0.8/8*width+0.01*width+g('cvs').offsetLeft);
  
  // now figure out if it lies in the boxes
  let w = 1;
  while (w <= 7){
    ctx.beginPath();
    //ctx.arc(width*0.1+w*0.8/8*width, height*0.1+1*0.4/6*height, 0.28/8*width,0, Math.PI*2);
    if (x >= width*0.1+w*0.8/8*width-0.28/8*width+cx && x <= width*0.1+w*0.8/8*width+0.28/8*width+cx && y >= height*0.1-1*0.4/6*height+g('cvs').offsetHeight-6 && y <= height*0.1-1*0.4/6*height+0.28/8*width+g('cvs').offsetHeight){
      console.log('hovering hover',w);
      ctx.fillStyle = 'rgb(255,0,0)';
      ctx.arc(width*0.1+w*0.8/8*width, height*0.1+1*0.4/6*height, 0.28/8*width,0, Math.PI*2);
      ctx.fill();
    } else {
      ctx.fillStyle = 'rgb(255,255,255)';
      ctx.arc(width*0.1+w*0.8/8*width, height*0.1+1*0.4/6*height, 0.28/8*width,0, Math.PI*2);
      ctx.fill();
    }
    w += 1;
  }
  }
  
 function processpos(){
  var e = window.event;
  
  var x = e.clientX;
  var y = e.clientY+window.scrollY-185;
  
  // now figure out if it lies in the boxes
  
  let w = 1;
  while (w <= 7 && myturn){
    ctx.beginPath();
    //ctx.arc(width*0.1+w*0.8/8*width, height*0.1+1*0.4/6*height, 0.28/8*width,0, Math.PI*2);
    if (x >= width*0.1+w*0.8/8*width-0.28/8*width+cx && x <= width*0.1+w*0.8/8*width+0.28/8*width+cx && y >= height*0.1-1*0.4/6*height+g('cvs').offsetHeight-6 && y <= height*0.1-1*0.4/6*height+0.28/8*width+g('cvs').offsetHeight){
      ctx.fillStyle = 'rgb(255,0,0)';
  
      let dropped = false;
      let u = 5;
      while (u >= 0){
        if (currentgrid[u][w] == 0){ // empty
          currentgrid[u][w] = mycolor;
          ctx.arc(width*0.1+w*0.8/8*width, height*0.1+(u+2)*0.4/6*height, 0.28/8*width,0, Math.PI*2);
          myturn = false;
          g('bt').textContent = "Opponent's Turn!";
          dropped = true;
          break;
        }
        u -= 1;
      }
      ctx.fill();
  
      let thestr = '';
      if (dropped){
        justplayed = new Date();
        // conv to string and then write
        let p = 0;
        while (p < currentgrid.length){
          let c = 0;
          while (c < currentgrid[p].length){
            thestr = thestr + 'a' + currentgrid[p][c];
            c += 1;
          }
          thestr += 'b';
          p += 1;
        }
        console.log(thestr);
        (async () => {
          fetch((`https://pst652.deta.dev/?CHATWRITE=${combid}&data=${thestr}`))
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
            })
        })();
      }
    }
    w += 1;
  }
 }
  
 function redrawc4(){
  let w = 1;
  while (w < currentgrid[0].length){
    let h = 1;
    while (h < currentgrid.length){
      ctx.beginPath();
      if (currentgrid[h][w] == 0){
        ctx.fillStyle = 'rgb(255,255,255)';
      } else if (currentgrid[h][w] == mycolor){
        ctx.fillStyle = 'rgb(255,0,0)';
      } else if (mycolor == 1 && currentgrid[h][w] == 2){
        ctx.fillStyle = 'rgb(255,255,0)';
      } else if (mycolor == 2 && currentgrid[h][w] == 1){
        ctx.fillStyle = 'rgb(255,255,0)';
      }
      ctx.arc(width*0.1+w*0.8/8*width, height*0.1+(h+2)*0.4/6*height, 0.28/8*width,0, Math.PI*2);
      ctx.fill();
      h += 1;
    }
    w += 1;
  }
 }
 function ismyturn(){
  let r = 0;
  let mycount = 0;
  let othercount = 9;
  while (r < currentgrid.length){
    let e = 0;
    while (e < currentgrid[r].length){
      if (currentgrid[r][e] == mycolor || currentgrid[r][e] == String(mycolor)){
        mycount += 1;
      } else if ((currentgrid[r][e] == 2 && mycolor == 1) || (currentgrid[r][e] == 1 && mycolor == 2)){
        othercount += 1;
      }
      e += 1;
    }
    r += 1;
  }
  
  return (mycount > othercount || (mycount == othercount && mycolor == 1));
 }

function togglechat(){
  if (chatopen){
    g('message-holder').style.display = 'none';
    g('content').style.gridTemplateColumns = '1fr';
    g('left').style.justifySelf = 'unset';
    chatopen = false;
  } else {
    g('message-holder').style.display = 'flex';
    g('content').style.gridTemplateColumns = 'repeat(2, 1fr)';
    g('left').style.justifySelf = 'end';
    chatopen = true;
  }
}

function togglegame(){
  if (openedconnect4){
    g('connect-4').style.opacity = 0;
    openedconnect4 = false;
  } else if (connected){ // can only open if connected
    g('connect-4').style.opacity = 1;
    openedconnect4 = true;
  }
}

function closeit(){
  if (openedconnect4){
    g('connect-4').style.opacity = 0;
    openedconnect4 = false;
  } else if (chatopen){
    g('message-holder').style.display = 'none';
    g('content').style.gridTemplateColumns = '1fr';
    g('left').style.justifySelf = 'unset';
    chatopen = false;
  }
}

function playfromstart(){
  audio.currentTime = 0;
  playing = true;

  const button = g('playpause');
  button.removeChild(button.firstChild);
  const newButton = document.createElement('i');
  newButton.classList.add('fa-solid');
  newButton.classList.add('fa-circle-pause');
  button.appendChild(newButton);
  button.style.backgroundColor = 'var(--accent-color)';
  
  audio.play();
}

function playOrPause() {
  const button = g('playpause');

  if (playing) {
    audio.pause();
    playing = false;
    button.removeChild(button.firstChild);
    const newButton = document.createElement('i');
    newButton.classList.add('fa-solid');
    newButton.classList.add('fa-circle-play');
    button.appendChild(newButton);
    button.style.backgroundColor = 'var(--negative-color)';
  }

  else {
    audio.play();
    playing = true;
    button.removeChild(button.firstChild);
    const newButton = document.createElement('i');
    newButton.classList.add('fa-solid');
    newButton.classList.add('fa-circle-pause');
    button.appendChild(newButton);
    button.style.backgroundColor = 'var(--accent-color)';
  }
}