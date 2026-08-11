function debounce(fn, delay = 500) {
  let timerId = null;

  return function (...args) { 
    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(() => {
      fn.apply(this, args); 
    }, delay);
  };
}
function fetchSearchResults(query) {
  console.log(` Sending API Request for: "${query}"`);
}
//    link to Search Input
const debouncedSearch = debounce(fetchSearchResults, 500);

debouncedSearch("K");    
debouncedSearch("Ka");   
debouncedSearch("Kamal"); 

  //  من الاخر ف السيرش ايبنوبت انا بوقف الفيتش لمده 500 ثانيه بعد كل مره بكتب فيها جرف او اي حاجه علشانن معملش فيتش كتير 

   function debounce(func , delay = 500)
   {
       let Timer = null 

       return function(...args)
    {
         if(Timer) clearTimeout(Timer)
        timerId = setTimeout(()=> {
             func.apply(this,args)
    },delay)
       }
   }


  function ftechData(query)
  {
     console.log("Data Fetch Succsfully ", query)
  }

  const debounceSearch = debounce(ftechData , 500);

  debounceSearch("hel")  // كتبت ده يستني ملي 500 ثانيه وبعدا يفيتش طب لو قبل ال500 غيرت الكلمه هيحسب 500 ملي ثانيه من تاني
  debounceSearch("hello"); // Data Fetch Succsfully hello ;


