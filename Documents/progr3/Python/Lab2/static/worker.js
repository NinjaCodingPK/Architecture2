var i
var toRet = 0;

onmessage=function(event) {
    console.log("Worker ", event.data.id, " Started");

    nameRQ = event.data; 	/* Имя запрашиваемого файла */

    xhttp = new XMLHttpRequest(); /* создаем XMLHttpRequest-запрос */

    setTimeout(function() { toRet = event.data.weight / event.data.truck }, Math.floor((Math.random() * 1000000) + 1));

    //console.log(toRet);
    //console.log(event.data.weight);
    //console.log(event.data.truck);

    //AJAX IS NOT WORKING !!?!?!?!
    xhttp.onreadystatechange = function(){
    	if (xhttp.readyState == 4) {
		    if (xhttp.status == 200) {
                console.log("RETURNING");
                postMessage({goodReq0:xhttp.responseText, ret:toRet})
                //postMessage(1);
		    } else {
			    //alert(xhttp.status);
		    }
	    }
    }; /* Обработчик запроса */

    xhttp.open('GET','http://localhost:8080/calculations',true); /* открываем запрос */
    xhttp.send(); /* и запускаем */


    // postMessage({goodReq0:xhttp.responseText, ret:toRet, id:event.data.id})
}




self.addEventListener('message', function(e) {
    i = e.data;
    for(var n = 0; n < 10; n++)
    {
        //console.log(i)
        i = i + 1
        self.postMessage(i)
    }
})


/*onmessage = function(ev)
{
    var answ = ev.data;
};

postMessage(answ);*/

/*
self.addEventListener('message', function(e) {
  var data = e.data;
  switch (data.cmd) {
    case 'start':
      self.postMessage('WORKER STARTED: ' + data.msg);
      break;
    case 'stop':
      self.postMessage('WORKER STOPPED: ' + data.msg + '. (buttons will no longer work)');
      self.close(); // Terminates the worker.
      break;
    default:
      self.postMessage('Unknown command: ' + data.msg);
  };
}, false);
*/

/*
var n = 1;
search: while (true) {
  n += 1;
  for (var i = 2; i <= Math.sqrt(n); i += 1)
    if (n % i == 0)
     continue search;
  // found a prime!
  self.postMessage(n);
}*/