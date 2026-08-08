 // Fetching tools deep dive 

 // XHR (XMLHTTPREQUEST)
 // Fetch API
 // Axios ---> industry standard for making HTTP requests in JavaScript


// XHR ==> OOld way of making HTTP requests (from grandpa days).
// Problems with XHR: 
// 1) Verbosity: XHR requires a lot of boilerplate code to set up and handle requests and responses.
// 2) Callback Hell: XHR relies on callbacks, which can lead to nested and hard-to-read code when dealing with multiple asynchronous operations.
// 3) Manual JSON Parsing: XHR does not automatically parse JSON responses, requiring developers to manually handle parsing and error checking.
//4) dont understand promises and async/await, which are more modern approaches to handling asynchronous operations in JavaScript.

//ex 
  function FetchWithXHR ()
  {
      const xhr = new XMLDocumentRequest(); //1 

      xhr.open('GET', 'https://api.example.com/data');  //2 

      xhr.onload = function () // 3
      {
          if(xhr.status >= 200 && xhr.status < 300) 
          {
               const data = JSON.parse(xhr.responseText);
               console.log("XHR data fetched successfully:", data);
          }else 
              {
               console.error("XHR request failed with status:", xhr.status);
              }
      };
      xhr.onerror = function () //4
      {
          console.error("Network error occurred during the XHR request.");
      };

      xhr.send(); //5 
  }
  FetchWithXHR();
 // can cancel the request using xhr.abort()

  // Fetch API ==> Modern way of making HTTP requests (from dad days).

  // downloaded from Es6/promises that compinated with the engine
  // // cancel fetch using AbortController
//   ex 

async function FetchWithFetch ()
{
    try{
        const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
           if(!response.ok)
           {
                throw new Error (`Http Error status : ${response.status}`)
           }
           const data = await response.json();
            console.log(`Data Fetched Succssfully ${data}`);
    }catch(error)
    {
           console.error("Feild to fetch" , error.message); 
    }
}
FetchWithFetch();

// axios ---> Outside lib , encapsulate the Http in good way and save the valut .
// why axios --->  Auto Json Parsing , Automatic error Rejecting 
// any status code outside 2xx host directly handeld by Catch without writing (!response.ok)
// cancel fetch using AbortController/ Interceptors 
 // cancel fetch using AbortController / cancelToken


// ex

async function FetchWithAxios()
{
     try {
          const response = await FetchWithAxios.get("https://jsonplaceholder.typicode.com/posts/1")
        
           // without converting into Hson type (Automitically conv..)
          console.log("Axios data " , response )
     }catch(error)
     {
         if(error.response)
         {
             console.error("Server error status " , error.response.status)
         }esle 
         {
              console.log("Network Error" , error.message)
         }
     }
}
FetchWithAxios();


