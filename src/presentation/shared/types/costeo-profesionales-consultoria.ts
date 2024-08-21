export type TypeCosteoProfesionalConsultoria = {
  id: number;
  expertoRequerido: string;
  cantidad: number;
  dedicacion: number;
  horasMes: number;
  plazoMeses: number;
  totalHoras: number;
  tarifaHora: number;
  factorMultiplicador: number;
  costo: number;
  cronogramaId: number;
  onlyView?: boolean;
};

export type ParamCalcularTotales = {
  subtotalConsultoria?: number;
  gastosOperativosYViajes: number;
  utilidadConsultoria?: number;
  ivaConsultoria?: number;
  totalConsultoria?: number;
  cronogramaId: number;
};


export type ParamCalcularTotalesRequest = {
  utilidadPorcentaje?: number;
  ivaPorcentaje?: number;
  gastosOperativosYViajes: number;
  cronogramaId: number;
};



