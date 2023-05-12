class Despesas {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano        = ano
        this.mes        = mes
        this.dia        = dia
        this.tipo       = tipo
        this.descricao  = descricao
        this.valor      = valor
    }

    validarDados() {
        //percorre o valor do objeto que esta sendo criando no caso o this acessa esse objeto
        //posição i no objeto this
        for(let i in this) {
            if( (this[i] == undefined) || (this[i] == '') || (this[i] == null) ) {
                return false
            }
        }
        return true
    }
}

class Bd {

    constructor() {
        //ao instanciar o bd o contructor verifica se tem algum ultimo id salvo se for vazio set o valor como 0
        let id = localStorage.getItem('id')

        if(id === null) {
            localStorage.setItem('id', 0)
        }
    }

    getPproximoID() {
        //proximo id recebe o ultimo id salvo no storage
        let proximoID = localStorage.getItem('id')
        //return o id salvo +1
        return parseInt(proximoID) + 1

    }

    gravar(d) {
        //id recebe o retorno da consulta ao storage do ultimo id salvo
        let id = this.getPproximoID()
        //setando no storage o novo id e o json de despesas
        localStorage.setItem( id, JSON.stringify(d) )

        localStorage.setItem('id', id)
    }

    recuperarTodosRegistros() {

        //array de despesas
        let despesas = Array()


        let id = localStorage.getItem('id')
        //recuperar todas as despesas cadastrada em localStorage
        for(let i = 1; i <= id; i++) {

            //recuperar a despesa
            let despesa = JSON.parse( localStorage.getItem(i) )

            //existe a possibilidade de haver indices que foram pulados/removidos
            //nestes casos nós vamos pular esses indices

            if(despesa === null) {
                continue
            }

            despesas.push(despesa)
        }

        return despesas
    }

    pesquisar(despesa) {
        console.log(despesa)
    }
}
let bd = new Bd()

function cadastrarDespesa() {

    let ano         = document.getElementById('ano')
    let mes         = document.getElementById('mes')
    let dia         = document.getElementById('dia')
    let tipo        = document.getElementById('tipo')
    let descricao   = document.getElementById('descricao')
    let valor       = document.getElementById('valor')

    let despesa = new Despesas(
        ano.value,
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value
    )

    console.log(despesa);

    if (despesa.validarDados() ){
        bd.gravar(despesa)

        document.getElementById('modal_titulo').innerHTML = 'Registro inserido com sucesso'
        document.getElementById('modal_titulo_div').className = 'modal-header text-success'
        document.getElementById('modal_conteudo').innerHTML = 'Despesa foi cadastrada com sucesso'
        document.getElementById('moda_btn').innerHTML = 'Voltar'
        document.getElementById('moda_btn').className = 'btn btn-success'
        
        //dialog sucess
        $('#modalRegistraDespesa').modal('show')

        ano.value = ''
        mes.value = ''
        dia.value = ''
        tipo.value = ''
        descricao.value = ''
        valor.value = ''
    } else {
        document.getElementById('modal_titulo').innerHTML = 'Erro na inclusão do registro'
        document.getElementById('modal_titulo_div').className = 'modal-header text-danger'
        document.getElementById('modal_conteudo').innerHTML = 'Erro na gravação, verifique se todos os campos foram preenchidos corretamente'
        document.getElementById('moda_btn').innerHTML = 'Voltar e corrigir'
        document.getElementById('moda_btn').className = 'btn btn-danger'

        //dialog erro
        $('#modalRegistraDespesa').modal('show')

        ano.value = ''
        mes.value = ''
        dia.value = ''
        tipo.value = ''
        descricao.value = ''
        valor.value = ''
    }
}

function carregaListaDespesas() {
    let despesas = Array()

    despesas = bd.recuperarTodosRegistros()

    //selecionando o elemento Tbody da tabela
    let listaDespesas = document.getElementById('listaDespesas')

    //percorrer o array despesas, listando cada despesa de forma dinamica
    despesas.forEach( function(d) {

        console.log(d)
        // criando a linha(tr)
        let linha = listaDespesas.insertRow()

        //criar as colunas(td)
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`

        //ajustar o tipo
        switch( parseInt( d.tipo ) ) {
            case 1: d.tipo = 'Alimentação'
                break
            case 2: d.tipo = 'Educação'
                break
            case 3: d.tipo = 'Lazer'
                break
            case 4: d.tipo = 'Saúde'
                break
            case 5: d.tipo = 'Transporte'
                break
        }

        linha.insertCell(1).innerHTML = d.tipo
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor

    })

}

function pesquisarDespesa() {
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor  = document.getElementById('valor').value

    let despesa = new Despesas(ano, mes, dia, tipo, descricao, valor)

    bd.pesquisar(despesa)

}
