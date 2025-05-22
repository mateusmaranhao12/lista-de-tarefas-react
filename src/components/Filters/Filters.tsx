// Importa o hook do contexto global para acessar estado e funções compartilhadas
import { useGlobalContext } from '../../context/GlobalContext'

// Importa o arquivo de estilos CSS específico para este componente
import './Filters.css'

// Componente funcional Filters
export default function Filters() {
    // Extrai do contexto global:
    const {
        tasks,                         // Lista completa de tarefas
        handleUncheckAllCompletedtasks, // Função para desmarcar todas as tarefas concluídas
        handleSetFilter                 // Função para alterar o filtro atual de visualização
    } = useGlobalContext()

    // Calcula a quantidade de tarefas pendentes (não concluídas)
    const pendingTasksQtd = tasks.filter((task) => !task.done).length

    return (
        // Renderiza as ações relacionadas ao filtro e manipulação de tarefas
        <li className='content-tasks__actions'>
            {/* Exibe quantidade de itens pendentes */}
            <div>
                <a href='#'>
                    {pendingTasksQtd} Itens restantes
                </a>
            </div>

            {/* Links para filtrar as tarefas: todas, ativas (pendentes) e completadas */}
            <div>
                <a href='#' onClick={() => handleSetFilter("all")}>Todas</a>
                <a href='#' onClick={() => handleSetFilter("pending")}>Ativas</a>
                <a href='#' onClick={() => handleSetFilter("done")}>Completadas</a>
            </div>

            {/* Ação para limpar (desmarcar) todas as tarefas que estão como concluídas */}
            <div>
                <a href='#' onClick={handleUncheckAllCompletedtasks}>
                    Limpar completadas
                </a>
            </div>
        </li>
    )
}
