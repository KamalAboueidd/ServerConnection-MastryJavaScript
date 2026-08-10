 
   //  باختصار انا عندي اينبوت فيلد علشان بسيرش علي حجاه معينه ف موقع ميعن وكل ححاجه بكتبها بيبتعمل بيها سيرش بالكويري اللي كتبتها طب ونت هتفضل مره مره تفضل تفيتش ؟ ممكن اكتر من 10 مرات هيحصل عند مشاكل لاووم تششوف حل علشان متفضلش تكرر الفيتشينج دا  ف نستخدم الابورت كتنترولر
   
 let  currentController = null

  async function fetchData(searchData)
  {
     if(currentController)
     {
         currentController.abort();
     }
     try {
       currentController = new AbortController();
         const request = await fetch(`[https://api.example.com/search?q=$](https://api.example.com/search?q=$){searchData}`,
            {
                 signal : currentController.signal
            }
         )
         if(!request.ok)
         {
            throw new Error("Error fetch");
         }
          const data =await request.json();
          console.log("Data Fetched",data);
     }catch(error)
     {
      if (error.name === 'AbortError') {
            console.log("fetching cancelld by abort controller" , searchData);  
    }else {
         console.error("Error Netwok falire" , error);
    }
  }
}
fetchData("k")
fetchData("ka")
fetchData("kam")
fetchData("kamal")
/*
 fetching cancelld by abort controller K
 fetching cancelld by abort controller ka 
 fetching cancelld by abort controller kam
Data Fetched Successfully: { ... }  
*/