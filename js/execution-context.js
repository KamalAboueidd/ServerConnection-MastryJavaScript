 // Async Js  ( بسم الله الرحمن الرحيم مراجعه بما يرضي الله ان شاء الله)

 console.log("computer sience is the best field in the world 1");   // 1
 
 setTimeout(()=> {
       console.log("computer sience is the best field in the world 2"); // 4
 },2000)
 Promise.resolve().then(()=> {
      console.log("computer sience is the best field in the world 3"); // 3
 })
 console.log("computer sience is the best field in the world 4");  //2 

// Output:
// computer sience is the best field in the world 1
// computer sience is the best field in the world 4
// computer sience is the best field in the world 3
// computer sience is the best field in the world 2


console.log("*".repeat(30));
