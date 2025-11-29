import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { api } from "../api/http";

export default function PacienteDetalhes() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [paciente, setPaciente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    let alive = true;

    async function carregar() {
      try {
        setLoading(true);
        setErro("");
        const { data } = await api.get(`/api/pacientes/${id}`);
        if (alive) setPaciente(data);
      } catch (e) {
        console.error(e);
        if (alive) setErro("Não foi possível carregar o paciente.");
      } finally {
        if (alive) setLoading(false);
      }
    }

    carregar();
    return () => { alive = false; };
  }, [id]);

  if (loading) return <div className="p-6 text-zinc-200">Carregando...</div>;

  if (erro) {
    return (
      <div className="p-6 text-red-300">
        {erro}{" "}
        <button className="underline" onClick={() => navigate(-1)}>
          Voltar
        </button>
      </div>
    );
  }

  if (!paciente) return null;

  const endereco = [
    paciente.rua,
    paciente.bairro,
    paciente.cidade ? `${paciente.cidade}/${paciente.estado || ""}` : null,
    paciente.complemento,
  ]
    .filter(Boolean)
    .join(" — ");

  return (
    <div className="p-6">
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 shadow">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-zinc-100">
              {paciente.name}
            </h1>
            <p className="text-zinc-300 mt-1">
              Idade: <b>{paciente.idade}</b> • CEP: <b>{paciente.cep}</b>
            </p>
          </div>

          <Link to={`pacientes`} className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-100 hover:bg-zinc-700">
            Voltar
          </Link>

          {/* <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-100 hover:bg-zinc-700"
          >
            Voltar
          </button> */}
        </div>

        <div className="mt-6 grid gap-4">
          <div>
            <h2 className="text-lg font-medium text-zinc-100">Endereço</h2>
            <p className="text-zinc-300 mt-1">{endereco || "Não informado"}</p>
          </div>

          <div>
            <h2 className="text-lg font-medium text-zinc-100">Observações</h2>
            <p className="text-zinc-300 mt-1 whitespace-pre-wrap">
              {paciente.observacoes || "—"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
