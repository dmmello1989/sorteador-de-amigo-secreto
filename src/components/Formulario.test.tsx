import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Formulario from "./Formulario";
import { RecoilRoot } from "recoil";
import { act } from "react-dom/test-utils";

describe('Comportamento do Formulário.tsx', () => {
  test('quando input está vazio, novos participantes não podem ser adicionados', () => {
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );
  
    // encontrar no DOM o input
    const input = screen.getByPlaceholderText('Insira os nomes dos participantes');
    // encontrar o botão
    const button = screen.getByRole('button');
  
    // garantir que o input esteja no documento
    expect(input).toBeInTheDocument();
    // garantir que o botão esteja desabilitado
    expect(button).toBeDisabled();
  });
  
  test('adicionar participante caso exista um nome preenchido', () => {
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );
  
      // encontrar no DOM o input
      const input = screen.getByPlaceholderText('Insira os nomes dos participantes');
      // encontrar o botão
      const button = screen.getByRole('button');
  
      // inserir valor no input
      fireEvent.change(input, {
        target: {
          value: 'Ana Catarina'
        }
      })
      // clicar no botão de submeter
      fireEvent.click(button);
      // garantir que o input esteja com o foco ativo
      expect(input).toHaveFocus();
      // garantir que o input não tenha valor
      expect(input).toHaveValue("");
  });
  
  test('nomes duplicados não podem ser adicionados na lista', () => {
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );
  
      const input = screen.getByPlaceholderText('Insira os nomes dos participantes');
      const button = screen.getByRole('button');
  
      fireEvent.change(input, {
        target: {
          value: 'Ana Catarina'
        }
      })
      fireEvent.click(button);
      fireEvent.change(input, {
        target: {
          value: 'Ana Catarina'
        }
      })
      fireEvent.click(button);
  
      const mensagemErro = screen.getByRole('alert');
  
      expect(mensagemErro.textContent).toBe('Nomes duplicados não são permitidos!');
  });
  
  test('mensagem de erro deve desaparecer após o timer', () => {
    jest.useFakeTimers()
  
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );
  
      const input = screen.getByPlaceholderText('Insira os nomes dos participantes');
      const button = screen.getByRole('button');
  
      fireEvent.change(input, {
        target: {
          value: 'Ana Catarina'
        }
      })
      fireEvent.click(button);
      fireEvent.change(input, {
        target: {
          value: 'Ana Catarina'
        }
      })
      fireEvent.click(button);
  
      let mensagemErro = screen.queryByRole('alert');
      expect(mensagemErro).toBeInTheDocument();
  
      // precisa do act quando muda estado
      act(() => {
        jest.runAllTimers();
      });
  
      mensagemErro = screen.queryByRole('alert');
      expect(mensagemErro).toBeNull();
  });
})

