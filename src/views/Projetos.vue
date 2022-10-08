<template>
  <section class="projetos">
      <h1>Projetos</h1>
      <router-link to="/projetos/novo" class="button">
        <span class="icon is-small">
          <i class="fas fa-plus"></i>
        </span>
        <span>Novo projeto</span>
      </router-link>
      <table class="table is-fullwidth">
        <thead>
            <tr>
                <th>ID</th>
                <th>Nome</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="projeto in projetos" :key="projeto.id">
                <td>{{ projeto.id }}</td>
                <td>{{projeto.nome}}</td>
            </tr>
        </tbody>
      </table>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from '@/store';

export default defineComponent({
  name: 'Projetos',
  setup () {
    const store = useStore()
    return {
      projetos: computed(() => store.state.projetos)
    }
  }
})
</script>

<style scoped>
    .projetos {
        padding: 1.25rem;
    }
</style>