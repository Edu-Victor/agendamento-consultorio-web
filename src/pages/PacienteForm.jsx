import { useEffect, useState } from "react";
import { api } from "../api/http";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "../components/Toast";

const empty = {
  nome: "", idade: 0, cep: "",
  rua: "", bairro: "", cidade: "", estado: "", complemento: "",
  observacoes: ""
};

export default function PacienteForm() {
  const { id } = useParams(); // "new" não tem id
  const editing = Boolean(id);
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (!editing) return;
    api.get(`/api/pacientes/${id}`).then(({ data }) => setForm(data)).catch(console.error);
  }, [editing, id]);

  function set(key, value) { setForm(prev => ({ ...prev, [key]: value })); }

  async function buscarCep() {
    const cep = (form.cep || "").replace(/\D/g, "");
    if (cep.length !== 8) return toast.show("CEP inválido");
    try {
      const { data } = await api.get(`/api/cep/${cep}`);
      if (data?.erro) return toast.show("CEP não encontrado");
      set("rua", data.logradouro || "");
      set("bairro", data.bairro || "");
      set("cidade", data.localidade || "");
      set("estado", data.uf || "");
      set("complemento", data.complemento || "");
      toast.show("Endereço preenchido!");
    } catch {
      toast.show("Falha ao buscar CEP");
    }
  }

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      if (editing) {
        await api.put(`/api/pacientes/${id}`, form);
        toast.show("Paciente atualizado!");
        nav(`/pacientes/${id}`);
      } else {
        const { data } = await api.post("/api/pacientes", form);
        toast.show("Paciente salvo!");
        nav(`/pacientes/${data.id}`);
      }
    } catch (err) {
      toast.show("Erro ao salvar");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-lg font-semibold mb-4">{editing ? "Editar Paciente" : "Novo Paciente"}</h2>

      <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-zinc-600">Nome</label>
          <input className="w-full mt-1 px-3 py-2 rounded-lg border"
                 value={form.nome} onChange={e => set("nome", e.target.value)} />
        </div>

        <div>
          <label className="text-sm text-zinc-600">Idade</label>
          <input type="number" className="w-full mt-1 px-3 py-2 rounded-lg border"
                 value={form.idade} onChange={e => set("idade", Number(e.target.value))} />
        </div>

        <div className="md:col-span-2 flex gap-2 items-end">
          <div className="flex-1">
            <label className="text-sm text-zinc-600">CEP</label>
            <input className="w-full mt-1 px-3 py-2 rounded-lg border"
                   value={form.cep} onChange={e => set("cep", e.target.value)} placeholder="Somente números (8 dígitos)" />
          </div>
          <button type="button" onClick={buscarCep}
                  className="px-3 py-2 rounded-lg bg-zinc-900 text-white">
            Buscar CEP
          </button>
        </div>

        <div>
          <label className="text-sm text-zinc-600">Logradouro</label>
          <input className="w-full mt-1 px-3 py-2 rounded-lg border"
                 value={form.rua || ""} onChange={e => set("rua", e.target.value)} />
        </div>

        <div>
          <label className="text-sm text-zinc-600">Bairro</label>
          <input className="w-full mt-1 px-3 py-2 rounded-lg border"
                 value={form.bairro || ""} onChange={e => set("bairro", e.target.value)} />
        </div>

        <div>
          <label className="text-sm text-zinc-600">Cidade</label>
          <input className="w-full mt-1 px-3 py-2 rounded-lg border"
                 value={form.cidade || ""} onChange={e => set("cidade", e.target.value)} />
        </div>

        <div>
          <label className="text-sm text-zinc-600">UF</label>
          <input className="w-full mt-1 px-3 py-2 rounded-lg border"
                 value={form.estado || ""} onChange={e => set("estado", e.target.value)} />
        </div>

        <div className="md:col-span-2">
          <label className="text-sm text-zinc-600">Complemento</label>
          <input className="w-full mt-1 px-3 py-2 rounded-lg border"
                 value={form.complemento || ""} onChange={e => set("complemento", e.target.value)} />
        </div>

        <div className="md:col-span-2">
          <label className="text-sm text-zinc-600">Observações</label>
          <textarea className="w-full mt-1 px-3 py-2 rounded-lg border min-h-24"
                    value={form.observacoes || ""} onChange={e => set("observacoes", e.target.value)} />
        </div>

        <div className="md:col-span-2 flex gap-2">
          <button disabled={loading} className="px-4 py-2 rounded-lg bg-zinc-900 text-white">
            {loading ? "Salvando..." : "Salvar"}
          </button>
          <button type="button" onClick={() => nav(-1)} className="px-4 py-2 rounded-lg bg-zinc-200">
            Voltar
          </button>
        </div>
      </form>
    </div>
  );
}