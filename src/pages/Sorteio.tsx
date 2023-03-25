import { useState } from "react";
import Card from "../components/Card";
import { useListaParticipantes } from "../state/hooks/useListaParticipantes";
import { useResultadoSorteio } from "../state/hooks/useResultadoSorteio";
import "./Sorteio.css";

const Sorteio = () => {
  const [participante, setParticipante] = useState("");
  const [amigoSecreto, setAmigoSecreto] = useState("");
  const participantes = useListaParticipantes();
  const resultado = useResultadoSorteio();

  const sortear = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const getResultado = resultado.get(participante);

    if(resultado.has(participante)) {
      setAmigoSecreto(getResultado!);
    }
  }

  return (
    <Card>
      <section className="sorteio">
        <h2>Quem vai tirar o papelzinho?</h2>
        <form onSubmit={sortear}>
          <select 
            required 
            id="participante"
            name="participante"
            value={participante}
            placeholder="Selecione o seu nome"
            onChange={event => setParticipante(event.target.value)}
          >
            {participantes.map(participante => 
              <option key={participante}>{participante}</option>
            )}
          </select>

          <p>Clique em "Sortear" para ver quem é seu amigo secreto!</p>
          <button className="botao-sortear">Sortear</button>
        </form>

        {amigoSecreto ? <p className="resultado" role="alert">{amigoSecreto}</p> : null}

        <footer className="sorteio">
          <img src="/imagens/aviao.png" className="aviao" alt="Um desenho de avião de papel" />
        </footer>
      </section>
    </Card>
  );
};

export default Sorteio;