

let inputText = document.getElementById('input')
const dataDiv = document.getElementById('dataDiv')
document.getElementById('button').addEventListener('click', () => {
    event.preventDefault();
    const place = inputText.value
    //const path = process.env.PATH?!http://localhost:3000

    console.log("hello")
    console.log(place)
    dataDiv.innerHTML="loading..."

    url = `/weather?address=${place}`
    fetch(url).then((response) => {
        response.json().then((data) => {
            console.log(data)
            if(data.error){
                dataDiv.innerHTML = `ERROR : ${data.error}`
            }else{
                dataDiv.innerHTML=""
                const table = document.createElement('ul')
                let node = document.createElement('li')
                node.textContent = `location : ${data.locationName}`
                table.appendChild(node)
                node = document.createElement('li')
                node.textContent = `country : ${data.countryName}`
                table.appendChild(node)
                node = document.createElement('li')
                node.textContent = `temperature : ${data.temperature}`
                table.appendChild(node)
                node = document.createElement('li')
                node.textContent = `weather : ${data.desription}`
                table.appendChild(node)

                dataDiv.append(table)
            }
        })
    })

})




