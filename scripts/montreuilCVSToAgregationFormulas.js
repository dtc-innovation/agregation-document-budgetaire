
function makeAgragationName(aggRow){
    return `${aggRow['Niveau 1 - Section']} - ${aggRow['Niveau 2 - Catégorie']} - ${aggRow['Niveau 3 - Type']}`
}

const FORMULA_MAP = {
    'DEPENSE': 'D',
    'RECETTE': 'R',
    'INVESTISSEMENT': 'I',
    'FONCTIONNEMENT': 'F',
}

function makeFormulaFromMontreuilRows(rows){
    return rows
        .map(r => {
            const RDFI = FORMULA_MAP[r['Sens']] + FORMULA_MAP[r['Section']]
            const fonction = r["Fonction - Code"]
            const nature = r['Nature - Code']

            return `${RDFI}*F${fonction}*N${nature}`
        })
        .join(' + ')
}


export default function(natFuncAggRows){
    const rowsByName = new Map()
    
    for(const row of natFuncAggRows){
        const aggName = makeAgragationName(row);

        let rowsForName = rowsByName.get(aggName) || [];
        rowsForName.push(row);
        rowsByName.set(aggName, rowsForName)
    }

    return [...rowsByName.entries()]
        .map(
            ([name, rows]) => ({name, formula: makeFormulaFromMontreuilRows(rows), montreuilRows: rows})
        )
}