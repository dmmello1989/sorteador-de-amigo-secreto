import { render, screen } from "@testing-library/react";
import React from "react";
import { RecoilRoot } from "recoil";
import { useListaParticipantes } from "../state/hooks/useListaParticipantes";
import ListaParticipantes from "./ListaParticipantes";

jest.mock('../state/hooks/useListaParticipantes', () => {
  return {
    useListaParticipantes: jest.fn()
  }
})


describe('Uma lista vazia de participantes', () => {
  beforeEach(() => {
    (useListaParticipantes as jest.Mock).mockReturnValue([]);
  })
  
  test('deve ser renderizada sem elementos', () => {
    render(
      <RecoilRoot>
        <ListaParticipantes />
      </RecoilRoot>
    );
  
    const items = screen.queryAllByRole('listitem');
  
    expect(items).toHaveLength(0);
  });
});

describe('Uma lista preenchida de participantes', () => {
  const participantes = ['Ana', 'Caratina'];

  beforeEach(() => {
    (useListaParticipantes as jest.Mock).mockReturnValue(participantes);
  })

  test('deve ser renderizada com elementos', () => {
    render(
      <RecoilRoot>
        <ListaParticipantes />
      </RecoilRoot>
    );
  
    const items = screen.queryAllByRole('listitem');
  
    expect(items).toHaveLength(participantes.length);
  });
});