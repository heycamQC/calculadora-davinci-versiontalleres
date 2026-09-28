
import { useState } from 'react';
import CountdownTimer from './CountdownTimer';
import {
  formatearFechaLarga,
  parseHorarios,
  parsePlanesYPrecios,
  parseFechaPreventa
} from '../../../utils/courseUtils';

const CourseCard = ({ curso }) => {
  const opcionesHorarios = parseHorarios(curso.horario_texto);
  const opcionesPlanes = parsePlanesYPrecios(curso.planes_y_precios);
  const fechaPreventa = parseFechaPreventa(curso.fecha_preventa);

  const [horarioSeleccionado, setHorarioSeleccionado] = useState(
    opcionesHorarios[0] || ''
  );

  const [planSeleccionadoIndex, setPlanSeleccionadoIndex] = useState(0);

  // Estado para mostrar/ocultar los cupos
  const [showCupos, setShowCupos] = useState(false);

  // URL dinámica según el ID del taller
  const cuposUrl = `https://disponibilidad-cupos.vercel.app/?id=${curso.id_curso}`;

  const planActual =
    opcionesPlanes[planSeleccionadoIndex] ||
    opcionesPlanes[0] || {
      etiqueta: 'Precio Único',
      precioRegular: '',
      precioOferta: curso.planes_y_precios,
      descripcion: ''
    };

  const handleWhatsApp = () => {
    const numeroWhatsApp = "59160000000";

    const textoMensaje =
      `¡Hola! Quiero aprovechar la preventa e inscribirme al curso: *${curso.nombre_curso}*\n\n` +
      `🗓️ *Turno:* ${horarioSeleccionado || curso.horario_texto}\n` +
      `💳 *Plan:* ${planActual.etiqueta}\n` +
      `💰 *Total a pagar:* Bs. ${planActual.precioOferta}\n\n` +
      `¿Me indican los pasos para realizar el pago?`;

    window.open(
      `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(textoMensaje)}`,
      '_blank'
    );
  };

  return (
    <div className="tarjeta-davinci flex flex-col">

      {/* ==========================================
          ENCABEZADO NARANJA
          ========================================== */}
      <div className="cabecera-urgencia">
        <h4 className="font-poppins text-sm font-black tracking-widest uppercase text-center text-white/95 drop-shadow-md mb-2">
          Preventa Exclusiva Termina en:
        </h4>

        <CountdownTimer
          targetDate={fechaPreventa || curso.fecha_inicio}
        />
      </div>

      {/* ==========================================
          INFORMACIÓN DEL CURSO
          ========================================== */}
      <div className="p-6 sm:p-8">

        <div className="flex justify-between items-start mb-4">

          <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg bg-purple-100 text-purple-800">
            {curso.tipo}
          </span>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
              ⏱️ {curso.carga_horaria}
            </span>
          </div>

        </div>

        <h3 className="titulo-curso text-2xl sm:text-3xl font-black mb-2">
          {curso.nombre_curso}
        </h3>

        <p className="text-sm font-semibold text-gray-500 mb-8">
          Inicia clases:{' '}
          <strong style={{ color: 'var(--davinci-naranja)' }}>
            {formatearFechaLarga(curso.fecha_inicio)}
          </strong>
        </p>

        {/* ==========================================
            SELECCIÓN DE HORARIO Y PLAN
            ========================================== */}
        <div className="space-y-5">

          {/* HORARIOS */}
          {opcionesHorarios.length > 1 ? (
            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                1. Elige tu turno:
              </label>

              <select
                value={horarioSeleccionado}
                onChange={(e) => setHorarioSeleccionado(e.target.value)}
                className="selector-davinci w-full p-3.5 text-sm font-bold"
              >
                {opcionesHorarios.map((horario, idx) => (
                  <option key={idx} value={horario}>
                    {horario}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div className="text-sm bg-gray-50 p-4 rounded-xl border-2 border-gray-100">
              <span className="font-bold">🕒 Horario fijo:</span>{' '}
              {curso.horario_texto}
            </div>
          )}

          {/* PLANES */}
          {opcionesPlanes.length > 1 ? (
            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                2. Elige tu plan:
              </label>

              <select
                value={planSeleccionadoIndex}
                onChange={(e) =>
                  setPlanSeleccionadoIndex(Number(e.target.value))
                }
                className="selector-davinci w-full p-3.5 text-sm font-bold"
              >
                {opcionesPlanes.map((plan, idx) => (
                  <option key={idx} value={idx}>
                    {plan.etiqueta}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div className="text-sm bg-[#eaedf3]/50 p-4 rounded-xl border-2 border-[#eaedf3] text-[#454856]">
              <span className="font-bold">💳 Tipo de pago:</span>{' '}
              {planActual.etiqueta}
            </div>
          )}

        </div>

        {/* ==========================================
            SECCIÓN: DISPONIBILIDAD DE CUPOS
            ========================================== */}
  
          <div className="mt-6 ">

            <button
              type="button"
              onClick={() => setShowCupos(!showCupos)}
              className={`w-full p-4 rounded-xl border-2 font-bold text-sm flex items-center justify-between transition-all ${
                showCupos
                  ? 'bg-purple-50 border-purple-300 text-purple-700'
                  : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-purple-200'
              }`}
            >
              <span>📅 Disponibilidad de cupos</span>

              <span>
                {showCupos ? '▲ Ocultar' : '▼ Consultar'}
              </span>
            </button>

            {showCupos && (
              <div className="mt-3 w-full overflow-hidden rounded-xl border-2 border-gray-100 bg-white">

                <div className="cupos-preview">
                  <iframe
                    src={cuposUrl}
                    title={`Disponibilidad de cupos - ${curso.nombre_curso}`}
                    className="cupos-iframe"
                  />
                </div>

              </div>
            )}

          </div>

      </div>

      {/* ==========================================
          FOOTER CON PRECIO Y DESCRIPCIÓN
          ========================================== */}
      <div className="bg-gray-50/50 px-6 sm:px-8 py-6 border-t border-gray-100">

        {/* RESUMEN DE PRECIO */}
        <div className="flex flex-col mb-6">

          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-black text-gray-500 uppercase tracking-wider">
              Total a pagar
            </span>

            {planActual.precioRegular && (
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider bg-orange-100 text-orange-700 px-2.5 py-1 rounded-full">
                🔥 Precio preventa
              </span>
            )}
          </div>

          <div className="rounded-2xl bg-white border-2 border-orange-100 p-4 shadow-sm">

            <div className="flex items-end justify-between gap-3">

              {planActual.precioRegular && (
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                    Precio regular
                  </span>

                  <span className="text-base sm:text-lg text-gray-400 line-through font-bold">
                    Bs. {planActual.precioRegular}
                  </span>
                </div>
              )}

              <div className="flex flex-col items-end ml-auto">
                <span className="text-[10px] font-black uppercase tracking-wider text-orange-600 mb-0.5">
                  Precio especial
                </span>

                <span className="precio-destacado text-4xl sm:text-5xl font-black tracking-tighter leading-none">
                  Bs. {planActual.precioOferta}
                </span>
              </div>

            </div>

            {planActual.descripcion && (
              <p className="text-xs text-gray-500 italic text-right mt-3 pt-3 border-t border-gray-100 font-semibold">
                * {planActual.descripcion}
              </p>
            )}

          </div>

        </div>

        {/* ==========================================
            BOTONES
            ========================================== */}
        <div className="flex flex-col gap-3">

          

          {/* INFORMACIÓN COMPLETA */}
          {curso.link_info && (
              <a
                href={curso.link_info}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-black text-[var(--davinci-naranja)] bg-orange-50 border-2 border-orange-200 hover:bg-orange-100 hover:border-orange-300 transition-all duration-200"
              >
                <span>📋</span>
                Ver información completa
                <span className="text-base">↗</span>
              </a>
            )}
          {/* WHATSAPP */}
          <button
            onClick={handleWhatsApp}
            className="btn-whatsapp w-full flex items-center justify-center gap-3 py-4 px-4 text-base font-black"
          >
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"
              />
            </svg>

            Inscribirme por WhatsApp
          </button>

        </div>

      </div>

    </div>
  );
};

export default CourseCard;
