//1º url p editar
const BASE_URL = 'http://localhost:3333/api';

//2º função para pegar id da url
const pegarParametroDaUrl = (name) => {
    const urlParams = new URLSearchParams(window.location.search)
    return urlParams.get(name)
}

const itemId = (pegarParametroDaUrl('id'))

//3º funcao para listar o item especifico
const buscarItem = async (id) => {
    try {
        const res = await fetch(`${BASE_URL}/items/${id}`,{
            method:'get',
            headers:{
                "Content-type": "application/json"
            }
        })
        if(!res.ok){
            console.log('Erro ao buscar item')
            return
        }
        const item = await res.json();
        mostrarItem(item)
    } catch (error) {
        console.log(error);
    }
};


//4º função para mostrar o item no formulário
const mostrarItem = (objItem) => {
    console.log(objItem)
    const formContainer = document.getElementById('form-container')
    
    formContainer.innerHTML = `
     <h2 class="form-container__title">Editar Atividades</h2>
          <form id="item-form" action="#" method="post">
            <input
              type="text"
              name="name"
              id="name"
              class="item-form__input"
              placeholder="Digite a atividade"
              value="${objItem.name}"
            />
            <textarea
              id="description"
              class="item-form__textarea"
              placeholder="Descreva sua atividade"
            >${objItem.description}</textarea>

            <button type="submit" class="item-form__button">Atualizar</button>
          </form>
          <div id="message" class="message">Mensagem de retorno</div>
    `
    const form = document.getElementById('item-form')
    form.addEventListener('submit', (event)=>{
        event.preventDefault()
        atualizarItem(objItem.id)
    });

}

//5º atualizar o item
const atualizarItem = async(id) =>{
    console.log(id);
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;

    try {
        const res = await fetch(`${BASE_URL}/items/${id}`,{
            method: 'PUT',
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({name, description})
        })

        if(!res.ok){
            console.log('Erro ao excluir')
            return
        }
    } catch (error) {
        console.log('Erro ao atualizar')
    }
};
 

//6º evento parta quando abrir a página buscar o item selecionado
document.addEventListener('DOMContentLoaded', ()=>{
    if(itemId){
        //mostrar os itens
        buscarItem(itemId)
    }else{
        console.log('id da atividade não encontrado')
    }
})