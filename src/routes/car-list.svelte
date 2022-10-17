<table class="cars-list-table">
    {#if cars && cars.length}
    <thead>
        <td>Brand</td>
        <td>Type</td>
        <td>Year</td>
        <td></td>
    </thead>
    {/if}
    
    <tbody>
    {#each cars as car}
        <tr>
            <td>{car.brand}</td>
            <td>{car.type}</td>
            <td>{car.year}</td>
            <td>
                <a href={'/#' + car.uuid}><Fa icon={faEye} /></a>&nbsp;
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <span
                    class="cars-list-table__clickable"
                    on:click={() => deleteCar(car.uuid)}
                >
                    <Fa icon={faTrash} />
                </span>
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <span
                    class="cars-list-table__clickable"
                    on:click={() => editCar(car.uuid)}
                >
                    <Fa icon={faPen} />
                </span>
            </td>
        </tr>
    {/each}
    </tbody>



</table>





<style lang="scss">
    .cars-list-table {
        border-radius: 5px;
        margin: 0 auto;
        &__clickable, a {
            cursor: pointer;
            color: navy;
            &:hover {
                color: purple;
            }
        }
        td {
            padding: 5px 15px;
        }
        thead {
            background-color: #86cae6;
        }
        tbody {
            tr:nth-child(odd) {
                background-color: #eee;
            }
            tr:nth-child(even) {
                background-color: #ddd;
            }
        }
    }

</style>

<script lang="ts">
    import { carStore } from '../carStore';
    import type { carType } from '../types/car.type';
    import Fa from 'svelte-fa';
    import { faEye, faTrash, faPen } from '@fortawesome/free-solid-svg-icons'

    let cars: carType[] = [];

    carStore.carsStore.subscribe(value => {
        cars = value;
    })

    function deleteCar(uuid: string) {
        carStore.delCar(uuid);
    }

    function editCar(uuid: string) {
        carStore.setForEdit(uuid);
    }

</script>