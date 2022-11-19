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

(async () => {

  while (true){
    
    // we can have the fetcher in here

    if (linking){ // then we need to poll and stuff

            // lets get a time 
      var d = new Date();
      if (d.getSeconds() % 5 == 0){ // check every 10 sec to link
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

                      // now clear the thing if u have the higher id
                      let otherid = parseInt(gottenonline[u].replace('%20',' ').split('00')[1]);
                      console.log('otherid'+otherid+' ourid'+randnum);
                      if (randnum > otherid){ // we can clear
                        clearlinker();
                      }

                      connectedtarget = gottenonline[u].replace('%20',' ');

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

    // now if ur connected
    if (connected){ //and cpnnectedtarget is the person
    }
    
    await sleep(1000); // garuntee not to call 2 times
  }
})();
