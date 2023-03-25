import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { RecoilRoot } from "recoil";
import { useListaParticipantes } from "../state/hooks/useListaParticipantes";
import Rodape from "./Rodape";

jest.mock('../state/hooks/useListaParticipantes', () => {
  return {
    useListaParticipantes: jest.fn()
  }
});

const mockNavegacao = jest.fn();
jest.mock('react-router-dom', () => {
  return {
    useNavigate: () => mockNavegacao
  }
});

describe('Quando não existem participantes suficientes', () => {
  beforeEach(() => {
    (useListaParticipantes as jest.Mock).mockReturnValue([])
  });

  test('a brincadeira não pode ser iniciada', () => {
    render(
      <RecoilRoot>
        <Rodape />
      </RecoilRoot>
    );

    const button = screen.getByRole('button');

    expect(button).toBeDisabled();
  });
});


describe('Quando existem participantes suficientes', () => {
  beforeEach(() => {
    (useListaParticipantes as jest.Mock).mockReturnValue(['Ana', 'Maria', 'Giovanna'])
  });

  test('a brincadeira pode ser iniciada', () => {
    render(
      <RecoilRoot>
        <Rodape />
      </RecoilRoot>
    );

    const button = screen.getByRole('button');

    expect(button).not.toBeDisabled();
  });

  test('a brincadeira foir iniciada', () => {
    render(
      <RecoilRoot>
        <Rodape />
      </RecoilRoot>
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(mockNavegacao).toHaveBeenCalledTimes(1);
    expect(mockNavegacao).toHaveBeenCalledWith('/sorteio');
  })
});