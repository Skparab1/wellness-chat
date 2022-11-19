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
      }
    }
    
    await sleep(1000); // garuntee not to call 2 times
  }
})();
