import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { carType} from '../../../types/car.type'

const cars: carType[] = [
    {
        brand: 'AUDI',
        type: 'A6',
        year: 2066,
        uuid: 'a1b0465d-af4e-4585-995a-613f4af45047'
    }
];

export const GET: RequestHandler = (event) => {   
    return json(cars);
}

export const POST: RequestHandler = async(event) => {
	const res = await event.request.json();
    cars.push(res);

	return json(cars);
}

export const PUT: RequestHandler = async(event) => {
    const res = await event.request.json();

    let carIndex = cars.findIndex(car => car.uuid === res.uuid);

    if (carIndex > -1) {
        cars[carIndex] = res;
    } else {
        cars.push(res);
    }

    return json(cars);
}

export const DELETE: RequestHandler = async(event) => {
    const res = await event.request.json();

    let carIndex = cars.findIndex(car => car.uuid === res.uuid);

    if (carIndex > -1) {
        cars.splice(carIndex, 1);
    }

    return json(cars);
}

// returning whole cars list to update store without another request
// missing error handling