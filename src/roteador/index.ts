import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Tarefas from '../views/Tarefas.vue'
import Projetos from '../views/Projetos.vue'

const rotas: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Tarefas',
    component: Tarefas, //Componente a ser renderizado
  },
  {
    path: '/projetos',
    name: 'Projetos',
    component: Projetos
  }
]

const roteador = createRouter({
  history: createWebHashHistory(), //Método que cria # que ajudam a controlar rotas
  routes: rotas,
})

export default roteador
