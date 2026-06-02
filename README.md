# Frontend - WhatsApp Assistant

Interface Vue 3 + Vite + TypeScript para consumo da API do WhatsApp Assistant.

## Stack
- Vue 3 + Composition API
- Vite + TypeScript
- Tailwind CSS (tema shadcn)
- Pinia (state management)
- Vue Router
- Axios
- Lucide Icons

## Setup

```bash
npm install
npm run dev
```

A aplicação roda em http://localhost:5173 e faz proxy para a API em http://localhost:8000.

## Páginas

| Rota | Descrição |
|---|---|
| `/login` | Autenticação JWT |
| `/sessions` | Lista e criação de sessões do assistente |
| `/chat/:id` | Tela de chat com WebSocket |
| `/users` | Gerenciamento de usuários |
| `/admin/metrics` | Painel de métricas do assistente |

## Integração IA
O chat está preparado para receber a integração com IA. Atualmente retorna uma resposta mock.
Quando a API de IA estiver disponível, edite `src/views/chat/ChatView.vue` na função `handleSend`.