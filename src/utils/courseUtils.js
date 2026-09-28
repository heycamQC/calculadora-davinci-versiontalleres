// src/utils/courseUtils.js

export const parseHorarios = (horarioTexto) => {
  if (!horarioTexto) return [];
  return horarioTexto.split("/").map((h) => h.trim());
};

export const parsePlanesYPrecios = (planesTexto) => {
  if (!planesTexto) return [];

  const planesCrudos = planesTexto.split("|");

  return planesCrudos.map((plan) => {
    let textoPlan = plan.trim();
    
    let etiqueta = "Plan Único";
    let resto = textoPlan;

    if (textoPlan.includes(":")) {
      const partes = textoPlan.split(":");
      etiqueta = partes[0].trim();
      resto = partes.slice(1).join(":").trim();
    }

    let descripcion = "";
    const matchParentesis = resto.match(/\(([^)]+)\)/);
    if (matchParentesis) {
      descripcion = matchParentesis[1].trim();
      resto = resto.replace(matchParentesis[0], "").trim();
    }

    let precioRegular = "";
    let precioOferta;

    if (resto.includes("->")) {
      const precios = resto.split("->");
      precioRegular = precios[0].replace(/[^0-9.]/g, "").trim();
      precioOferta = precios[1].replace(/[^0-9.]/g, "").trim();
    } else {
      precioOferta = resto.replace(/[^0-9.]/g, "").trim();
    }

    return {
      etiqueta,
      precioRegular,
      precioOferta: precioOferta || resto,
      descripcion,
    };
  });
};

export const formatearFechaLarga = (fechaStr) => {
  if (!fechaStr) return '';
  const soloFecha = fechaStr.split(' ')[0];
  const [anio, mes, dia] = soloFecha.split('-');
  
  if (!anio || !mes || !dia) return fechaStr; 

  const fechaObj = new Date(parseInt(anio), parseInt(mes) - 1, parseInt(dia));
  
  try {
    return fechaObj.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  } catch {
    return fechaStr;
  }
};

export const parseFechaPreventa = (fechaStr) => {
  if (!fechaStr) return null;
  // Si viene en formato DD/MM/YYYY HH:mm:ss, lo convertimos a YYYY-MM-DD HH:mm:ss
  if (fechaStr.includes('/')) {
    const [partesFecha, hora] = fechaStr.split(' ');
    const [dia, mes, anio] = partesFecha.split('/');
    return `${anio}-${mes}-${dia}${hora ? ' ' + hora : ''}`;
  }
  return fechaStr;
};