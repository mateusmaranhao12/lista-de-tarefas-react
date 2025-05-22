// Importação da imagem que será exibida quando não houver dados
import EmptyImage from '../../assets/empty.png'

// Importação do arquivo de estilos CSS específico para este componente
import './Empty.css'

// Definição das props (propriedades) que o componente Empty aceita
interface IEmptyProps {
    show: boolean   // Define se o componente será exibido ou não
    title?: string  // Mensagem opcional a ser exibida; caso não seja passada, terá um valor padrão
}

// Componente funcional Empty
export default function Empty({
    title = "Nenhum dado encontrado!",  // Valor padrão para o título, caso não seja fornecido
    show  // Define a visibilidade do componente
}: IEmptyProps) {
    return (
        <>
            {show && (  // Renderiza o conteúdo somente se `show` for true
                <div className='container-empty'>
                    {/* Exibe a imagem de "vazio" */}
                    <img src={EmptyImage} alt='empty' />

                    {/* Exibe a mensagem (padrão ou personalizada) */}
                    <h3>{title}</h3>
                </div>
            )}
        </>
    )
}
