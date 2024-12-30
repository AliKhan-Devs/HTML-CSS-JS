export const reactions = [
    // Acid-Base Reactions
    { reactants: ['H2SO4', 'NaOH'], products: ['Na2SO4', 'H2O'], color: '#ff6347', equation: 'H2SO4 + 2NaOH → Na2SO4 + 2H2O' },
    { reactants: ['HCl', 'NaOH'], products: ['NaCl', 'H2O'], color: '#ffb6c1', equation: 'HCl + NaOH → NaCl + H2O' },
    { reactants: ['HNO3', 'NaOH'], products: ['NaNO3', 'H2O'], color: '#f0e68c', equation: 'HNO3 + NaOH → NaNO3 + H2O' },
    { reactants: ['H2SO4', 'KOH'], products: ['K2SO4', 'H2O'], color: '#e0ffff', equation: 'H2SO4 + 2KOH → K2SO4 + 2H2O' },
    { reactants: ['HNO3', 'KOH'], products: ['KNO3', 'H2O'], color: '#f0e68c', equation: 'HNO3 + KOH → KNO3 + H2O' },
    { reactants: ['H2SO4', 'CaCO3'], products: ['CaSO4', 'H2O', 'CO2'], color: '#dcdcdc', equation: 'H2SO4 + CaCO3 → CaSO4 + H2O + CO2↑' },

    // Precipitation Reactions
    { reactants: ['NaCl', 'AgNO3'], products: ['AgCl', 'NaNO3'], color: '#d3d3d3', equation: 'NaCl + AgNO3 → AgCl↓ + NaNO3' },
    { reactants: ['NaOH', 'CuSO4'], products: ['Cu(OH)2', 'Na2SO4'], color: '#1e90ff', equation: 'CuSO4 + 2NaOH → Cu(OH)2↓ + Na2SO4' },
    { reactants: ['NaCl', 'Pb(NO3)2'], products: ['PbCl2', 'NaNO3'], color: '#f0e68c', equation: 'NaCl + Pb(NO3)2 → PbCl2↓ + NaNO3' },
    { reactants: ['CuSO4', 'BaCl2'], products: ['BaSO4', 'CuCl2'], color: '#ff4500', equation: 'CuSO4 + BaCl2 → BaSO4↓ + CuCl2' },
    { reactants: ['CaCl2', 'Na2CO3'], products: ['CaCO3', 'NaCl'], color: '#98fb98', equation: 'CaCl2 + Na2CO3 → CaCO3↓ + 2NaCl' },

    // Metal-Acid Reactions
    { reactants: ['H2SO4', 'Fe'], products: ['FeSO4', 'H2'], color: '#f5deb3', equation: 'H2SO4 + Fe → FeSO4 + H2↑' },
    { reactants: ['HCl', 'Zn'], products: ['ZnCl2', 'H2'], color: '#d3d3d3', equation: '2HCl + Zn → ZnCl2 + H2↑' },
    { reactants: ['HCl', 'Cu'], products: ['CuCl2', 'H2'], color: '#1e90ff', equation: '2HCl + Cu → CuCl2 + H2↑' },

    // Metal-Base Reactions
    { reactants: ['NaOH', 'FeCl3'], products: ['Fe(OH)3', 'NaCl'], color: '#a52a2a', equation: 'FeCl3 + 3NaOH → Fe(OH)3↓ + 3NaCl' },
    { reactants: ['NaOH', 'FeSO4'], products: ['Fe(OH)2', 'Na2SO4'], color: '#8b4513', equation: 'FeSO4 + 2NaOH → Fe(OH)2↓ + Na2SO4' },
    { reactants: ['NaOH', 'CuCl2'], products: ['Cu(OH)2', 'NaCl'], color: '#4682b4', equation: 'CuCl2 + 2NaOH → Cu(OH)2↓ + 2NaCl' },
    { reactants: ['KOH', 'CuSO4'], products: ['Cu(OH)2', 'K2SO4'], color: '#4682b4', equation: 'CuSO4 + 2KOH → Cu(OH)2↓ + K2SO4' },

    // Reactions with Other Salts
    { reactants: ['NaOH', 'Na2SO4'], products: ['Na2SO4', 'NaOH'], color: '#f0f8ff', equation: 'NaOH + Na2SO4 → Na2SO4 + NaOH' },

    // Gas-Producing Reactions
    { reactants: ['NaOH', 'Na2CO3'], products: ['Na2SO4', 'NaOH'], color: '#f0f8ff', equation: 'NaOH + Na2CO3 → Na2CO3 + NaOH' },
    { reactants: ['NaOH', 'Na2SO4'], products: ['Na2SO4', 'NaOH'], color: '#ffff00', equation: 'NaOH + Na2SO4 → Na2SO4 + NaOH' },

    // Reactions Involving Transition Elements
    { reactants: ['NaOH', 'FeCl3'], products: ['Fe(OH)3', 'NaCl'], color: '#8b4513', equation: 'FeCl3 + 3NaOH → Fe(OH)3↓ + 3NaCl' },
    { reactants: ['NaOH', 'CuSO4'], products: ['Cu(OH)2', 'Na2SO4'], color: '#4682b4', equation: 'CuSO4 + 2NaOH → Cu(OH)2↓ + Na2SO4' },
    { reactants: ['FeCl2', 'HCl'], products: ['FeCl3', 'H2'], color: '#d3d3d3', equation: 'FeCl2 + 2HCl → FeCl3 + H2' },
    { reactants: ['CuCl2', 'H2SO4'], products: ['CuSO4', 'Cl2'], color: '#4682b4', equation: 'CuCl2 + H2SO4 → CuSO4 + Cl2' },
    { reactants: ['HCl', 'KOH'], products: ['KCL', 'H2O'], color: '#FFA500', equation: 'HCl + KOH → KCl + H2O' },
    // Reactions with Water
    { reactants: ['NaOH', 'H2O'], products: ['NaOH', 'Na2O'], color: '#f0f8ff', equation: 'NaOH + H2O → Na2O + H2O' },
    { reactants: ['CuSO4', 'H2O'], products: ['Cu(OH)2', 'H2O'], color: '#4682b4', equation: 'CuSO4 + H2O → Cu(OH)2 + H2O' },

    // Specific Acid-Base Precipitation Reactions
    { reactants: ['H2SO4', 'Na2CO3'], products: ['Na2SO4', 'CO2', 'H2O'], color: '#dcdcdc', equation: 'H2SO4 + Na2CO3 → Na2SO4 + CO2↑ + H2O' },

    // New Element Reactions
    { reactants: ['H2', 'O2'], products: ['H2O'], color: '#0000ff', equation: '2H2 + O2 → 2H2O' },  // Hydrogen + Oxygen = Water
    { reactants: ['Na', 'Cl2'], products: ['NaCl'], color: '#cd5c5c', equation: '2Na + Cl2 → 2NaCl' },  // Sodium + Chlorine = Sodium Chloride
    { reactants: ['Ca', 'O2'], products: ['CaO'], color: '#ff4500', equation: '2Ca + O2 → 2CaO' },  // Calcium + Oxygen = Calcium Oxide
    { reactants: ['Mg', 'Cl2'], products: ['MgCl2'], color: '#a52a2a', equation: 'Mg + Cl2 → MgCl2' },  // Magnesium + Chlorine = Magnesium Chloride
    { reactants: ['Fe', 'O2'], products: ['Fe2O3'], color: '#b22222', equation: '3Fe + O2 → Fe2O3' },  // Iron + Oxygen = Iron(III) Oxide
    { reactants: ['Cu', 'O2'], products: ['CuO'], color: '#ff4500', equation: '2Cu + O2 → 2CuO' },  // Copper + Oxygen = Copper Oxide
    { reactants: ['Zn', 'S'], products: ['ZnS'], color: '#d3d3d3', equation: 'Zn + S → ZnS' },  // Zinc + Sulfur = Zinc Sulfide
    { reactants: ['C', 'O2'], products: ['CO2'], color: '#000000', equation: 'C + O2 → CO2' },  // Carbon + Oxygen = Carbon Dioxide
    { reactants: ['N2', 'O2'], products: ['2NO'], color: '#4682b4', equation: 'N2 + O2 → 2NO' },  // Nitrogen + Oxygen = Nitric Oxide
    { reactants: ['2H2O'], products: ['2H2', 'O2'], color: '#ff6347', equation: '2H2O → 2H2 + O2' }  // Water electrolysis
];
