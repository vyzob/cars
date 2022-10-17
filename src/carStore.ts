import { get, writable } from 'svelte/store';
import type { carType } from './types/car.type';
import type { Writable } from 'svelte/store';
import { goto } from '$app/navigation';


class CarStore {

    constructor(
        // private carsLocalStorage: carType[] = localStorage.getItem('cars') ? JSON.parse(localStorage.getItem('cars')) : [],
        public carsStore: Writable<carType[]> = writable([]),
        public editUuid: Writable<string | undefined> = writable(undefined),
    ){

        // update store from endpoint
        this.getCars();
    }

    // public addCar(data: carType): void {
    //     this.carsStore.update(currentlist => {
    //         currentlist.push(data);
    //         return currentlist;
    //     });

    //     location.hash = '#' + data.uuid;
    // }

    // public deleteCar(uuid: string): void {
    //     this.carsStore.update(currentList => {
    //         return currentList.filter(item => item.uuid !== uuid);
    //     })
    // }

    public getDetail(uuid: string): carType | undefined {
        return get(this.carsStore).find(car => car.uuid === uuid);
    }

    public setForEdit(uuid:string) {
        this.editUuid.update(() => uuid)
    }

    // public editCar(data: carType) {

    //     if(this.getDetail(data.uuid)) {
            
    //         this.carsStore.update(currentList => {
    //             return currentList.map(x => (x.uuid === data.uuid) ? data : x)
    //         });
    //     } else {
    //         this.addCar(data);
    //     }

    //     this.editUuid.update(() => undefined);
    // }

    private async updateStore(data: Promise<carType[]>, changeHash?: string) {
        let cars = await data;
        
        this.carsStore.update(() => {
            return cars;
        })

        if(changeHash) {
            goto('/#' + changeHash);
        }

    }

    public async getCars(): Promise<any> {
        fetch('http://127.0.0.1:5173/api/cars', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            },
        })
        .then(res => {
            this.updateStore(res.json());
            }
        )
    }

    public async postCar(data: carType): Promise<any> {
        fetch('http://127.0.0.1:5173/api/cars', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            },
        })
        .then(res => {
            this.updateStore(res.json(), data.uuid);
            }
        )
    }

    public async putCar(data: carType): Promise<any> {
        fetch('http://127.0.0.1:5173/api/cars', {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            },
        })
        .then(res => {
            this.updateStore(res.json(), data.uuid);
            this.editUuid.update(() => undefined);
            }
        )
    }

    public async delCar(uuid: string): Promise<any> {
        fetch('http://127.0.0.1:5173/api/cars', {
            method: 'DELETE',
            body: JSON.stringify({uuid: uuid}),
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            },
        })
        .then(res => {
            this.updateStore(res.json())
            }
        )
    }
}

export const carStore = new CarStore();