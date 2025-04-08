module.exports = {
  // returns the ip without all the local host connection
  trimIp: function(ip) { 
    ip = ip.trim();
    if (ip == "::1") { // local host
      // console.log("\nTRIM DEBUG: LOCAL HOST DETECTED\n");
      return "local host (" + ip + ")";
    } else {
      return ip.split(":").pop();
    }
  },

  getCommand: function(message) {
    if (message.substring(1).indexOf('/') !== -1) {
      console.log("Error in using function 'getCommand' Function can only accept one '/'");
      return;
    }
    
    newMessage = message.split('/').pop();

    switch (newMessage) {
      case "help":
        return "This is a chat bot project created by a cyber security student to help understand networking more.\nThis website has no practical value. Try to burp me ;)";
      default:
        console.log("unknown command: /" + newMessage);
        break;
    }
  },

  // checkIpConnection: function(arr, ip) {
  //   if (arr.includes(ip) && arr.length > 1) {
  //     // dup ip
  //     return true;
  //   } else {
  //     return false;
  //   }
  // },

  // creates array to set (remove dupes)
  toSet: function(arr) {
    return [new Set(arr)];
  },

  // removeHostedIp: function(arr) {
  //   if (!render) {
  //     console.log("Local host Error:%nfunction: (removeHostedIp) can not run on a local environment");
  //     return arr;
  //   }
  //   var newArr = new Array();
  //   arr.forEach((element, index) => {
  //     if (index % 3 == 0) {
  //       newArr.push(element);
  //     }
  //   });
  //   return newArr;
  // },

  // this is only tested on a local environemnt, hosted website will 100% have different output
  // isUnique: function(ip, arr) {
  //   // trim down array so it's only real ips, not hosted ips
  //   // arr = removeHostedIp(arr);
  //   if (arr.indexOf(ip) == -1) { // doesn't exist yet
  //     return true; 
  //   } else {
  //     return false;
  //   }
  // }
}




    // if (myFunction.checkIpConnection(connectionArr, clientIp)) { 
    //   // indexOf Removes ALL instances of duplicate IP's, since there is no more dup ip's even if the og is still connected :)
    //   simpleIpArr.splice(simpleIpArr.indexOf(clientIp));
    //   console.log("Duplicate IP connection has disconnected. \n" + simpleIpArr);
    // } else {
    //   console.log("Not removing from array since there is a multiple connections from the same ip");
    // }

      // if unique ip
  // if (myFunction.checkIpConnection(connectionArr, clientIp)) { 
  //   simpleIpArr.push(clientIp);
  //   console.log("Duplicate IP found: \n" + simpleIpArr);
  // }
