async function connectperson(){
  // ok absically we have an id right
  linking = true;


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

}