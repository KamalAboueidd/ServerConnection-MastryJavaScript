 // HTTP connection sever example
 console.log("HTTP connection sever example");
async function CreateConnection() 
 {
       const endPoint = "https://jsonplaceholder.typicode.com/users";

       try {
             const response = await fetch(endPoint , 
                {
                     method: "Post",
                     headers : {
                            "Content-Type": "application/json",
                            "Accept": "application/json",
                            "Authorization": "Bearer MockToken"
                     },
                     body: JSON.stringify({
                         name : "Kamal Abou eid",
                         email : "kamalanoueidd@gmail.com",
                         Role: "Software Engineer"
                     }) 
                }
            );
            console.log("Http response status : ", response.status);
           if (!response.ok) {
      if (response.status === 400) console.log("Bad Request");
      else if (response.status === 401) console.log("Unauthorized");
      else if (response.status === 403) console.log("Forbidden");
      else if (response.status === 404) console.log("Not Found");
      else if (response.status >= 500) console.log("Internal Server Error");

      throw new Error(`HTTP error! status: ${response.status}`);
    }
             const ContentType = await response.json();
             console.log("user Craeted Successfuly : ", ContentType);
       }catch (error) {
             console.error("regestration failed: ", error);
       }
 }
 CreateConnection();