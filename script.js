function main(){

    document.querySelector("#src").addEventListener("click", evt =>{
        let id = document.querySelector("#id").value;
        if (id != ""){
            fetch("https://api.restful-api.dev/objects/" + id)
            .then(res => res.json())
            .then(data => montarDados(data))
        }
    })
    
}

function montarDados(dados){
    console.log(dados);
    if ("error" in dados){
        return;
    }
    let linha = document.createElement("tr");
    let tbody = document.querySelector("#tbody")
    //#region comentarios
    // dados.forEach(elem => {
    //     let caixa = document.createElement("td");
    //     caixa.innerHTML = elem;
    //     linha.appendChild(caixa);
    // })
        // let caixa = document.createElement("td");
        // caixa.innerHTML = dados.id;
        // linha.appendChild(caixa);
        // tbody.appendChild(linha);
    //#endregion

    for (const [key, value] of Object.entries(dados)){
        if(key != "data"){
            var caixa = document.createElement("td");
            caixa.innerHTML = value;
            linha.appendChild(caixa);
        }
        else if (dados.data != null){
            var caixa = document.createElement("td");
            for (const [key, value] of Object.entries(dados.data)){
            caixa.innerHTML += key + ":" + value + "</br>";
            }
            linha.appendChild(caixa);
        }
    }
    linha.appendChild(caixa);
    tbody.appendChild(linha);
}

window.onload = main