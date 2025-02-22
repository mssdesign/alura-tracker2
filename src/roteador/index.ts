import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Tarefas from '../views/Tarefas.vue'
import Projetos from '../views/Projetos.vue'
import Formulario from '../views/Projetos/Formulario.vue'
import Lista from '../views/Projetos/Lista.vue'

const rotas: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Tarefas',
    component: Tarefas, //Componente a ser renderizado
  },
  {
    path: '/projetos',
    component: Projetos,
    children: [
      {
        path: '',
        name: 'Projetos',
        component: Lista,
      },
      {
        path: '/novo',
        name: 'Novo Projeto',
        component: Formulario,
      },
      {
        path: '/:id',
        name: 'Editar Projeto',
        component: Formulario,
        props: true, //Permite injetar o id como uma propriedade do componente
      },
    ],
  },
]

const roteador = createRouter({
  history: createWebHashHistory(), //Método que cria # que ajudam a controlar rotas
  routes: rotas,
})

export default roteador
