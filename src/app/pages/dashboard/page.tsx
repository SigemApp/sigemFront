'use client';
import React from 'react';
import GenericChart from '../../components/interfaceComponents/graphic';

const dashboardData = {
  maintenanceByYear: [
    { year: 2020, maintenance: 30 },
    { year: 2021, maintenance: 45 },
    { year: 2022, maintenance: 50 },
    { year: 2023, maintenance: 40 },
  ],
  maintenanceByMonth: [
    { month: 'Jan', maintenance: 10 },
    { month: 'Feb', maintenance: 15 },
    { month: 'Mar', maintenance: 20 },
    { month: 'Apr', maintenance: 18 },
    { month: 'May', maintenance: 25 },
    { month: 'Jun', maintenance: 30 },
    { month: 'Jul', maintenance: 35 },
    { month: 'Aug', maintenance: 28 },
    { month: 'Sep', maintenance: 32 },
    { month: 'Oct', maintenance: 30 },
    { month: 'Nov', maintenance: 20 },
    { month: 'Dec', maintenance: 25 },
  ],
  maintenanceByMachine: [
    { name: 'Máquina A', value: 40 },
    { name: 'Máquina B', value: 30 },
    { name: 'Máquina C', value: 20 },
    { name: 'Máquina D', value: 10 },
  ],
  maintenanceByTeam: [
    { team: 'Equipe A', maintenance: 50 },
    { team: 'Equipe B', maintenance: 40 },
    { team: 'Equipe C', maintenance: 30 },
    { team: 'Equipe D', maintenance: 20 },
  ],
  maintenanceCostByTeam: [
    { team: 'Equipe A', cost: 1000 },
    { team: 'Equipe B', cost: 1500 },
    { team: 'Equipe C', cost: 1200 },
    { team: 'Equipe D', cost: 900 },
  ],
  maintenanceCostByMachine: [
    { machine: 'Máquina A', cost: 2000 },
    { machine: 'Máquina B', cost: 1800 },
    { machine: 'Máquina C', cost: 1500 },
    { machine: 'Máquina D', cost: 1200 },
  ],
  partsUsedByMonth: [
    { month: 'Jan', parts: 200 },
    { month: 'Feb', parts: 150 },
    { month: 'Mar', parts: 180 },
    { month: 'Apr', parts: 220 },
    { month: 'May', parts: 250 },
    { month: 'Jun', parts: 300 },
    { month: 'Jul', parts: 280 },
    { month: 'Aug', parts: 290 },
    { month: 'Sep', parts: 320 },
    { month: 'Oct', parts: 310 },
    { month: 'Nov', parts: 230 },
    { month: 'Dec', parts: 250 },
  ],
  partsUsedByYear: [
    { year: 2020, parts: 2400 },
    { year: 2021, parts: 3000 },
    { year: 2022, parts: 2800 },
    { year: 2023, parts: 3200 },
  ],
};

const Dashboard: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {/* Container with scrollable area */}
      <div className="overflow-auto max-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
          <div className="bg-white shadow-md p-4 rounded">
            <h2 className="text-xl font-semibold mb-2">Manutenções por Mês</h2>
            <GenericChart
              data={dashboardData.maintenanceByMonth}
              dataKey="maintenance"
              xAxisKey="month"
              chartType="bar"
              xAxisLabel="Mês"
              yAxisLabel="Número de Manutenções"
            />
          </div>
          <div className="bg-white shadow-md p-4 rounded">
            <h2 className="text-xl font-semibold mb-2">Manutenções por Máquina</h2>
            <GenericChart
              data={dashboardData.maintenanceByMachine}
              dataKey="value"
              xAxisKey="name"
              chartType="pie"
              pieLabelKey="name"
            />
          </div>
          <div className="bg-white shadow-md p-4 rounded">
            <h2 className="text-xl font-semibold mb-2">Manutenções por Equipe</h2>
            <GenericChart
              data={dashboardData.maintenanceByTeam}
              dataKey="maintenance"
              xAxisKey="team"
              chartType="bar"
              xAxisLabel="Equipe"
              yAxisLabel="Número de Manutenções"
            />
          </div>
          <div className="bg-white shadow-md p-4 rounded">
            <h2 className="text-xl font-semibold mb-2">Custo de Manutenção por Máquina</h2>
            <GenericChart
              data={dashboardData.maintenanceCostByMachine}
              dataKey="cost"
              xAxisKey="machine"
              chartType="bar"
              xAxisLabel="Máquina"
              yAxisLabel="Custo"
            />
          </div>
          <div className="bg-white shadow-md p-4 rounded">
            <h2 className="text-xl font-semibold mb-2">Peças Utilizadas por Mês</h2>
            <GenericChart
              data={dashboardData.partsUsedByMonth}
              dataKey="parts"
              xAxisKey="month"
              chartType="bar"
              xAxisLabel="Mês"
              yAxisLabel="Número de Peças"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
