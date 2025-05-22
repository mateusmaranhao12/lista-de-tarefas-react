// Importa o hook do contexto global para acessar funções compartilhadas
import { useGlobalContext } from '../../context/GlobalContext';

// Importa o tipo da tarefa para garantir tipagem forte
import type { TaskType } from '../../types/TaskType';

// Importa o arquivo de estilos CSS específico para este componente
import './Task.css'

// Define as propriedades (props) que o componente Task aceita
interface ITaskProps {
    task: TaskType;  // Objeto representando uma tarefa (id, title e done)
}

// Componente funcional Task
export default function Task({ task }: ITaskProps) {
    // Extrai a função do contexto global para alternar o status da tarefa
    const { handleTaskToggle } = useGlobalContext()

    // Desestruturação das propriedades da tarefa recebida como prop
    const { done, title, id } = task

    return (
        // Cada tarefa é renderizada como um item de lista (<li>)
        // A classe CSS depende se a tarefa está marcada como concluída
        <li className={`task-item ${done ? 'task-item__done' : ''}`}>
            {/* Checkbox que representa se a tarefa foi concluída */}
            <input
                type='checkbox'
                checked={done}  // Define o status conforme o campo `done`
                onChange={() => handleTaskToggle(id)}  // Alterna o status ao interagir
            />

            {/* Exibe o título da tarefa ao lado do checkbox */}
            {title}
        </li>
    )
}
