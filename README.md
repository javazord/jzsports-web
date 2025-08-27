# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

frontend/
│── public/ # Arquivos públicos (favicon, index.html, imagens estáticas)
│
│── src/
│ │── api/ # Integração com o backend (services, chamadas HTTP)
│ │ └── championshipApi.js
│ │ └── teamApi.js
│ │ └── playerApi.js
│
│ │── assets/ # Imagens, ícones, fontes, estilos globais
│ │ └── images/
│ │ └── icons/
│ │ └── styles/ (CSS global ou Tailwind config)
│
│ │── components/ # Componentes reutilizáveis (botões, tabelas, formulários, modal)
│ │ └── ui/
│ │ └── Button.jsx
│ │ └── Input.jsx
│ │ └── Table.jsx
│ │ └── Modal.jsx
│
│ │── features/ # Cada funcionalidade do sistema isolada
│ │ └── championships/ # Gestão de campeonatos
│ │ ├── components/ # Componentes específicos (Tabela de jogos, chaveamento, etc.)
│ │ ├── pages/ # Páginas (Lista, Detalhe, Criar)
│ │ └── hooks/ # Hooks customizados (useChampionships, etc.)
│ │
│ │ └── teams/ # Gestão de times
│ │ ├── components/
│ │ ├── pages/
│ │ └── hooks/
│ │
│ │ └── players/ # Gestão de jogadores
│ │ ├── components/
│ │ ├── pages/
│ │ └── hooks/
│
│ │── hooks/ # Hooks globais (ex: useAuth, useFetch)
│
│ │── layouts/ # Layouts principais (Admin, Público, Dashboard)
│ │ └── DashboardLayout.jsx
│ │ └── AuthLayout.jsx
│
│ │── routes/ # Definição de rotas do sistema
│ │ └── AppRoutes.jsx
│
│ │── store/ # Gerenciamento de estado (Redux, Zustand, Context API, etc.)
│ │ └── championshipSlice.js
│ │ └── teamSlice.js
│ │ └── playerSlice.js
│
│ │── utils/ # Funções utilitárias (formatar datas, validações, helpers)
│ │ └── dateUtils.js
│ │ └── validation.js
│
│ │── App.jsx # Componente raiz
│ │── main.jsx # Ponto de entrada (ReactDOM.createRoot / Angular bootstrap)
│
│── package.json
│── vite.config.js / webpack.config.js
