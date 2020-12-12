const roteador = require('express').Router() 
const TabelaFornecedor = require('./TabelaFornecedor')
const Fornecedor = require('./Fornecedor')

roteador.get('/', async (req, res) => {

    const resultados = await TabelaFornecedor.listar()
    res.send(
        JSON.stringify(resultados)
    )
})

roteador.post('/', async (requisicao, resposta) => {
    const dadosRecebidos = requisicao.body
    const fornecedor = new Fornecedor(dadosRecebidos)
    await fornecedor.criar()
    resposta.send(
        JSON.stringify(fornecedor)
    )
})

roteador.get('/:idFornecedor', async (requisicao, resposta) => {
    
    try {        
        const id = requisicao.params.idFornecedor
        const fornecedor = new Fornecedor({ id: id })
        await fornecedor.carregar()
        resposta.send(
            JSON.stringify(fornecedor)
        )
    } catch(erro) {
        resposta.send(
            JSON.stringify({
                mensagem: erro.message
            })
        )
    }
})


try {
        roteador.put('/:idFornecedor', async (requisicao, resposta) => {
            const id = requisicao.params.idFornecedor
            const dadosRecebidos = requisicao.body
            const dados = Object.assign({}, dadosRecebidos, { id: id })
            const fornecedor = new Fornecedor(dados)
            await fornecedor.atualizar()
            resposta.end()
     })
    } catch (erro) {
        resposta.send(
            stringify({
                mensagem: erro.mesage
            })
        )
    }

module.exports = roteador