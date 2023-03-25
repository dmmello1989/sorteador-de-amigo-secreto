import React, { useRef, useState } from "react";
import { useAdicionarParticipante } from "../state/hooks/useAdicionarParticipante";
import { useMensagemErro } from "../state/hooks/useMensagemErro";
import "./Formulario.css";

const Formulario = () => {
  const [nome, setNome] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const mensagemErro = useMensagemErro();
  const adicionarNaLista = useAdicionarParticipante();

  const adicionarParticipante = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    adicionarNaLista(nome);
    setNome("");
    inputRef.current?.focus();
  }

  return(
    <form onSubmit={e => adicionarParticipante(e)}>
      <div className="grupo-input-btn">
        <input 
          type="text"
          value={nome}
          ref={inputRef}
          onChange={e => setNome(e.target.value)}
          placeholder="Insira os nomes dos participantes"
        />
        <button disabled={!nome}>Adicionar</button>
      </div>
      {mensagemErro ? <p role="alert" className="alerta erro">{mensagemErro}</p> : null}
    </form>
  )
};

export default Formulario;