import { useListaParticipantes } from "../state/hooks/useListaParticipantes";

const Sorteio = () => {
  const participantes = useListaParticipantes();

  return (
    <section>
      <form>
        <select name="participante" id="participante">
          {participantes.map(participante => 
            <option key={participante}>{participante}</option>
          )}
        </select>
      </form>
    </section>
  )
}

export default Sorteio;