// let p1 = new Promise((resolve, reject) => {
//     console.log("Promise is pending")
//     setTimeout(() => {
//         resolve(true)
//     }, 2000)
// })


// let p2 = new Promise((resolve, reject) =>{
//     console.log("Promise is pending")
//     setTimeout(() => {
//         reject(true)
//     }, 2000)
// })

// p1.then((value) => {
//     console.log(value)
// })

// p2.catch(() => {
//     console.log("Rejected")
// })

// p2.then((value) => {
//     console.log(value)
// })


//API
const URL = "https://jsonplaceholder.typicode.com/users";

const getDetails = async () => {
    try {
        let response = await fetch(URL); 
        console.log(response);   
        let data = await response.json(); 
        console.log(data);  
    } catch (err) {
        console.log("Error:", err); 
    }
}

getDetails();



function sendRequest(method, url, body = null)
{
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);

    xhr.onload = function(){
        if(xhr.status >= 200 && xhr.status > 300){
            console.log(`${method} Error:`, JSON.parse(xhr.responseText));
        }
        else{
            console.log(`${method} Error:`, xhr.status, xhr.statusText);
        }
    }
    xhr.onerror = function(){
        console.log(`${method} Request Failed`);
    }
}

//get
function getData(){
    sendRequest('GET', 'URL')
}

//post
function postData(){
    const data1 = {
        id: 11,
        name: "Ritu",
        username: "Ritu"
    }
    sendRequest('PUT', 'URL', data1);
    console.log(data1)
}
postData();