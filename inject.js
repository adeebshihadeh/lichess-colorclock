chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
  	if (document.readyState === "complete") {
  		clearInterval(readyStateCheckInterval);

      var timer;

      if (document.querySelector(".header") &&
          document.querySelector(".header").innerText.indexOf("now") &&
          document.querySelectorAll(".time").length >= 2 &&
          !!document.querySelector("#user_tag") &&
          document.querySelectorAll(".username")[1].innerText.indexOf(document.querySelector("#user_tag").innerText) >= 0) {
        timer = setInterval(loop, 10);
        console.log("active game detected");
      } else {
        console.log("no active game");
      }

      function loop() {
        if (document.querySelector(".result") ||
            document.querySelector(".moves").innerText.indexOf("aborted") > 0) {
          window.clearInterval(timer);
          console.log("game ended");
          document.querySelector("body").style.background = null;
          return;
        }

        var l = document.querySelectorAll(".time").length;
        var opTime = getSeconds(document.querySelectorAll(".time")[l-2].innerText);
        var time = getSeconds(document.querySelectorAll(".time")[l-1].innerText);

        if (opTime < 5 || time < 5) {
          document.querySelector("body").style.background = opTime < time ? "green" : "red";
        } else {
          document.querySelector("body").style.background = null;
        }
      }

      function getSeconds(t) {
        t = t.split(":").reverse();
        var seconds = 0;
        for (var i = t.length-1; i > 0; i--) {
          seconds += parseFloat(t[i] * 60*i);
        }
        return seconds + parseFloat(t[0]);
      }
  	}
	}, 10);
});