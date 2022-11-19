// wellness chat

const sleep = ms => new Promise(res => setTimeout(res, ms));


// universal random id
var pname = 'skparab1';
var randnum = Math.floor(Math.random()*1000);

var linking = false;
var gottenonline = [];

var id = pname+'00'+randnum;
console.log(id);

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
                      alert('connected with '+gottenonline[u]);

                      // now clear the thing if u have the higher id
                      let otherid = parseInt(gottenonline[u].split('00')[1]);
                      console.log('otherid'+otherid+' ourid'+randnum);
                      if (randnum > otherid){ // we can clear
                        clearlinker();
                      }

                    }
                    u += 1;
                  }
                }
            })
        })();
      }
    }
    
    await sleep(1000); // garuntee not to call 2 times
  }
})();
