import { useNavigate } from "react-router-dom";
import { useListaParticipantes } from "../state/hooks/useListaParticipantes";
import "./Rodape.css";

const Rodape = () => {
  const participantes = useListaParticipantes();
  const navegarPara = useNavigate();

  const iniciar = () => {
    navegarPara('/sorteio');
  };

  return(
    <footer className="rodape-configuracoes">
      <button 
        className="botao"
        onClick={() => iniciar()}
        disabled={participantes.length < 3}
      >
          INICIAR BRINCADEIRA
        </button>
    </footer>
  )
}

export default Rodape;