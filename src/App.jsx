import { useState, useEffect } from 'react';
import { fetchCoursesFromSheet } from './features/courses/services/googleSheetsService';
import CourseCard from './features/courses/components/CourseCard';

function App() {
  const [cursos, setCursos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [cursoSeleccionado, setCursoSeleccionado] = useState(null);
  const [cursoFijoPorUrl, setCursoFijoPorUrl] = useState(false);

  useEffect(() => {
    const cargarCursos = async () => {
      try {
        const data = await fetchCoursesFromSheet();
        setCursos(data);

        const queryParams = new URLSearchParams(window.location.search);
        const idDesdeUrl = queryParams.get('curso');

        if (idDesdeUrl) {
          const cursoEncontrado = data.find(c => c.id_curso === idDesdeUrl);
          if (cursoEncontrado) {
            setCursoSeleccionado(cursoEncontrado);
            setCursoFijoPorUrl(true);
          } else {
            setCursoSeleccionado(data[0]);
          }
        } else if (data.length > 0) {
          setCursoSeleccionado(data[0]);
        }
      } catch (error) {
        console.error("Error cargando los cursos:", error);
      } finally {
        setCargando(false);
      }
    };

    cargarCursos();
  }, []);

  return (
    <div className="min-h-screen bg-transparent flex justify-center p-4 sm:p-8">
      
      <main className="w-full max-w-md w-full"> 
        {cargando ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl shadow-xl">
            <div className="w-10 h-10 border-4 border-davinci-primary border-t-transparent rounded-full animate-spin mb-4"></div>
          </div>
        ) : cursos.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-xl">
            <p className="text-sm font-bold text-gray-500">No hay cursos activos disponibles.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            
            {!cursoFijoPorUrl && (
              <div className="mb-4 relative z-20 w-full">
                
                
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-xl drop-shadow-sm">🎓</span>
                  </div>
                  
                  <select
                    value={cursoSeleccionado?.id_curso || ''}
                    onChange={(e) => setCursoSeleccionado(cursos.find(c => c.id_curso === e.target.value))}
                    className="w-full bg-white border-2 border-gray-200 text-[var(--davinci-morado)] font-poppins font-black text-sm sm:text-base py-3.5 pl-12 pr-12 rounded-2xl appearance-none cursor-pointer outline-none shadow-sm transition-all duration-300 group-hover:border-[var(--davinci-morado)] focus:border-[var(--davinci-morado)] focus:ring-4 focus:ring-[var(--davinci-morado-claro)]/20 truncate"
                  >
                    {cursos.map((curso) => (
                      <option key={curso.id_curso} value={curso.id_curso} className="text-gray-800 font-medium font-montserrat">
                        {curso.nombre_curso}
                      </option>
                    ))}
                  </select>
                  
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400 group-hover:text-[var(--davinci-morado)] transition-colors">
                    <svg className="w-6 h-6 transition-transform duration-300 group-hover:translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
              </div>
            )}

            {cursoSeleccionado && (
              <CourseCard curso={cursoSeleccionado} />
            )}
            
          </div>
        )}
      </main>
    </div>
  );
}

export default App;