import Bar from "@/components/Bar";
import Footer from "@/components/Footer";

export default function about() {
  return (
    <>
      <Bar />
      <div className="pt-4 w-600 text-center p-20">
        Este es un proyecto pensado para tener mas información de alimentos que
        consumimos todos los días.
      </div>
      <div className="pt-4 pb-40 w-600 text-center">
        Pagina en construcción...
      </div>

      <Footer />
    </>
  );
}
