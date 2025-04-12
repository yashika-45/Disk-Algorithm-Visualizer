// Disk Scheduling Algorithms

// FCFS Algorithm
function fcfsAlgo(requests, head) {
    let total = 0;
    let current = head;
    for (let r of requests) {
      total += Math.abs(current - r);
      current = r;
    }
    return total;
  }
  
  // SSTF Algorithm
  function sstfAlgo(requests, head) {
    let total = 0;
    let current = head;
    let remaining = [...requests];
    
    while (remaining.length > 0) {
      const closest = remaining.reduce((prev, curr) => 
        Math.abs(curr - current) < Math.abs(prev - current) ? curr : prev
      );
      total += Math.abs(current - closest);
      current = closest;
      remaining = remaining.filter(item => item !== closest);
    }
    return total;
  }
  
  // SCAN Algorithm
  function scanAlgo(requests, head) {
    requests.sort((a, b) => a - b);
    let total = 0;
    let current = head;
  
    let left = requests.filter(r => r < head);
    let right = requests.filter(r => r > head);
  
    total += Math.abs(current - left[0]); // Go left first
    current = left[0];
  
    for (let r of left.reverse()) {
      total += Math.abs(current - r);
      current = r;
    }
  
    total += Math.abs(current - right[0]); // Go to the right side
    current = right[0];
  
    for (let r of right) {
      total += Math.abs(current - r);
      current = r;
    }
  
    return total;
  }
  
  // C-SCAN Algorithm
  function cscanAlgo(requests, head) {
    requests.sort((a, b) => a - b);
    let total = 0;
    let current = head;
  
    let right = requests.filter(r => r > head);
    total += Math.abs(current - right[0]);
    current = right[0];
  
    for (let r of right) {
      total += Math.abs(current - r);
      current = r;
    }
  
    total += Math.abs(current - requests[0]); // Wrap around
    current = requests[0];
  
    for (let r of requests) {
      total += Math.abs(current - r);
      current = r;
    }
  
    return total;
  }
  
  // LOOK Algorithm
  function lookAlgo(requests, head) {
    requests.sort((a, b) => a - b);
    let total = 0;
    let current = head;
  
    let left = requests.filter(r => r < head);
    let right = requests.filter(r => r > head);
  
    total += Math.abs(current - left[0]);
    current = left[0];
  
    for (let r of left.reverse()) {
      total += Math.abs(current - r);
      current = r;
    }
  
    total += Math.abs(current - right[0]);
    current = right[0];
  
    for (let r of right) {
      total += Math.abs(current - r);
      current = r;
    }
  
    return total;
  }
  
  // C-LOOK Algorithm
  function clookAlgo(requests, head) {
    requests.sort((a, b) => a - b);
    let total = 0;
    let current = head;
  
    let right = requests.filter(r => r > head);
    total += Math.abs(current - right[0]);
    current = right[0];
  
    for (let r of right) {
      total += Math.abs(current - r);
      current = r;
    }
  
    total += Math.abs(current - requests[0]); // Jump to the smallest
    current = requests[0];
  
    for (let r of requests) {
      total += Math.abs(current - r);
      current = r;
    }
  
    return total;
  }
  
  // Handle Form Submission
  document.getElementById("compareForm").addEventListener("submit", function(e) {
    console.log("Form submitted!");

    e.preventDefault();
    
    const requests = document.getElementById("requests").value.split(',').map(Number);
    const head = parseInt(document.getElementById("head").value);
  
    // Calculate the results for each algorithm
    const results = {
      FCFS: fcfsAlgo(requests, head),
      SSTF: sstfAlgo(requests, head),
      SCAN: scanAlgo(requests, head),
      CSCAN: cscanAlgo(requests, head),
      LOOK: lookAlgo(requests, head),
      CLOOK: clookAlgo(requests, head)
    };

    // Clear previous results (if any)
    document.getElementById("result").innerHTML = '';

    // Display results in the form of a list
    let resultHtml = `<h3>Comparison Results</h3><ul class="list-group">`;

    // Find the minimum movement value
    const minMovement = Math.min(...Object.values(results));
    
    // Loop and build list with badge for best
    for (let [algo, movement] of Object.entries(results)) {
      const isBest = movement === minMovement;
      resultHtml += `<li class="list-group-item d-flex justify-content-between align-items-center ${isBest ? 'bg-success text-white font-weight-bold' : ''}">
                      <div>${algo} ${isBest ? '<span class="badge badge-light ml-2">🏆 Best</span>' : ''}</div>
                      <span>Total Head Movement: ${movement}</span>
                    </li>`;
    }
    resultHtml += `</ul>`;
    
    console.log(resultHtml);  
    document.getElementById("result").innerHTML = resultHtml;
  
    // Prepare data for chart
    const labels = Object.keys(results);
    const data = Object.values(results);
  
    // Display Bar Chart
    new Chart(document.getElementById("compareChart"), {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: "Total Head Movement",
          backgroundColor: '#007bff',
          data: data
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,  // Allow chart to resize dynamically
        scales: {
          x: {
            ticks:{
                color:'white'
            }
          },
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 50,
              color: 'white'// Adjust the step size to make the y-axis more readable
            }
          }
        }
      }
    });
});
