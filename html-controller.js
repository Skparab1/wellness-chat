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