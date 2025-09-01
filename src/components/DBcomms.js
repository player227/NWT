//func send
export function sendScore(name, score) {
    const params = {
        name: name,
        score: score
    };

    const options = {
        method: "POST",
        body: JSON.stringify(params)
    };

    fetch("./php/api.php", options)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log("Uspjesni unos!");
                delScores();
            } else {
                console.log("Dogodila se greska!");
                throw new Error(data.message);
            }
        })
        .catch(err => console.error(err));
}

//func get
export async function getScores() {
    const options = {
        method: "GET"
    };

    const scores = await fetch("./php/api.php", options)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                return data;
            } else {
                console.log("err");
                throw new Error(data.message);
            }
        })
        .catch(err => console.error(err));
    return scores;
}

//func del
//is called after sending score to delete all scores except top 10
function delScores() {
    const params = {
        del: true
    };

    const options = {
        method: "POST",
        body: JSON.stringify(params)
    };
    fetch("./php/api.php", options)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log("Uspjesni update!");
            } else {
                console.log("Dogodila se greska!");
                throw new Error(data.message);
            }
        })
        .catch(err => console.error(err));
}