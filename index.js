/**
 * Metodo handler encargado de obtener todos los posibles tamaños de x.
 * @param {Array<number>} event 
 * @returns response
 */
const groups = async( event ) => {

    const {valid = false, sum = 0} = validGrups(event);

    if (!valid) {
        return {
            statusCode: 400,
            body: { msg: 'Existen grupos erroneos' },
        }
    }
    
    const dividersNumber = getDividers(sum);
    const solutions = [];


    dividersNumber.forEach( divider => {
        searchSolution(event, divider, solutions);
    });

    return {
        statusCode: 200,
        body: { solutions },
    };
};

/**
 * Función encargada de identificar que los grupos sean un array de números positivos.
 * @param {Array<number>} dataGroups Array enviado en el body dE la petición.
 */
const validGrups = (dataGroups) => {

    let valid = true;
    let sum = 0;

    if (!Array.isArray(dataGroups)) {
        return false;
    }

    let numberGroup;
    
    for (let i = 0, len = dataGroups.length; i < len; i++) {
        numberGroup = dataGroups[i];
        if ( isNaN(numberGroup)  || numberGroup <= 0 ) {
            valid = false;
            break;
        }
        sum += numberGroup;
    }

    return {valid, sum};
};


/**
 * Función para identificar los divisores de la suma de todos los elementos contenidos en el array.
 * @param {number} maxNumber Suma de todos los elementos contenidos en el array
 */
const getDividers = ( maxNumber ) => {

    const dividersNumber = [];
    for (let i = 1; i <= maxNumber; i++) {
        if (maxNumber % i === 0) {
            dividersNumber.push(i);
        }
    }

    return dividersNumber;
};


/**
 * Función encargada de identificar las soluciones de acuerdo a las condiciones indicadas.
 * @param {Array<number>} event cantidad de grupos
 * @param {*} number 
 * @input 1, 2, 1, 1, 1, 2, 1, 3
 * @test  1, 2, 3, 4, 6, 12
 */
const searchSolution = ( event, validateNumber, solutions) => {

    let count = 0;

    for (let i = 0, len = event.length; i < len; i++) {

        if (count === 0) {

            if (event[i] > validateNumber) {
                return;
            } else if (validateNumber === event[i]) {
                count = 0;
            } else {
                count += event[i];
            }

        } else {

            count += event[i];

            if (count > validateNumber) {
                return;
            } else if (validateNumber === count) {
                count = 0;
            }
        }

    }

    if (count === 0) {
        solutions.push(validateNumber);
    }
};

exports.handler = groups;