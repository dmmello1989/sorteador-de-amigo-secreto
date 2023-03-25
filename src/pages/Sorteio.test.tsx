import React from "react";
import { RecoilRoot } from "recoil";
import { render, screen } from "@testing-library/react";

import Sorteio from "./Sorteio";
import { useListaParticipantes } from "../state/hooks/useListaParticipantes";

jest.mock('../state/hooks/useListaParticipantes', () => {
  return {
    useListaParticipantes: jest.fn()
  }
})

describe("na página de sorteio", () => {
  const participantes = [
    "Ana",
    "Catarina",
    "Jorel"
  ];

  beforeEach(() => {
    (useListaParticipantes as jest.Mock).mockReturnValue(participantes);
  })

  test("todos os participantes podem exibir seu amigo secreto", () => {
    render(
      <RecoilRoot>
        <Sorteio />
      </RecoilRoot>
    )

    const opcoes = screen.queryAllByRole("option");
    expect(opcoes).toHaveLength(participantes.length);
  })
})