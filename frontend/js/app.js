const BASE_URL = "http://localhost:3333/api";

const formCadastro = document.getElementById("item-form");

//Funções utilitárias
const resetForm = () => {
  document.getElementById("name").value = "";
  document.getElementById("description").value = "";
};

const showMessage = (text, cor) => {
  const message = document.getElementById('message')
  message.textContent = text
  message.style.color = cor
}
/**Inicio do cadastro do item */
const handleFormSubmit = async (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;

  const item = {
    name: name,
    description: description
  }

  await sendItem(item);

};
const sendItem = async (objItem) => {
  try {
    const res = await fetch(`${BASE_URL}/items`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(objItem) //Transformar um obj JS em obj JSON
    })

    if (!res.ok) {
      const error = await res.json().catch(() => ({
        message: "Erro desconhecido"
      }))

      console.log(error)

      if (error.message && Array.isArray(error.message)) {
        const erroContainer = document.getElementById('message')
        erroContainer.innerHTML = ''

        error.message.forEach((err) => {
          console.log(err)
          const errorMensage = document.createElement('p')
          errorMensage.textContent = `${err.field}: ${err.error} `
          errorMensage.style.color = 'red'
          erroContainer.appendChild(errorMensage)
        })
      } else {
        showMessage(`Erro: ${error.message || `Erro inesperado`}`, 'red')
      }
      return
    }
    showMessage('item cadastrado com sucesso', 'green')
    resetForm();

  } catch (error) {
    console.log('Error ao atualizar')
  }
}
/**Fim do cadastro do item */


/**Inicio de mostar items */
const listarItems = async () => {
  try {
    //buscar api
    const res = await fetch(`${BASE_URL}/items`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',

      },

    });

    if (!res.ok) {
      console.log('Error ao buscar items')
      return
    }
    const items = await res.json()
    console.log(items);
    showItens(items) //recebe o array de items
  } catch (error) {
    console.log(error);
  }
}
//mostrar itens
const showItens = async (arrayItems) => {
  console.log(arrayItems)
  const itemList = document.getElementById(`item-list`)
  itemList.innerHTML = ''

  const card = arrayItems.map((item) => `
      <article class="item-card">
                      <header class="item-card__header">
                          <h1 class="item-card__title">${item.name}</h1>
                      </header>
  
                      <section class="item-card__body">
                          <p class="item-card__description">
                              Essa é a descrição da atividade
                              ${item.description}
                          </p>
                      </section>
  
                      <footer class="item-card__footer">
                          <button onclick="editItem(${item.id})" class="item-card__button item-card__button--edit">
                              Editar
                          </button>
                          <button onclick="deletItem(${item.id})" class="item-card__button item-card__button--delete">
                              Excluir
                          </button>
                      </footer>
                  </article>
      `).join()
  itemList.innerHTML = card
}
//Delet
const deletItem = async (objId) => {
  try {
    const res = await fetch(`${BASE_URL}/items/${objId}`, {
      method: "DELETE"
    })

    if (!res.ok) {
      console.log("Error ao deletar")
      return
    }

  } catch (error) {
    console.log(error)
  }
}

//editar
const editItem = async (objId) => {
  const url = `pages/item.html?id=${objId}`
  window.location = url
}


//Eventos de interação
formCadastro.addEventListener('submit', handleFormSubmit)
document.addEventListener("DOMContentLoaded", listarItems)