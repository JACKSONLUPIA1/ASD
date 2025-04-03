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

  checkIpConnection: function(arr, ip) {
    if (arr.includes(ip) && arr.length > 1) {
      // dup ip
      return true;
    } else {
      return false;
    }
  },

  // creates array to set (remove dupes)
  toSet: function(arr) {
    return [new Set(arr)];
  },
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
