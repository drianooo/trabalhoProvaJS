function main(){

    document.querySelector("#src").addEventListener("click", evt =>{
        let id = document.querySelector("#id").value;
        if (id != ""){
            fetch("https://api.restful-api.dev/objects/" + id)
            .then(res => res.json())
            .then(data => montarDados(data))
        }
    })

    document.querySelector("#add").addEventListener("click", evt =>{
        let nome = document.querySelector("#nome").value;
        let dados = document.querySelector("#dados").value;

        dados = dados.split(",");
        let jsonDados={};
        for (let i=0; i < dados.length; i++){
            jsonDados["dados"+ (i+1)] = dados[i];
        }
        console.log(jsonDados);

        if (nome != "" && dados != ""){
            fetch("https://api.restful-api.dev/objects",
                {
                    method:"POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "name": nome,
                        "data": jsonDados
                     }
                    )
                }
            )
            .then(res => {return res.json()})
            .then(res => {
                let p = document.createElement("p")
                p.innerHTML = "ID do objeto adicionado: " +res.id;
                document.body.appendChild(p);
            })
        }
        else {
            let p = document.createElement("p")
            p.innerHTML = "Nome e dados não podem ser vazios";
            document.body.appendChild(p);
        }
    })

    document.querySelector("#del").addEventListener("click", evt => {
        let id = document.querySelector("#id").value;
        if (id != null){
            fetch("https://api.restful-api.dev/objects/"+id,{
                method: "DELETE"
            })
                .then(res => {return res.json()})
                .then(res => {
                    if("error" in res){
                        let p = document.createElement("p");
                        p.innerHTML = "Não existe objeto com ID " + id + " para deletar";
                        document.body.appendChild(p);
                    }
                    else{
                        let p = document.createElement("p");
                        p.innerHTML = "Deletado objeto com ID " + id;
                        document.body.appendChild(p);
                    }
                    console.log(res);
                })
        }
    })

    document.querySelector("#upd").addEventListener("click", evt => {
        let id = document.querySelector("#id").value;
        let nome = document.querySelector("#nome").value;
        let dados = document.querySelector("#dados").value;
        if (id && nome && dados){
            dados = dados.split(",");
            let jsonDados={};
            for (let i=0; i < dados.length; i++){
                jsonDados["dados"+ (i+1)] = dados[i];
            }
            fetch("https://api.restful-api.dev/objects/"+id,{
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "name": nome,
                    "data": jsonDados
                 }
                )
            })
            .then(res => {
                if(res.ok){
                    let p = document.createElement("p");
                    p.innerHTML = "Objeto de ID " + id + " atualizado com sucesso";
                    document.body.appendChild(p);
                }
                else{
                    let p = document.createElement("p");
                    p.innerHTML = "Não existe objeto com o ID " + id + " para atualizar";
                    document.body.appendChild(p);
                }
            })
        }
        else{
            let p = document.createElement("p")
            p.innerHTML = "ID, nome e dados não podem ser vazios";
            document.body.appendChild(p);
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
    tbody.appendChild(linha);
}

window.onload = main