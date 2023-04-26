
var contenido = document.querySelector("#contenido");
var searchInput = document.querySelector("#search-input");
var searchButton = document.querySelector("#search-button");

//cambia el color del navbar
$(document).ready(function () {
    $(".navbar").hover(function () {
        $(this).css({ 'background-color': '#ef3535' });
    },
        function () {
            $(this).css({ 'background-color': '' });
        });
});

//fetch consumo de API
fetch('https://digimon-api.vercel.app/api/digimon')
    .then(response => response.json())
    .then(datos => {
        tabla(datos)
    });

function tabla(datos) {
    contenido.innerHTML = ""
    let contador = 1;
    for (let temp of datos) {
        contenido.innerHTML += `      
        <tr>
            <th scope="row">${contador}</th>
            <td>${temp.name}</td> 
            <td><a href="${temp.img}" target="_blank"><img src="${temp.img}" width="50" height="50" class="zoom-img"></a></td>
            <td>${temp.level}</td>
        </tr>
        `
        contador++;
        if (contador > 20) {
            break;
        }
    }
}
//Search API
function searchDigimon() {
    var searchTerm = searchInput.value.toLowerCase();
    fetch('https://digimon-api.vercel.app/api/digimon')
        .then(response => response.json())
        .then(datos => {
            var filteredData = datos.filter(function (digimon) {
                return digimon.name.toLowerCase().includes(searchTerm);
            });
            tabla(filteredData);
        });
}

searchButton.addEventListener('click', searchDigimon);

//retira el texto de las cards

var cards = document.querySelectorAll('.card');

cards.forEach(card => {
    card.addEventListener('click', () => {
        var text = card.querySelector('.card-text');
        if (text.style.display === 'none') {
            text.style.display = 'block';
        } else {
            text.style.display = 'none';
        }
    });
});