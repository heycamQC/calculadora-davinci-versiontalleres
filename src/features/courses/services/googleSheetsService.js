import Papa from 'papaparse';

const SHEET_API_URL = import.meta.env.VITE_GOOGLE_SHEET_API_URL;

export const fetchCoursesFromSheet = async () => {
  try {
    const response = await fetch(SHEET_API_URL);
    const csvText = await response.text();

    return new Promise((resolve) => {
      Papa.parse(csvText, {
        header: true, 
        skipEmptyLines: true,
        complete: (results) => {
          const cursosActivos = results.data.filter(
            (curso) => curso.estado && curso.estado.toLowerCase().trim() === 'activo'
          );
          resolve(cursosActivos);
        },
      });
    });

  } catch (error) {
    console.error("Error al obtener los cursos del Google Sheet:", error);
    return [];
  }
};