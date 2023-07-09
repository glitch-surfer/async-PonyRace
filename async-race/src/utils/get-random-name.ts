const randomBrands = [
  'Audi',
  'BMW',
  'Mercedes',
  'Opel',
  'VW',
  'Volvo',
  'Ford',
  'Fiat',
  'Renault',
  'Peugeot',
  'Citroen',
  'Nissan',
  'Toyota',
  'Mazda',
  'Honda',
  'Kia',
  'Hyundai',
  'Suzuki',
  'Lexus',
  'Mitsubishi',
  'Jeep',
  'Chrysler',
  'Dodge',
  'Ferrari',
  'Lamborghini',
  'Bugatti',
  'Rolls-Royce',
];

const randomModels = [
  '458',
  'Aventador',
  '911',
  'R8',
  'Corvette',
  'Mustang',
  'M3',
  'AMG GT',
  'GT-R',
  '720S',
  'Model S',
  'Chiron',
  'LC',
  'F-Type',
  'DB11',
  'GranTurismo',
  'Phantom',
  'Continental GT',
  'Stratos',
  '4C',
  'Evora',
  'NSX',
  'RX-7',
  'Impreza WRX STI',
  'Supra',
  'Lancer Evolution',
  'NSX',
  'Golf GTI',
];

const getRndInteger = (min: number, max: number): number => Math.floor(
  Math.random() * (max - min + 1),
) + min;

export const getRandomName = (): string => {
  const randomBrand = randomBrands[getRndInteger(0, randomBrands.length - 1)];
  const randomModel = randomModels[getRndInteger(0, randomModels.length - 1)];
  return `${randomBrand} ${randomModel}`;
};
