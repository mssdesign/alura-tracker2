import { TipoNotificacao } from '@/interfaces/INotificacao'
import { store } from '@/store'
import { NOTIFICAR } from '@/store/tipo-mutacoes'

//Não está sendo utilizado (agora o notificador dentro da pasta hook é que faz a função desse componente aqui)
export const notificacaoMixin = {
  methods: {
    notificar(tipo: TipoNotificacao, titulo: string, texto: string): void {
      store.commit(NOTIFICAR, {
        titulo,
        texto,
        tipo,
      })
    },
  },
}
