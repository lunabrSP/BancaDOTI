var templateUser = `<div class="row">
                        <div class="col-md-12">
                           <h3>**NOME** / **VOLUME**</h3>
                           <hr>
                        </div>
                    </div>`;

function logout(){
    localStorage.removeItem("userDash");
    window.location="index.html";
}

function carregaVolume(){
    var parametro = window.location.search;
    console.log("URL = "+parametro);
                    
    var numParceiro = parametro.substr(4);
                    
    //alert("Numero do Parceiro = "+numParceiro);
    console.log("Numero do Parceiro = "+numParceiro);
                    
    // a partir daqui posso fazer um fetch no endpoint de departamento e
    // preencher um conjunto de linhas com todos os usuários daquele depto
    fetch("http://localhost:8080/agentesfinanceiros/"+numParceiro+"/dashboard")
        .then(res => res.json())
        .then(res => preenche(res))
}
function preenche(res){
	
	var userLogado = localStorage.getItem("userDash");
   
    if (!userLogado){
        // se não tiver, redireciona pra o INDEX  (ou seja, não tá logado)
        window.location="index.html";
    }

	console.log(res);    


    document.getElementById("conteudo").innerHTML = res.nome;
    document.getElementById("sucesso").innerHTML = res.statusOk;
    document.getElementById("falha").innerHTML = res.statusFalha;
	document.getElementById("fraude").innerHTML = res.statusFraude;
	document.getElementById("total").innerHTML = res.statusFraude+res.statusOk+res.statusFalha;

    desenharPizza(res);

    barraUsuario();

    carregaParceirosSmall();
}


function desenharPizza(res) {
    var data = google.visualization.arrayToDataTable([
      ['Status', 'Quantidade'],
      ['Sucesso',     res.statusOk],
      ['Falha',      res.statusFalha],
      ['Fraude',  res.statusFraude],
    ]);

    var options = {
      is3D: true,
      colors: ['#28A745', '#FFC107', '#DC3545']
    };

    var chart = new google.visualization.PieChart(document.getElementById('graficoPizza'));
    chart.draw(data, options);
  }

  function barraUsuario(){

    var tptBarraUser = `<img src="**FOTO**" width="70px"> 
    **NOME** (**RACF**)`;
    
    var userLogado2 = localStorage.getItem("userDash");

    var user = JSON.parse(userLogado2);


    document.getElementById("barraUser").innerHTML = tptBarraUser
                                        .replace("**FOTO**",user.linkFoto)
                                        .replace("**NOME**", user.nome)
                                        .replace("**RACF**", user.racf.toUpperCase());   
}

function carregaParceirosSmall(){
    fetch("http://localhost:8080/nomeagentes")
        .then(res => res.json())
        .then(res => preencheSmall(res)); 
}

function preencheSmall(resJson){
    var contAgente ="";

    var tptDDLBegin = `<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">`
    var tptDDLEnd = `</div>`
    var templateAgente = `<a class="dropdown-item" href="dashboard.html?id=**IDAGENTE**">**NOMEAGENTE**</a>`

    for(i=0; i<resJson.length; i++){       
        var agente = resJson[i];
        contAgente = contAgente + templateAgente.replace("**IDAGENTE**",agente.id_agente)
                                                .replace("**NOMEAGENTE**", agente.nome_agente);
    }
    document.getElementById("conteudoSmall").innerHTML = tptDDLBegin + contAgente + tptDDLEnd;

    carregaTopTen();
}