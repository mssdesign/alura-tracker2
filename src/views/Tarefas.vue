<template>
  <Formulario />
  <div class="lista">
    <Box v-if="listaEstaVazia">
      Você não está muito produtivo hoje :(
    </Box>
    <Tarefa
      v-for="(tarefa, index) in tarefas"
      :key="index"
      :tarefa="tarefa"
      @aoTarefaClicada="selecionarTarefa"
    />
    <div class="modal" :class="{ 'is-active': tarefaSelecionada }" v-if="tarefaSelecionada">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Editando uma tarefa</p>
          <button
            @click="fecharModal"
            class="delete"
            aria-label="close"
          ></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label for="descricaoDaTarefa" class="label">
              Descricao
            </label>
            <input
              type="text"
              class="input"
              v-model="tarefaSelecionada.descricao"
              id="nomeDoProjeto"
            />
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success">Salvar alteracoes</button>
          <button @click="fecharModal" class="button">Cancelar</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import Formulario from '../components/Formulario.vue'
import Tarefa from '../components/Tarefa.vue'
import Box from '../components/Box.vue'
import {
  CADASTRAR_TAREFAS,
  OBTER_PROJETOS,
  OBTER_TAREFAS,
} from '@/store/tipo-acoes'
import { useStore } from '@/store'
import ITarefa from '@/interfaces/ITarefa'

export default defineComponent({
  name: 'App',
  components: {
    Formulario,
    Tarefa,
    Box,
  },
  data() {
    return {
      tarefaSelecionada: null as ITarefa | null,
    }
  },
  methods: {
    salvarTarefa(tarefa: ITarefa): void {
      this.store.dispatch(CADASTRAR_TAREFAS, tarefa) //chama uma ação
    },
    selecionarTarefa(tarefa: ITarefa) {
      this.tarefaSelecionada = tarefa
    },
    fecharModal() {
      this.tarefaSelecionada = null
    },
  },
  computed: {
    listaEstaVazia(): boolean {
      return this.tarefas.length === 0
    },
  },
  setup() {
    const store = useStore()
    store.dispatch(OBTER_TAREFAS)
    store.dispatch(OBTER_PROJETOS)
    return {
      tarefas: computed(() => store.state.tarefas),
      store,
    }
  },
})
</script>
<style scoped>
.clicavel {
  cursor: pointer;
}
</style>
