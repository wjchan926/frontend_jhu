// *******************************
// START HERE IF YOU WANT A MORE CHALLENGING STARTING POINT FOR THIS ASSIGNMENT
// *******************************
//
// Module 4 Assignment Instructions.
//
// The idea of this assignment is to take an existing array of names
// and then output either Hello 'Name' or Good Bye 'Name' to the console.
// The program should say "Hello" to any name except names that start with a "J"
// or "j", otherwise, the program should say "Good Bye". So, the final output
// on the console should look like this:
/*
Hello Yaakov
Good Bye John
Good Bye Jen
Good Bye Jason
Hello Paul
Hello Frank
Hello Larry
Hello Paula
Hello Laura
Good Bye Jim

WARNING!!! WARNING!!!
The code does NOT currently work! It is YOUR job to make it work
as described in the requirements and the steps in order to complete this
assignment.
WARNING!!! WARNING!!!

*/

(function () {
  const names = [
    "Yaakov",
    "John",
    "Jen",
    "Jason",
    "Paul",
    "Frank",
    "Larry",
    "Paula",
    "Laura",
    "Jim",
  ];

  ////////
  // #1 //
  ////////
  for (let i = 0; i < names.length; i++) {
    const firstLetter = names[i].charAt(0).toLowerCase();
    if (firstLetter === "j") {
      byeSpeaker.speak(names[i]);
    } else {
      helloSpeaker.speak(names[i]);
    }
  }

  ////////
  // #2 //
  ////////
  /**
   * addGreeting adds the corresponding greeting based on the supplied name.
   * @param {string} name
   * @returns Greeting concatenated to name
   */
  function addGreeting(name) {
    const firstLetter = name.charAt(0).toLowerCase();
    if (firstLetter === "j") {
      return byeSpeaker.speakSimple(name);
    }
    return helloSpeaker.speakSimple(name);
  }

  // Create array with map
  const greetingNameArr = names.map(addGreeting);
  
  // Log out each greeting and name in array to browser console
  greetingNameArr.forEach((greetingName) => console.log(greetingName));

  ////////
  // #3 //
  ////////
  const { hello, bye } = names.reduce(
    (separatedNamesObj, name) => {
      const firstLetter = name.charAt(0).toLowerCase();
      if (firstLetter === "j") {
        separatedNamesObj.bye.push(byeSpeaker.speakSimple(name));
        return separatedNamesObj;
      }
      separatedNamesObj.hello.push(helloSpeaker.speakSimple(name));
      return separatedNamesObj;
    },
    { hello: [], bye: [] }
  );

  // Log out seperated greeting and names to console
  hello.forEach(greetingName => console.log(greetingName));
  bye.forEach(greetingName => console.log(greetingName));
})();
