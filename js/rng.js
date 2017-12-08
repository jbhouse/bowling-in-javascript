window.addEventListener('load', function() {
  document.body.classList.add('bg-dark');
});

// all hail the god method!!!!!!!!!!!!!!
document.getElementById('bowl').addEventListener('click', function(){
  result = [];
  frameTotal = [];
  runningTotal = [];
  var total = 0;
  for (var i = 0; i < 10; i++) {
    throwBall();
    if (result[i].length===1) {
      frameTotal.push(10);
    } else if (result[i].length===2&&(result[i][0]+result[i][1])===10) {
      frameTotal.push(result[i][0]+result[i][1]);
    } else {
      frameTotal.push(result[i][0]+result[i][1]);
    }
  };

  checkForExtraFrames();

  updateRunningTotal(total);

  var score = document.createElement('p');

  var frameRow = document.createElement('tr');
  for (var i = 0; i < result.length; i++) {
    var frameInstance = document.createElement('td');
    frameInstance.setAttribute("style", "text-align:center;");
    if (i>9) {
      frameInstance.innerHTML = "|"+frameTotal[1]+"|";
    } else {
      if (i===frameTotal.length-1) {
        frameInstance.innerHTML = result[i][0]+"|"+result[i][1]+"";
      } else {
        if (result[i].length===1) {
          frameInstance.innerHTML = "X";
        } else if (result[i].length===2&&frameTotal[i]===10) {
          frameInstance.innerHTML = result[i][0]+"|/";
        } else {
          frameInstance.innerHTML = result[i][0]+"|"+result[i][1];
        }
      }
    }
    frameRow.appendChild(frameInstance);
  };

  var cumulativeTotal = document.createElement('tr');
  for (var i = 0; i < runningTotal.length; i++) {
    var totalInstance = document.createElement('th');
    if (i===0) {
      totalInstance.innerHTML = "| score: "+runningTotal[i];
    } else if (i<9) {
      totalInstance.innerHTML = "  | score: " + runningTotal[i];
    } else if (i===9) {
      totalInstance.innerHTML = "  | score: " + runningTotal[i] + " |";
    }
    cumulativeTotal.appendChild(totalInstance);
  }
  var scoreTotal = document.createTextNode('total: ' + total);
  var breaker = document.createElement('br');
  score.appendChild(frameRow);
  score.appendChild(cumulativeTotal);
  document.getElementById('result').appendChild(score);
  result = [];
  frameTotal = [];
  total = 0;
});

function throwBall() {
  var firstAttempt = Math.floor(Math.random()*11);
  if (firstAttempt===10) {
    result.push([10]);
  } else {
    secondAttempt = Math.floor(Math.random()*((10-firstAttempt)+1));
    if (firstAttempt+secondAttempt === 10) {
      result.push([firstAttempt,secondAttempt]);
    } else {
      result.push([firstAttempt,secondAttempt]);
      return firstAttempt+secondAttempt;
    }
  }
};

function checkForExtraFrames() {
  // if the 10th frame is a strike we get two more frames
  if (result[result.length-1].length===1) {
    for (var i = 0; i < 2; i++) {
      var bonusThrow = Math.floor(Math.random()*11);
      result.push(bonusThrow);
      frameTotal.push(bonusThrow);
    };
    // if it is a spare, we get one more frame
  } else if (result[result.length-1].length===2&&frameTotal[frameTotal.length-1]===10) {
      var bonusThrow = Math.floor(Math.random()*11);
      result.push(bonusThrow);
      frameTotal.push(bonusThrow);
  };
};

function updateRunningTotal(total) {
  for (var i = 0; i < result.length; i++) {
    // we ignore the bonus frames, except for adding the result to the 10th frames total
    if (i>9) {
    } else {
      // if we get a strike and it is the second from the last frame we only count it and the last frame. otherwise index out of bounds
    if (result[i].length===1&&i===frameTotal.length-2) {
      total+=(frameTotal[i]+frameTotal[i+1]);
    } else if (result[i].length===1) {
      total+=(frameTotal[i]+frameTotal[i+1]+frameTotal[i+2]);
     // if we get a spare
    } else if (result[i].length===2&&frameTotal[i]===10) {
      total+=(frameTotal[i]+frameTotal[i+1]);
    } else {
      total+=frameTotal[i];
    }
  }
    runningTotal.push(total);
  };
};