import { useEffect, useState } from "react";
import { api } from "../api/http";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useToast } from "../components/Toast";

export default function ReportForm() {
  const { id } = useParams(); // reportId para edição
  const editing = Boolean(id);
  const [params] = useSearchParams();
  const pacienteId = params.get("pacienteId");
  const nav = useNavigate();
  const toast = useToast();

  const [form, setForm] = useState({
    data: new Date().toISOString().slice(0,10),
    tipoSessao: "PRESENCIAL",
    humor: 5,
    observacoes: "",
  });

  useEffect(() => {
    if (!editing) return;
  }, [editing]);

  function set(key, value) { setForm(prev => ({ ...prev, [key]: value })); }

  async function onSubmit(e) {
    e.preventDefault();
    try {
      if (!pacienteId) return toast.show("pacienteId ausente na URL");
      if (editing) {
        await api.put(`/api/reports/${id}`, form);
        toast.show("Relatório atualizado!");
      } else {
        await api.post(`/api/pacientes/${pacienteId}/reports`, form);
        toast.show("Relatório salvo!");
      }
      nav("/reports");
    } catch (err) {
      toast.show("Erro ao salvar relatório");
      console.error(err);
    }
  }

  function toggleType(checked) {
    set("tipoSessao", checked ? "ONLINE" : "PRESENCIAL");
  }

  const isOnline = form.tipoSessao === "ONLINE";

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-lg font-semibold mb-4">{editing ? "Editar Relatório" : "Novo Relatório"}</h2>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="text-sm text-zinc-600">Data</label>
          <input type="date" className="w-full mt-1 px-3 py-2 rounded-lg border"
                 value={form.date ?? ""} onChange={e => set("date", e.target.value)} />
        </div>

        <div className="flex items-center justify-between border rounded-xl p-3">
          <div>
            <div className="text-sm text-zinc-600">Tipo da sessão (Switch)</div>
            <div className="font-medium">{isOnline ? "online" : "presencial"}</div>
          </div>
          <label className="inline-flex items-center gap-2">
            <span className="text-sm text-zinc-500">presencial</span>
            <input
              type="checkbox"
              checked={isOnline}
              onChange={e => toggleType(e.target.checked)}
              className="h-5 w-5"
            />
            <span className="text-sm text-zinc-500">online</span>
          </label>
        </div>

        <div className="border rounded-xl p-3">
          <div className="text-sm text-zinc-600">Humor (Slider 1 a 10)</div>
          <div className="flex items-center gap-3 mt-2">
            <input
              type="range"
              min="1"
              max="10"
              value={form.humor}
              onChange={e => set("humor", Number(e.target.value))}
              className="w-full"
            />
            <span className="w-10 text-right font-medium">{form.humor}</span>
          </div>
        </div>

        <div>
          <label className="text-sm text-zinc-600">Observações</label>
          <textarea className="w-full mt-1 px-3 py-2 rounded-lg border min-h-28"
                    value={form.observacoes} onChange={e => set("observacoes", e.target.value)} />
        </div>

        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-lg bg-zinc-900 text-white">Salvar</button>
          <button type="button" onClick={() => nav(-1)} className="px-4 py-2 rounded-lg bg-zinc-200">Voltar</button>
        </div>
      </form>
    </div>
  );
}