// Importação dos estilos CSS
import './App.css';

// Importação dos componentes utilizados na aplicação
import Empty from './components/Empty/Empty';
import Filters from './components/Filters/Filters';
import Task from './components/Task/Task';

// Importação do provider e do hook do contexto global
import GLobalContextProvider, { useGlobalContext } from './context/GlobalContext';

// Componente principal que envolve a aplicação no provider do contexto global
export default function AppPage() {
  return (
    <GLobalContextProvider>
      {/* O componente App é envolvido pelo contexto global */}
      <App />
    </GLobalContextProvider>
  )
}

// Componente App que representa a interface principal
function App() {
  // Utilização do contexto global, desestruturando os dados e funções necessárias
  const {
    filteredTasks,   // Função que retorna as tarefas filtradas conforme o filtro atual
    handleKeyDown,   // Função que lida com a tecla pressionada no input (provavelmente adiciona tarefa ao pressionar Enter)
    handleSetInput,  // Função que atualiza o estado da entrada de texto
    input            // Valor atual do input de criação de tarefa
  } = useGlobalContext()

  return (
    <div className='container-app'>
      {/* Cabeçalho da aplicação */}
      <div className='container-app__header'>
        {/* Máscara decorativa para o cabeçalho */}
        <div className='container-app__mask' />
        <h1>TAREFAS</h1>

        {/* Campo de input para criar nova tarefa */}
        <input
          type='text'
          placeholder='Criar nova tarefa'
          value={input}  // O valor atual do input
          onChange={(event) => handleSetInput(event.target.value)}  // Atualiza o input conforme o usuário digita
          onKeyDown={handleKeyDown}  // Aciona a função ao pressionar alguma tecla (provavelmente Enter)
        />
      </div>

      {/* Lista de tarefas */}
      <ul className='content-tasks'>
        <div>
          {/* Mapeia e exibe cada tarefa filtrada como um componente Task */}
          {filteredTasks().map((t) => (
            <Task task={t} />
          ))}

          {/* Componente que aparece quando não há tarefas */}
          <Empty
            title="Nenhuma tarefa cadastrada"
            show={!filteredTasks().length}  // Mostra o componente Empty se não houver tarefas
          />
        </div>

        {/* Componente de filtros, para alterar a visualização das tarefas (Ex: Todas, Ativas, Concluídas) */}
        <Filters />
      </ul>
    </div>
  )
}
