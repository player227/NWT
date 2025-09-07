// //func send
// export function sendScore(name, score) {
//     const params = {
//         name: name,
//         score: score
//     };

//     const options = {
//         method: "POST",
//         body: JSON.stringify(params)
//     };

//     fetch("./php/api.php", options)
//         .then(response => response.json())
//         .then(data => {
//             if (data.success) {
//                 console.log("Uspjesni unos!");
//                 delScores();
//             } else {
//                 console.log("Dogodila se greska!");
//                 throw new Error(data.message);
//             }
//         })
//         .catch(err => console.error(err));
// }

// //func get
// export async function getScores() {
//     const options = {
//         method: "GET"
//     };

//     const scores = await fetch("./php/api.php", options)
//         .then(response => response.json())
//         .then(data => {
//             if (data.success) {
//                 return data;
//             } else {
//                 console.log("err");
//                 throw new Error(data.message);
//             }
//         })
//         .catch(err => console.error(err));
//     return scores;
// }


// //func del
// //is called after sending score to delete all scores except top 10
// function delScores() {
//     const params = {
//         del: true
//     };

//     const options = {
//         method: "POST",
//         body: JSON.stringify(params)
//     };
//     fetch("./php/api.php", options)
//         .then(response => response.json())
//         .then(data => {
//             if (data.success) {
//                 console.log("Uspjesni update!");
//             } else {
//                 console.log("Dogodila se greska!");
//                 throw new Error(data.message);
//             }
//         })
//         .catch(err => console.error(err));
// }

// In-memory dummy data for scoreboard
let dummyScores = [
  { Name: "Alice", Score: 120 },
  { Name: "Bob", Score: 110 },
  { Name: "Charlie", Score: 95 },
  { Name: "Dana", Score: 80 },
  { Name: "Eve", Score: 70 }
];

// Simulate fetching all scores (GET)
export function getScores() {
  console.log("Fetching scores");
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(dummyScores);
      resolve({ data: [...dummyScores] });
    }, 100);
  });
}

// Simulate adding a new score (POST)
export function addScore(newScore) {
  console.log("Adding score:", newScore);
  return new Promise((resolve) => {
    setTimeout(() => {
      dummyScores.push(newScore);
      
      // trim to top 5
      if (dummyScores.length > 5) {
        dummyScores.sort((a, b) => b.Score - a.Score);
        dummyScores = dummyScores.slice(0, 5);
      }

      console.log(dummyScores);
      resolve({ success: true, data: newScore });
    }, 100);
  });
}

// Simulate updating a score (PUT)
export function updateScore(name, updatedScore) {
  console.log("Updating score for:", name, updatedScore);
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("find index for:", name);
      const idx = dummyScores.findIndex(s => s.Name === name);
      console.log("Found index:", idx);
      if (idx !== -1) {
        dummyScores[idx] = { Name: name, Score: updatedScore };
        dummyScores.sort((a, b) => b.Score - a.Score);
        console.log(dummyScores);
        console.log("Successfully updated score for:", name, updatedScore);
        resolve({ success: true, data: dummyScores[idx] });
      } else {
        addScore({ Name: name, Score: updatedScore });
        console.log(dummyScores);
        console.log("Failed to update score for:", name);
        resolve({ success: false, error: "Score not found" });
      }
    }, 100);
  });
}

// Simulate deleting a score (DELETE)
export function deleteScore(name) {
  console.log("Deleting score for:", name);
  return new Promise((resolve) => {
    setTimeout(() => {
      const initialLength = dummyScores.length;
      dummyScores = dummyScores.filter(s => s.Name !== name);
      console.log(dummyScores);
      resolve({ success: dummyScores.length < initialLength });
    }, 100);
  });
}

// Simulate sending a score
export function sendScore(name, updatedScore) {
  console.log("Sending score for:", name, updatedScore);
  updateScore(name, updatedScore).then(() => {
  });
} 
