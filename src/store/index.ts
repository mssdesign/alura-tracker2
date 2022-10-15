import { INotificacao } from '@/interfaces/INotificacao'
import { InjectionKey } from 'vue'
import http from "@/http"
import { createStore, Store, useStore as vuexUseStore } from 'vuex'
import { ALTERAR_TAREFA, CADASTRAR_TAREFAS, OBTER_TAREFAS} from './tipo-acoes'
import {
  ADICIONA_TAREFA,
  ALTERA_TAREFA,
  DEFINIR_TAREFAS,
  NOTIFICAR,
} from './tipo-mutacoes'
import ITarefa from '@/interfaces/ITarefa'
import { EstadoProjeto, projeto } from "./modulos/projeto"

//O "export" abaixo foi adicionado depois para possibilitar a cração do módulo
export interface Estado {
  projeto: EstadoProjeto,
  tarefas: ITarefa[],
  notificacoes: INotificacao[]
}

export const key: InjectionKey<Store<Estado>> = Symbol() //Configurando chave de acesso ao store

export const store = createStore<Estado>({
  state: {
    tarefas: [],
    projeto: {
      projetos: []
    },
    notificacoes: [],
  },
  mutations: {
    
    [DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
      state.tarefas = tarefas
    },  
    [ADICIONA_TAREFA](state, tarefa: ITarefa) {
      state.tarefas.push(tarefa)
    },  
    [ALTERA_TAREFA](state, tarefa: ITarefa) {
      const index = state.tarefas.findIndex((t) => t.id == tarefa.id)
      state.tarefas[index] = tarefa
    },
    [NOTIFICAR] (state, novaNotificacao: INotificacao) {
        novaNotificacao.id = new Date().getTime()
        state.notificacoes.push(novaNotificacao)

        setTimeout(() => {
          state.notificacoes = state.notificacoes.filter(notificacao => notificacao.id != novaNotificacao.id)
        }, 3000);
    }
  },
  actions: {
    
    [OBTER_TAREFAS] ({ commit }) {
      http.get('tarefas')
          .then(response => commit(DEFINIR_TAREFAS, response.data))
    },
    [CADASTRAR_TAREFAS] ({ commit }, tarefa: ITarefa) {
      return http.post('/tarefas', tarefa)
        .then(resposta => commit(ADICIONA_TAREFA, resposta.data))
    },
    [ALTERAR_TAREFA] ({ commit }, tarefa: ITarefa) {
      return http.put(`/tarefas/${tarefa.id}`, tarefa)
        .then(() => commit(ALTERA_TAREFA, tarefa))
    },
  },
  //Definindo módulo aqui 
  modules: {
    projeto
  }
})

//Exportando um useStore personalizado
export function useStore(): Store<Estado> {
  return vuexUseStore(key)
}
