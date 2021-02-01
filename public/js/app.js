

// fetch(`http://localhost:3000/weather?address=Boston`).then((response) => {
//     response.json().then((data) => {
//         if(data.error){
//             console.log('An error occured')
//         }else{
//             console.log(data.location)
//             console.log(data.forecast)
//         }
//     })
// })

const weatherForm = document.querySelector('form')
const searchEl = document.querySelector('input')
const message1 = document.querySelector('#message1')
const message2 = document.querySelector('#message2')


// message1.textContent = ''
// message2.textContent= 'Hello'

weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    
    message1.textContent = 'Loading'
    message2.textContent = ''
    
    const location = searchEl.value
    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) =>{
            if(data.error){
                message1.textContent = data.error
            }else{ 
                message1.textContent = data.location
                message2.textContent = data.forecast
            }
        })
    })
    console.log(location)
    searchEl.value = ''
})


