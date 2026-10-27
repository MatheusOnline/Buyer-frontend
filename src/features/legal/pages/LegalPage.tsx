import { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { DefaultTemplate } from "../../../Template/DefaultTemplate";
import { ScrollToTop } from "../../../Components/UI/ScrollToTop";
import { legalContact, legalVersion, terms, privacy } from "../content";
export default function LegalPage({ kind }: { kind: "terms" | "privacy" }) {
  const isPrivacy = kind === "privacy",
    title = isPrivacy ? "Política de Privacidade" : "Termos de Uso",
    sections = isPrivacy ? privacy : terms;
  useEffect(() => {
    const previous = document.title;
    document.title = `${title} | ComprasLocal`;
    return () => {
      document.title = previous;
    };
  }, [title]);
  const complete =
    legalContact.name && legalContact.document && legalContact.address;
  return (
    <DefaultTemplate>
      <ScrollToTop />
      <Page>
        <header>
          <Link to="/">Início</Link>
          <span>INFORMAÇÕES E TRANSPARÊNCIA</span>
          <h1>{title}</h1>
          <p>
            {isPrivacy
              ? "Entenda como seus dados são utilizados e como exercer seus direitos."
              : "Conheça as condições para usar a plataforma e realizar suas compras."}
          </p>
          <small>
            Versão {legalVersion} · Atualizado em 27 de outubro de 2026
          </small>
        </header>
        {!complete && (
          <Draft role="note">
            Documento em revisão: a identificação jurídica do responsável ainda
            precisa ser completada antes da publicação definitiva.
          </Draft>
        )}
        <Columns>
          <nav aria-label="Nesta página">
            <strong>Nesta página</strong>
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`}>
                {s.title}
              </a>
            ))}
          </nav>
          <article>
            {sections.map((s) => (
              <section id={s.id} key={s.id}>
                <h2>{s.title}</h2>
                {s.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </section>
            ))}
            <Contact>
              <h2>Contato e responsável</h2>
              <p>
                {legalContact.name || "ComprasLocal"}
                {legalContact.document && (
                  <>
                    <br />
                    CNPJ/CPF: {legalContact.document}
                  </>
                )}
                {legalContact.address && (
                  <>
                    <br />
                    {legalContact.address}
                  </>
                )}
              </p>
              <a href={`mailto:${legalContact.email}`}>{legalContact.email}</a>
            </Contact>
            <Sources>
              <strong>Legislação de referência</strong>
              <a
                href="https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709compilado.htm"
                target="_blank"
                rel="noopener noreferrer"
              >
                Lei Geral de Proteção de Dados (LGPD)
              </a>
              <a
                href="https://www.planalto.gov.br/ccivil_03/leis/l8078compilado.htm"
                target="_blank"
                rel="noopener noreferrer"
              >
                Código de Defesa do Consumidor
              </a>
              <a
                href="https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2013/decreto/d7962.htm"
                target="_blank"
                rel="noopener noreferrer"
              >
                Decreto do Comércio Eletrônico
              </a>
            </Sources>
            <Link
              to={isPrivacy ? "/termos-de-uso" : "/politica-de-privacidade"}
            >
              {isPrivacy
                ? "Consultar Termos de Uso"
                : "Consultar Política de Privacidade"}{" "}
              →
            </Link>
          </article>
        </Columns>
      </Page>
    </DefaultTemplate>
  );
}
const Page = styled.div`
  max-width: 1080px;
  width: 100%;
  margin: auto;
  color: #365c74;
  header {
    padding: 18px 0 30px;
    border-bottom: 1px solid #e1e9ee;
  }
  header > a {
    display: block;
    font-size: 12px;
    margin-bottom: 30px;
  }
  header > span {
    font-size: 10px;
    letter-spacing: 1.5px;
    color: #1687b1;
  }
  h1 {
    font-size: clamp(27px, 4vw, 38px);
    margin: 12px 0;
  }
  header p {
    font-size: 14px;
    line-height: 1.8;
    color: #708896;
  }
  small {
    display: block;
    font-size: 11px;
    margin-top: 16px;
    color: #708896;
  }
  a {
    color: #087fa9;
    text-underline-offset: 3px;
  }
  a:focus-visible {
    outline: 2px solid #008ecc;
    outline-offset: 4px;
  }
  section {
    scroll-margin-top: 24px;
  }
  h2 {
    font-size: 19px;
    margin: 0 0 15px;
  }
  article p {
    font-size: 14px;
    line-height: 1.95;
    color: #587181;
    margin: 0 0 14px;
  }
  article > section {
    margin-bottom: 32px;
  }
  article {
    min-width: 0;
    background: white;
    border: 1px solid #e3ecf2;
    border-radius: 8px;
    padding: 32px;
    overflow-wrap: anywhere;
  }
  @media (max-width: 600px) {
    article {
      padding: 22px 18px;
    }
  }
`;
const Columns = styled.div`
  display: grid;
  grid-template-columns: 225px minmax(0, 1fr);
  gap: 32px;
  margin-top: 30px;
  nav {
    align-self: start;
    position: sticky;
    top: 24px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    font-size: 12px;
  }
  nav strong {
    font-size: 13px;
    margin-bottom: 5px;
  }
  nav a {
    text-decoration: none;
    color: #607c8e;
    line-height: 1.7;
  }
  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    gap: 24px;
    nav {
      position: static;
    }
  }
`;
const Draft = styled.p`
  padding: 14px 18px;
  background: #fff8e9;
  border: 1px solid #f0dfb8;
  border-radius: 6px;
  color: #7e6636;
  font-size: 12px;
  line-height: 1.8;
  margin-top: 22px;
`;
const Contact = styled.section`
  padding-top: 24px;
  border-top: 1px solid #e3ecf2;
`;
const Sources = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 12px;
  padding: 24px 0;
  margin-bottom: 22px;
  border-top: 1px solid #e3ecf2;
`;
