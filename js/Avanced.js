 // Promise.All() .
const fetchUserData = () => 
  new Promise((resolve) => setTimeout(() => resolve({ id: 1, name: "Kamal" }), 1000));

const fetchUserOrders = () => 
  new Promise((resolve) => setTimeout(() => resolve(["Order #101", "Order #102"]), 2000));

const fetchUserNotifications = () => 
  new Promise((resolve) => setTimeout(() => resolve(["Welcome back!" ]), 1500));


// Promise.all
async function loadDashboard() {
  try {
    console.time("⏱ Dashboard Loading Time");

    
    // make a destructring in the same order . 
    const [user, orders, notifications] = await Promise.all([
      fetchUserData(),
      fetchUserOrders(),
      fetchUserNotifications()
    ]);

    console.log(" User:", user);
    console.log(" Orders:", orders);
    console.log(" Notifications:", notifications);

    console.timeEnd(" Dashboard Loading Time"); 

  } catch (error) {
     // if at least one have confilct all will go to catch , nothing execute .
    console.error(" Dashboard Failed to Load:", error);
  }
}

loadDashboard();

// ------------- promise.allSettled()  ------------ 
    const fetchUserProfile = () => 
         new Promise((resolve) => setTimeout(()=> resolve("User Profile Loaded"),1000)); 

    const fetchUserCard = () => 
         new Promise((resolve,reject) => setTimeout(()=> reject("Analytics Service Down"),2000));
    // !!!!!!!!!
    // Never goes to catch! Returns an array of objects describing the state of each promise   (status: 'fulfilled' with value, or status: 'rejected' with reason).

    async function LoadDasshboardSalfley()
    {
         const result = await Promise.allSettled([
            fetchUserProfile(),
            fetchUserCard()
         ])
         console.log(result)
    }
    LoadDasshboardSalfley()

    // --------------- Promise.race --------------- 

    const fetchData = ()=> new Promise((resolve)=>setTimeout(()=> resolve("Data Fetched"),2000))

    const timOut = () => new Promise((_,reject) => setTimeout(()=>reject("Request TimOut")  ,1500))

    async function fetchwithTimeOut() 
    {
        try{
            const data  = await Promise.race([fetchData(),timOut()]) 
          console.log(data)
        }catch(error){
            console.log("Race ||| Failed" , error);     
        }
    }
    fetchwithTimeOut();

    //   -----Promise.any() ----- 
    const cdnServer1 = () => 
  new Promise((_, reject) => setTimeout(() => reject("CDN 1 Down"), 500));

const cdnServer2 = () => 
  new Promise((resolve) => setTimeout(() => resolve("Fast Asset from CDN 2"), 1000));

async function fetchFromFastestCDN() {
  try {
    // Ignores CDN 1 failure and takes the first success (CDN 2)
    const result = await Promise.any([cdnServer1(), cdnServer2()]);
    console.log("Success:", result); // Fast Asset from CDN 2
  } catch (error) {
    // Only executes if both CDN 1 and CDN 2 fail
    console.error("All CDNs failed:", error.errors);
  }
}

fetchFromFastestCDN();