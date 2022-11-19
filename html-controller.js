async function connectperson(){
  // ok absically we have an id right

  pname = g('name').value;
  id = pname+'00'+randnum;

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
  let d = g('message-holder');

  const div = document.createElement('div');
  div.innerHTML = `  <h6 class="yourmessage">you: ${msg}</h6>`;
  d.appendChild(div);
}

function addothermsg(ct, msg){
  let d = g('message-holder');

  const div = document.createElement('div');
  div.innerHTML = `  <h6 class="yourmessage">${ct.replaceAll('%20',' ').split('00')[0]}: ${msg.replaceAll('%20',' ')}</h6>`;
  d.appendChild(div);
}