// Importação das funções e hooks necessários do React
import { createContext, useContext, useState } from "react";

// Importação dos tipos para tipagem forte (TypeScript)
import type { IGlobalContext, IGlobalContextProps } from "./types";
import type { FilterType } from "../types/FilterType";
import { useLocalStorage } from "usehooks-ts";  // Hook para armazenar tarefas no localStorage
import type { TaskType } from "../types/TaskType";
import { v4 as uuidv4 } from "uuid"  // Geração de ID único para cada tarefa

// Criação do contexto global com tipagem forte
const GlobalContext = createContext({} as IGlobalContext)

// Componente Provider que encapsula toda a aplicação e fornece o contexto
export default function GLobalContextProvider({
    children,  // Elementos filhos que terão acesso ao contexto
}: IGlobalContextProps) {

    // Estado que armazena o valor do input para criar novas tarefas
    const [input, setInput] = useState('')

    // Estado que armazena o filtro atual: "all" | "done" | "pending"
    const [filter, setFilter] = useState<FilterType>("all")

    // Hook que armazena a lista de tarefas no localStorage para persistência de dados
    const [tasks, setTasks] = useLocalStorage<TaskType[]>('tasks-list', [])

    // Função para atualizar o estado do input
    function handleSetInput(value: string) {
        setInput(value)
    }

    // Função para atualizar o estado do filtro
    function handleSetFilter(newFilter: FilterType) {
        setFilter(newFilter)
    }

    // Função para atualizar a lista de tarefas
    function handleSetTasks(newTasks: TaskType[]) {
        setTasks(newTasks)
    }

    // Função que lida com o evento de pressionar uma tecla no input
    // Se for "Enter" e o input não estiver vazio, cria uma nova tarefa
    function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (input.length && event.key === 'Enter') {
            setTasks([
                ...tasks,
                {
                    id: uuidv4(),  // Gera um ID único para a nova tarefa
                    done: false,   // Nova tarefa inicia como não concluída
                    title: input  // O título é o conteúdo digitado no input
                }
            ])
            setInput('')  // Limpa o input após adicionar
        }
    }

    // Função que alterna o status (feito/não feito) de uma tarefa pelo ID
    function handleTaskToggle(id: string) {
        setTasks((prevState) =>
            prevState.map((task) =>
                task.id === id
                    ? { ...task, done: !task.done }  // Inverte o status
                    : task
            )
        )
    }

    // Função que desmarca todas as tarefas que foram concluídas
    function handleUncheckAllCompletedtasks() {
        const filteredTasks = tasks.map((task) =>
            task.done
                ? { ...task, done: false }  // Se estiver feita, marca como não feita
                : task
        )

        handleSetTasks(filteredTasks)
    }

    // Função que retorna as tarefas filtradas conforme o filtro selecionado
    function filteredTasks() {
        switch (filter) {
            case 'all':
                return tasks  // Todas as tarefas
            case 'done':
                return tasks.filter((task) => task.done)  // Apenas as concluídas
            case 'pending':
                return tasks.filter((task) => !task.done)  // Apenas as pendentes
            default:
                return tasks
        }
    }

    // Retorna o Provider, disponibilizando o contexto para os componentes filhos
    return (
        <GlobalContext.Provider
            value={{
                filter,  // Filtro atual
                tasks,   // Lista de tarefas
                handleSetFilter,  // Função para definir o filtro
                handleSetTasks,   // Função para definir tarefas
                handleKeyDown,    // Função para lidar com a tecla pressionada
                filteredTasks,    // Função para obter tarefas filtradas
                handleTaskToggle, // Função para alternar o status de uma tarefa
                handleSetInput,   // Função para definir o input
                input,            // Valor atual do input
                handleUncheckAllCompletedtasks  // Função para desmarcar todas concluídas
            }}
        >
            {children}  {/* Renderiza os componentes filhos */}
        </GlobalContext.Provider>
    )
}

// Hook personalizado para acessar o contexto global com facilidade
export function useGlobalContext() {
    return useContext(GlobalContext);
}
