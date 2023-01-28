async function buscaEnd(cep){
    const errMsg = document.querySelector("#erro")
    errMsg.innerHTML = ""
    try{
        var consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json`);
        var consultaJSON = await consultaCEP.json()
        if(consultaJSON.erro){
            throw Error("CEP não existe")
        }
        var cidade = document.querySelector("#cidade")
        var rua = document.querySelector("#endereco")
        var estado = document.querySelector("#estado ")

        cidade.value = consultaJSON.localidade
        rua.value = consultaJSON.logradouro
        estado.value = consultaJSON.uf

        return consultaJSON
    } catch (erro){
        errMsg.innerHTML = `<p> CEP Inválido, tente novamente!</p>`
    }
}   

/*
let ceps = ['01001000', '01001001'];
let conjuntoCeps = ceps.map(valores => buscaEnd(valores))

Promise.all(conjuntoCeps).then(resp => console.log(resp))
*/


const cep = document.querySelector("#cep")
cep.addEventListener('focusout', () => buscaEnd(cep.value))