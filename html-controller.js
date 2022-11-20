async function connectperson(){
  // ok absically we have an id right

  pname = g('name').value;
  id = pname+'00'+randnum;

  openelement('loader');

  id = id.replaceAll(' ','');

  if (!linking && pname != '' && !connected){ // dont link twice, cant do with no name
    linking = true;

    g('connector').textContent = 'Connecting...';

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
  div.innerHTML = `  <h6>${ct.replaceAll('%20',' ').split('00')[0]}: ${ decodeURI(msg.replaceAll('%20',' '))}</h6>`;
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
  g('connect-4').style.display = 'block';
}

function hoverboard(){
  var e = window.event;

  var x = e.clientX;
  var y = e.clientY+window.scrollY;//-window.innerHeight;

  console.log(x,y,width*0.1+1*0.8/8*width+cx, width*0.1+1*0.8/8*width+0.01*width+g('cvs').offsetLeft);

  // now figure out if it lies in the boxes
  let w = 1;
  while (w <= 7){
    ctx.beginPath();
    //ctx.arc(width*0.1+w*0.8/8*width, height*0.1+1*0.4/6*height, 0.28/8*width,0, Math.PI*2);
    if (x >= width*0.1+w*0.8/8*width-0.28/8*width+cx && x <= width*0.1+w*0.8/8*width+0.28/8*width+cx && y >= height*0.1-1*0.4/6*height+g('cvs').offsetHeight && y <= height*0.1-1*0.4/6*height+0.28/8*width+g('cvs').offsetHeight){
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
  var y = e.clientY+window.scrollY;

  // now figure out if it lies in the boxes

  let w = 1;
  while (w <= 7 && myturn){
    ctx.beginPath();
    //ctx.arc(width*0.1+w*0.8/8*width, height*0.1+1*0.4/6*height, 0.28/8*width,0, Math.PI*2);
    if (x >= width*0.1+w*0.8/8*width-0.28/8*width && x <= width*0.1+w*0.8/8*width+0.28/8*width && y >= height*0.1-1*0.4/6*height+g('cvs').offsetHeight && y <= height*0.1-1*0.4/6*height+0.28/8*width+g('cvs').offsetHeight){
      ctx.fillStyle = 'rgb(255,0,0)';

      let u = 5;
      while (u >= 0){
        if (currentgrid[u][w] == 0){ // empty
          currentgrid[u][w] = 1;
          ctx.arc(width*0.1+w*0.8/8*width, height*0.1+(u+2)*0.4/6*height, 0.28/8*width,0, Math.PI*2);
          myturn = false;
          break;
        }
        u -= 1;
      }
      ctx.fill();
    }
    w += 1;
  }
}