// callback hell
// getLocation(){
//     getLatLong(){
//         getWeather(){
//             getWeatherIcon();
//         }
//     }
// }

// setTimeout(()=>{
//     const data = {user:"Jenny"};
//     console.log(data);
//     setTimeout(()=>{
//         data.age = 13;
//         console.log(data);
//         setTimeout(()=>{
//             data.gender = "Female";
//             console.log(data);
//         },500);
//     },500);
// },500)

// pending, fulfilled, rejected
function getWeather(){
    return new Promise(function(resolve,reject){
        setTimeout(()=>{
            resolve("Winter");
            // reject("Error in fetching data")
        },500)
    })
}

function getWeatherDetail(weather){
    return new Promise(function(res,rej){
        switch(weather){
            case "Winter": res("Cool winds");
                break;
            case "Summer": res("Hot winds");
                break;
            default: rej("Nothing found");
        }
    })
}
// const weather = getWeather();
// console.log(weather);
// function onSuccess(data){
//     console.log(`Success ${data}`);
// }
// function onError(err){
//     console.log(`Error ${err}`);
// }
// // getWeather().then(onSuccess).catch(onError);
// getWeather()
//     .then(getWeatherDetail)
//     .then(onSuccess)
//     .catch(onError);

// fetch('https://jsonplaceholder.typicode.com/users')
//     .then(response => response.json())
//     .then(json => console.log(json))

async function getUsers(){
    const userResponse = await fetch('https://jsonplaceholder.typicode.com/users');
    const usersJsonData = await userResponse.json();
    console.log(usersJsonData);
}

getUsers();